import { useState, useEffect, useCallback, useRef } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiTag,
  FiPackage,
  FiDollarSign,
} from "react-icons/fi";

// Mock axios for demo purposes
const axios = {
  get: async (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              _id: "1",
              name: "Wireless Headphones",
              description:
                "High-quality wireless headphones with noise cancellation",
              price: 199.99,
              originalPrice: 249.99,
              rating: 4.5,
              reviews: 128,
              inStock: true,
              stockQuantity: 50,
              colors: ["black", "white", "red"],
              image: "https://via.placeholder.com/150",
              category: "Electronics",
              features: ["Wireless", "Noise Cancelling", "Bluetooth 5.0"],
              badges: ["Best Seller", "Premium"],
              shippingInfo: "Free shipping on orders over $100",
              returnPolicy: "30-day money back guarantee",
            },
            {
              _id: "2",
              name: "Smart Watch",
              description: "Advanced fitness tracking and smart notifications",
              price: 299.99,
              originalPrice: 349.99,
              rating: 4.2,
              reviews: 89,
              inStock: true,
              stockQuantity: 25,
              colors: ["silver", "gold", "black"],
              image: "https://via.placeholder.com/150",
              category: "Wearables",
              features: ["Heart Rate Monitor", "GPS", "Water Resistant"],
              badges: ["New", "Featured"],
              shippingInfo: "Free 2-day shipping",
              returnPolicy: "14-day return policy",
            },
          ],
        });
      }, 1000);
    });
  },
  post: async (url, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { ...data, _id: Date.now().toString() } });
      }, 500);
    });
  },
  put: async (url, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data });
      }, 500);
    });
  },
  delete: async (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: "Deleted successfully" } });
      }, 500);
    });
  },
};

