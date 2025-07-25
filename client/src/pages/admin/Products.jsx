import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

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
    shippingInfo: "",
    returnPolicy: "",
  });

  // Fetch products on component mount and when search term changes
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
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    setIsLoading(true); // Show loading state
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
      setIsLoading(false); // After fetching data, hide loading state
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  // Handle form submission for adding/editing products
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:3000/api/products/${selectedProductId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3000/api/products", formData);
      }
      fetchProducts();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/products/${productToDelete}`
      );
      fetchProducts();
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
      shippingInfo: product.shippingInfo || "",
      returnPolicy: product.returnPolicy || "",
    });
    setIsEditMode(true);
    setSelectedProductId(product._id);
    setIsModalOpen(true);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Product Management
            </h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX />
                </button>
              )}
            </div>

            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <FiPlus className="w-5 h-5 mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-8 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Stock
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentProducts.length > 0 ? (
                      currentProducts.map((product) => (
                        <tr
                          key={product._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  src={
                                    product.image ||
                                    "https://via.placeholder.com/40"
                                  }
                                  alt={product.name}
                                  className="h-10 w-10 rounded-md object-cover"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/40";
                                  }}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {product.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {product.category || "Uncategorized"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">
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
                                className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                  product.inStock
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                              <span className="text-sm text-gray-900">
                                {product.inStock
                                  ? `In Stock (${product.stockQuantity})`
                                  : "Out of Stock"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => handleEdit(product)}
                                className="text-blue-600 hover:text-blue-900 transition-colors"
                                title="Edit"
                              >
                                <FiEdit2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  setProductToDelete(product._id);
                                  setIsDeleteConfirmOpen(true);
                                }}
                                className="text-red-600 hover:text-red-900 transition-colors"
                                title="Delete"
                              >
                                <FiTrash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          {searchTerm
                            ? "No products match your search."
                            : "No products available."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredProducts.length > productsPerPage && (
                <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() =>
                        paginate(currentPage > 1 ? currentPage - 1 : 1)
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">
                          {indexOfFirstProduct + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(
                            indexOfLastProduct,
                            filteredProducts.length
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {filteredProducts.length}
                        </span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                      >
                        <button
                          onClick={() =>
                            paginate(currentPage > 1 ? currentPage - 1 : 1)
                          }
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Previous</span>
                          <FiChevronLeft className="h-5 w-5" />
                        </button>
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === number
                                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
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
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Next</span>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {isEditMode ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-500 cursor-pointer"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Product Name */}
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      placeholder="Enter product description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      required
                    />
                  </div>

                  {/* Price Fields */}
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Price ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="originalPrice"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Original Price ($)
                    </label>
                    <input
                      type="number"
                      id="originalPrice"
                      placeholder="0.00"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalPrice: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* Rating & Reviews */}
                  <div>
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Rating
                    </label>
                    <input
                      type="number"
                      id="rating"
                      placeholder="0.0"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rating: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="reviews"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Reviews Count
                    </label>
                    <input
                      type="number"
                      id="reviews"
                      placeholder="0"
                      value={formData.reviews}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          reviews: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>

                  {/* Category & Stock */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="category"
                      placeholder="Enter category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="stockQuantity"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      id="stockQuantity"
                      placeholder="100"
                      value={formData.stockQuantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stockQuantity: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>

                  {/* In Stock Toggle */}
                  <div className="flex items-center">
                    <label
                      htmlFor="inStock"
                      className="block text-sm font-medium text-gray-700 mr-3"
                    >
                      In Stock
                    </label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={formData.inStock}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            inStock: e.target.checked,
                          })
                        }
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                      />
                      <label
                        htmlFor="inStock"
                        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                          formData.inStock ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      ></label>
                    </div>
                    <span className="text-sm text-gray-700">
                      {formData.inStock ? "Yes" : "No"}
                    </span>
                  </div>

                  {/* Colors */}
                  <div className="col-span-2">
                    <label
                      htmlFor="colors"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Colors (comma separated)
                    </label>
                    <input
                      type="text"
                      id="colors"
                      placeholder="red, blue, green"
                      value={formData.colors.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          colors: e.target.value
                            .split(",")
                            .map((color) => color.trim())
                            .filter((color) => color !== ""),
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formData.colors.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.colors.map((color, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="col-span-2">
                    <label
                      htmlFor="features"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Features (comma separated)
                    </label>
                    <input
                      type="text"
                      id="features"
                      placeholder="Wireless, Noise Cancelling, Bluetooth"
                      value={formData.features.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: e.target.value
                            .split(",")
                            .map((f) => f.trim())
                            .filter((f) => f !== ""),
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formData.features.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image URL */}
                  <div className="col-span-2">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Main Image URL
                    </label>
                    <input
                      type="text"
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formData.image && (
                      <div className="mt-2">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="h-20 w-20 object-cover rounded-md border border-gray-200"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Shipping Info */}
                  <div className="col-span-2">
                    <label
                      htmlFor="shippingInfo"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Shipping Information
                    </label>
                    <textarea
                      id="shippingInfo"
                      placeholder="Enter shipping details"
                      value={formData.shippingInfo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingInfo: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      rows={2}
                    />
                  </div>

                  {/* Return Policy */}
                  <div className="col-span-2">
                    <label
                      htmlFor="returnPolicy"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Return Policy
                    </label>
                    <textarea
                      id="returnPolicy"
                      placeholder="Enter return policy details"
                      value={formData.returnPolicy}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          returnPolicy: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      rows={2}
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                  >
                    {isEditMode ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Confirm Deletion
              </h2>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
