import { useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

export default function ProductsList() {
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All Prices");
  const [sort, setSort] = useState("Featured");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/api/products`);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // Filter by price
    switch (price) {
      case "Under $50":
        result = result.filter((p) => p.price < 50);
        break;
      case "$50 - $100":
        result = result.filter((p) => p.price >= 50 && p.price <= 100);
        break;
      case "$100 - $500":
        result = result.filter((p) => p.price > 100 && p.price <= 500);
        break;
      case "Over $500+":
        result = result.filter((p) => p.price > 500);
        break;
      default:
        break;
    }

    // Sort products
    switch (sort) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Customer Rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "Newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break; // "Featured" - use default sorting
    }

    setFilteredProducts(result);
  }, [products, category, price, sort]);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span className="text-blue-600 cursor-pointer hover:underline">
          Home
        </span>{" "}
        / <span>All Products</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Filter by:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option>All</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Accessories</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option>All Prices</option>
              <option>Under $50</option>
              <option>$50 - $100</option>
              <option>$100 - $500</option>
              <option>Over $500+</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Customer Rating</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {error ? (
        <div className="text-red-500 text-center py-10">{error}</div>
      ) : isLoading ? (
        <div className="text-center py-10">Loading products...</div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center py-10">
          No products match your filters.
        </div>
      )}
    </div>
  );
}
