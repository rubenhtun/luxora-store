import { useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { FiChevronDown } from "react-icons/fi";

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
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <span className="text-blue-600 cursor-pointer hover:underline">
          Home
        </span>{" "}
        / <span className="text-gray-400">All Products</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 md:mb-0">
          Our Premium Collection
        </h1>
        <p className="text-gray-500 max-w-lg">
          Discover our curated selection of high-quality products for the
          discerning customer.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <option>All</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Accessories</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 pointer-events-none" />
          </div>

          <div className="relative group">
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="appearance-none bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <option>All Prices</option>
              <option>Under $50</option>
              <option>$50 - $100</option>
              <option>$100 - $500</option>
              <option>Over $500+</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Sort by:</span>
          <div className="relative group">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Rating</option>
              <option>Newest</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-gray-500">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Product Grid */}
      {error ? (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-xl p-8 text-center">
          <h3 className="text-lg font-medium text-red-600 mb-2">
            Error Loading Products
          </h3>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm"
          >
            Retry
          </button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 animate-pulse"
            >
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-8 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search criteria
          </p>
          <button
            onClick={() => {
              setCategory("All");
              setPrice("All Prices");
              setSort("Featured");
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
