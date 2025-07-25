import React, { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All Prices");
  const [sort, setSort] = useState("Featured");

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
          {/* Filter by */}
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

          {/* Price Filter */}
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

        {/* Sort by */}
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

      {/* Product Grid (you can integrate your product cards here) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          product={{
            image: "https://via.placeholder.com/300x200",
            title: "Wireless Headphones",
            description:
              "Comfortable wireless headphones with noise cancelling feature.",
            price: 99.99,
            rating: 4,
            onAddToCart: () => alert("Added to cart!"),
            onViewDetails: () => alert("Viewing details!"),
          }}
        />
      </div>
    </div>
  );
}