const baseURL = "http://localhost:3000/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Refs for handling passive events
  const modalRef = useRef(null);
  const deleteModalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    rating: 0,
    reviews: 0,
    inStock: true,
    stockQuantity: 100,
    colors: [],
    image: "",
    images: [],
    category: "",
    features: [],
    badges: [],
    shippingInfo: "",
    returnPolicy: "",
  });

  // Handle modal backdrop clicks with passive events
  const handleModalBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      resetForm();
    }
  }, []);

  const handleDeleteModalBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setIsDeleteConfirmOpen(false);
    }
  }, []);

  // Handle escape key with passive events
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        if (isDeleteConfirmOpen) {
          setIsDeleteConfirmOpen(false);
        } else if (isModalOpen) {
          setIsModalOpen(false);
          resetForm();
        }
      }
    },
    [isModalOpen, isDeleteConfirmOpen]
  );

  // Add/remove event listeners with passive option
  useEffect(() => {
    if (isModalOpen || isDeleteConfirmOpen) {
      document.addEventListener("keydown", handleKeyDown, { passive: true });
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, isDeleteConfirmOpen, handleKeyDown]);

  // Simulate API calls with mock data
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, products]);

  // Fetch products from API
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL}/products`);
      const data = response.data;
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setIsLoading(false);
  };

  // Handle form submission for adding/editing products
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditMode) {
        await axios.put(`${baseURL}/products/${selectedProductId}`, formData);
      } else {
        await axios.post(`${baseURL}/products`, formData);
      }
      fetchProducts();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
    setIsLoading(false);
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`${baseURL}/products/${productToDelete}`);
      const updatedProducts = products.filter((p) => p._id !== productToDelete);
      setProducts(updatedProducts);
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    setIsLoading(false);
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      originalPrice: 0,
      rating: 0,
      reviews: 0,
      inStock: true,
      stockQuantity: 100,
      colors: [],
      image: "",
      images: [],
      category: "",
      features: [],
      badges: [],
      shippingInfo: "",
      returnPolicy: "",
    });
    setIsEditMode(false);
    setSelectedProductId(null);
  };

  // Handle edit button click
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      inStock: product.inStock || true,
      stockQuantity: product.stockQuantity || 100,
      colors: product.colors || [],
      image: product.image || "",
      images: product.images || [],
      category: product.category || "",
      features: product.features || [],
      badges: product.badges || [],
      shippingInfo: product.shippingInfo || "",
      returnPolicy: product.returnPolicy || "",
    });
    setIsEditMode(true);
    setSelectedProductId(product._id);
    setIsModalOpen(true);
  };

  // Optimized form field handlers with useCallback
  const handleFormChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleArrayFieldChange = useCallback((field, value) => {
    const arrayValue = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    setFormData((prev) => ({ ...prev, [field]: arrayValue }));
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getBadgeColor = (badge) => {
    const colors = {
      "Best Seller": "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
      New: "bg-gradient-to-r from-emerald-400 to-cyan-500 text-white",
      Premium: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      Featured: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
      Professional: "bg-gradient-to-r from-gray-700 to-gray-900 text-white",
      "Limited Edition": "bg-gradient-to-r from-red-500 to-pink-600 text-white",
    };
    return (
      colors[badge] || "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <FiPackage className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Product Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your product inventory with ease
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow max-w-md">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-12 py-3 w-full border-0 bg-white/70 backdrop-blur-sm rounded-xl shadow-md focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>

            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer font-medium"
            >
              <FiPlus className="w-5 h-5 mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {products.length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <FiPackage className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">In Stock</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter((p) => p.inStock).length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <FiTag className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  $
                  {products
                    .reduce((sum, p) => sum + p.price * p.stockQuantity, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <FiDollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 overflow-hidden">
          {isLoading ? (
            <div className="p-12 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading products...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200/50">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Badges
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 divide-y divide-gray-200/30">
                    {currentProducts.length > 0 ? (
                      currentProducts.map((product) => (
                        <tr
                          key={product._id}
                          className="hover:bg-white/80 transition-all duration-200 group"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12">
                                <img
                                  src={
                                    product.image ||
                                    "https://via.placeholder.com/48"
                                  }
                                  alt={product.name}
                                  className="h-12 w-12 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow duration-200"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/48";
                                  }}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {product.description}
                                </div>
                                {product.rating > 0 && (
                                  <div className="flex items-center mt-1">
                                    <div className="flex text-yellow-400">
                                      {"★".repeat(Math.floor(product.rating))}
                                    </div>
                                    <span className="text-xs text-gray-500 ml-1">
                                      {product.rating} ({product.reviews})
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                              {product.category || "Uncategorized"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-bold">
                              ${product.price.toFixed(2)}
                            </div>
                            {product.originalPrice > product.price && (
                              <div className="text-xs text-gray-500 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div
                                className={`h-3 w-3 rounded-full mr-2 shadow-sm ${
                                  product.inStock
                                    ? "bg-green-400"
                                    : "bg-red-400"
                                }`}
                              ></div>
                              <span className="text-sm text-gray-900 font-medium">
                                {product.inStock
                                  ? `${product.stockQuantity} units`
                                  : "Out of Stock"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {product.badges
                                ?.slice(0, 2)
                                .map((badge, index) => (
                                  <span
                                    key={index}
                                    className={`px-2 py-1 text-xs font-bold rounded-lg shadow-sm ${getBadgeColor(
                                      badge
                                    )}`}
                                  >
                                    {badge}
                                  </span>
                                ))}
                              {product.badges?.length > 2 && (
                                <span className="px-2 py-1 text-xs font-medium rounded-lg bg-gray-200 text-gray-600">
                                  +{product.badges.length - 2}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleEdit(product)}
                                className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer"
                                title="Edit Product"
                              >
                                <FiEdit2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  setProductToDelete(product._id);
                                  setIsDeleteConfirmOpen(true);
                                }}
                                className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
                                title="Delete Product"
                              >
                                <FiTrash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center">
                            <FiPackage className="w-16 h-16 text-gray-300 mb-4" />
                            <p className="text-gray-500 font-medium">
                              {searchTerm
                                ? "No products match your search."
                                : "No products available. Add your first product!"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredProducts.length > productsPerPage && (
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200/50 bg-gray-50/50">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() =>
                        paginate(currentPage > 1 ? currentPage - 1 : 1)
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        paginate(
                          currentPage < totalPages
                            ? currentPage + 1
                            : totalPages
                        )
                      }
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700 font-medium">
                        Showing{" "}
                        <span className="font-bold text-gray-900">
                          {indexOfFirstProduct + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-bold text-gray-900">
                          {Math.min(
                            indexOfLastProduct,
                            filteredProducts.length
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-bold text-gray-900">
                          {filteredProducts.length}
                        </span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                        <button
                          onClick={() =>
                            paginate(currentPage > 1 ? currentPage - 1 : 1)
                          }
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        >
                          <FiChevronLeft className="h-5 w-5" />
                        </button>
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer transition-colors ${
                              currentPage === number
                                ? "z-10 bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500 text-white shadow-md"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {number}
                          </button>
                        ))}
                        <button
                          onClick={() =>
                            paginate(
                              currentPage < totalPages
                                ? currentPage + 1
                                : totalPages
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        >
                          <FiChevronRight className="h-5 w-5" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleModalBackdropClick}
          ref={modalRef}
        >
          <div
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {isEditMode ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Product Name */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Enter product description"
                      value={formData.description}
                      onChange={(e) =>
                        handleFormChange("description", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm resize-none"
                      rows={3}
                      required
                    />
                  </div>

                  {/* Price Fields */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Price ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) =>
                        handleFormChange(
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Original Price ($)
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        handleFormChange(
                          "originalPrice",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* Rating & Reviews */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Rating (0-5)
                    </label>
                    <input
                      type="number"
                      placeholder="0.0"
                      value={formData.rating}
                      onChange={(e) =>
                        handleFormChange(
                          "rating",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Reviews Count
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.reviews}
                      onChange={(e) =>
                        handleFormChange(
                          "reviews",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      min="0"
                    />
                  </div>

                  {/* Category & Stock */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter category"
                      value={formData.category}
                      onChange={(e) =>
                        handleFormChange("category", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      placeholder="100"
                      value={formData.stockQuantity}
                      onChange={(e) =>
                        handleFormChange(
                          "stockQuantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      min="0"
                    />
                  </div>

                  {/* In Stock Toggle */}
                  <div className="flex items-center space-x-4">
                    <label className="block text-sm font-bold text-gray-700">
                      In Stock
                    </label>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={formData.inStock}
                        onChange={(e) =>
                          handleFormChange("inStock", e.target.checked)
                        }
                        className="sr-only"
                      />
                      <label
                        htmlFor="inStock"
                        className={`block w-14 h-8 rounded-full cursor-pointer transition-all duration-300 ${
                          formData.inStock
                            ? "bg-gradient-to-r from-green-400 to-green-600 shadow-lg shadow-green-200"
                            : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-md ${
                            formData.inStock ? "transform translate-x-6" : ""
                          }`}
                        />
                      </label>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        formData.inStock ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {formData.inStock ? "Available" : "Out of Stock"}
                    </span>
                  </div>

                  {/* Colors */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Available Colors
                    </label>
                    <input
                      type="text"
                      placeholder="red, blue, green, black"
                      value={formData.colors.join(", ")}
                      onChange={(e) =>
                        handleArrayFieldChange("colors", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    />
                    {formData.colors.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {formData.colors.map((color, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300 shadow-sm"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Product Badges
                    </label>
                    <input
                      type="text"
                      placeholder="Best Seller, New, Premium, Featured"
                      value={formData.badges.join(", ")}
                      onChange={(e) =>
                        handleArrayFieldChange("badges", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    />
                    {formData.badges.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {formData.badges.map((badge, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 text-sm font-bold rounded-lg shadow-sm ${getBadgeColor(
                              badge
                            )}`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Key Features
                    </label>
                    <input
                      type="text"
                      placeholder="Wireless, Noise Cancelling, Bluetooth 5.0"
                      value={formData.features.join(", ")}
                      onChange={(e) =>
                        handleArrayFieldChange("features", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    />
                    {formData.features.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {formData.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image URL */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Product Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) =>
                        handleFormChange("image", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    />
                    {formData.image && (
                      <div className="mt-3">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="h-24 w-24 object-cover rounded-xl border-2 border-gray-200 shadow-md"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/96";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Shipping Info */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Shipping Information
                    </label>
                    <textarea
                      placeholder="Free shipping on orders over $50"
                      value={formData.shippingInfo}
                      onChange={(e) =>
                        handleFormChange("shippingInfo", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm resize-none"
                      rows={2}
                    />
                  </div>

                  {/* Return Policy */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Return Policy
                    </label>
                    <textarea
                      placeholder="30-day return policy with free returns"
                      value={formData.returnPolicy}
                      onChange={(e) =>
                        handleFormChange("returnPolicy", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm resize-none"
                      rows={2}
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors cursor-pointer hover:bg-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        {isEditMode ? "Updating..." : "Adding..."}
                      </div>
                    ) : isEditMode ? (
                      "Update Product"
                    ) : (
                      "Add Product"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleDeleteModalBackdropClick}
          ref={deleteModalRef}
        >
          <div
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Confirm Deletion
              </h2>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-gray-600 text-center">
                Are you sure you want to delete this product? This action cannot
                be undone and will permanently remove all product data.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium hover:bg-gray-100 rounded-xl transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </div>
                ) : (
                  "Delete Product"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
