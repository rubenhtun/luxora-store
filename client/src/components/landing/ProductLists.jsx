import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { FiChevronDown } from "react-icons/fi";
import ProductCard from "../ProductCard";

// ProductsList component for displaying and filtering products
// Uses responsive Tailwind CSS layout and axios for fetching data
export default function ProductsList() {
  // State for filters, sorting, products, and loading/error status
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All Prices");
  const [sort, setSort] = useState("Featured");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  // References for dropdown positioning
  const categoryRef = useRef(null);
  const priceRef = useRef(null);
  const sortRef = useRef(null);

  // Fetches products from API with error handling
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      if (response.status !== 200) {
        throw new Error(`Failed to fetch products: ${response.status}`);
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

  // Trigger product fetch on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filters and sorts products based on category, price, and sort criteria
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // Apply price filter
    const priceFilters = {
      "Under $50": (p) => p.price < 50,
      "$50 - $100": (p) => p.price >= 50 && p.price <= 100,
      "$100 - $500": (p) => p.price > 100 && p.price <= 500,
      "Over $500+": (p) => p.price > 500,
    };
    if (price !== "All Prices") {
      result = result.filter(priceFilters[price]);
    }

    // Apply sorting
    const sortFunctions = {
      "Price: Low to High": (a, b) => a.price - b.price,
      "Price: High to Low": (a, b) => b.price - a.price,
      "Customer Rating": (a, b) => b.rating - a.rating,
      Newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    };
    if (sort !== "Featured") {
      result.sort(sortFunctions[sort]);
    }

    setFilteredProducts(result);
  }, [products, category, price, sort]);

  // Filter and sort options for dropdowns
  const filterOptions = {
    category: [
      "All",
      "Electronics",
      "Fashion",
      "Home & Garden",
      "Sports",
      "Books",
    ],
    price: [
      "All Prices",
      "Under $50",
      "$50 - $100",
      "$100 - $500",
      "Over $500+",
    ],
    sort: [
      "Featured",
      "Price: Low to High",
      "Price: High to Low",
      "Customer Rating",
      "Newest",
    ],
  };

  // Determines if dropdown should open above based on viewport position
  const shouldOpenAbove = (ref) => {
    if (!ref.current) return false;
    const rect = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    return spaceBelow < 200; // Open above if less than 200px below
  };

  // Renders a custom dropdown menu with dynamic positioning
  const renderDropdown = (value, onChange, options, label, ref) => (
    <div className="relative group w-40" ref={ref}>
      <button
        className="bg-white border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer w-full text-left relative"
        onClick={() => setOpenDropdown(openDropdown === label ? null : label)}
        aria-label={label}
      >
        <span className="block truncate">{value}</span>
        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-gray-600 pointer-events-none" />
      </button>
      {openDropdown === label && (
        <div
          className={`absolute left-0 right-0 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto ${
            shouldOpenAbove(ref) ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {options.map((option) => (
            <button
              key={option}
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
              onClick={() => {
                onChange(option);
                setOpenDropdown(null);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    // Main container with responsive padding and centered layout
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb navigation */}
      <div className="text-sm text-slate-500 mb-6">
        <a href="/" className="text-blue-600 hover:underline">
          Home
        </a>{" "}
        / <span className="text-gray-800">All Products</span>
      </div>

      {/* Filter and sort controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-slate-600">Filter by:</span>
          {renderDropdown(
            category,
            setCategory,
            filterOptions.category,
            "Category filter",
            categoryRef
          )}
          {renderDropdown(
            price,
            setPrice,
            filterOptions.price,
            "Price filter",
            priceRef
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600">Sort by:</span>
          {renderDropdown(
            sort,
            setSort,
            filterOptions.sort,
            "Sort options",
            sortRef
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-slate-500">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Product grid or loading/error states */}
      {error ? (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-md p-8 text-center">
          <h3 className="text-lg text-red-600 mb-2">Error Loading Products</h3>
          <p className="text-slate-600">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-sm"
          >
            Retry
          </button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-md border border-gray-200/50 p-4 animate-pulse"
            >
              <div className="bg-gray-200 h-48 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
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
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-md p-8 text-center">
          <h3 className="text-lg text-slate-700 mb-2">No Products Found</h3>
          <p className="text-sm text-slate-500 mb-4">
            Try adjusting your filters or search criteria
          </p>
          <button
            onClick={() => {
              setCategory("All");
              setPrice("All Prices");
              setSort("Featured");
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-sm text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-sm cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
