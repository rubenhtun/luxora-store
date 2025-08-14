import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
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

// Base API URL for product-related requests
const baseURL = "http://localhost:3000/api";

// Badge color mapping for product badges
const badgeColors = {
  "Best Seller": "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
  New: "bg-gradient-to-r from-emerald-400 to-cyan-500 text-white",
  Premium: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  Featured: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
  Professional: "bg-gradient-to-r from-gray-700 to-gray-900 text-white",
  "Limited Edition": "bg-gradient-to-r from-red-500 to-pink-600 text-white",
};

// Default badge color for unrecognized badges
const defaultBadgeColor =
  "bg-gradient-to-r from-gray-400 to-gray-600 text-white";

export default function Products() {
  // State management for products, search, pagination, and delete modal
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const productsPerPage = 10;
  const deleteModalRef = useRef(null);

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseURL}/products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
    setCurrentPage(1);
  }, [searchTerm, products]);

  // Handle clicking outside the delete modal to close it
  const handleDeleteModalBackdropClick = useCallback((e) => {
    if (e.target === deleteModalRef.current) {
      setIsDeleteConfirmOpen(false);
    }
  }, []);

  // Delete a product by ID
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`${baseURL}/products/${productToDelete}`);
      setProducts(products.filter((p) => p._id !== productToDelete));
      setIsDeleteConfirmOpen(false);
      toast.success("Product deleted successfully!");
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Product not found. It may have been deleted already.");
      } else {
        toast.error("Failed to delete product. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Navigate to a specific page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get badge color based on badge type
  const getBadgeColor = (badge) => badgeColors[badge] || defaultBadgeColor;

  // Handle edit action (to be implemented)
  const handleEdit = (product) => {
    console.log("Edit product:", product);
    // Add navigation or edit logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Header Section */}
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
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-12 py-3 w-full bg-white/70 rounded-xl shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>
            <a
              href="/admin/add-new-product"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <FiPlus className="w-5 h-5 mr-2" />
              Add Product
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 rounded-xl p-6 shadow-lg">
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
          <div className="bg-white/70 rounded-xl p-6 shadow-lg">
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
          <div className="bg-white/70 rounded-xl p-6 shadow-lg">
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
        <div className="bg-white/70 rounded-xl shadow-xl overflow-hidden">
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
                  <tbody className="divide-y divide-gray-200/30">
                    {currentProducts.length > 0 ? (
                      currentProducts.map((product) => (
                        <tr
                          key={product._id}
                          className="hover:bg-white/80 transition-all duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={product.image || ""}
                                alt={product.name}
                                className="h-12 w-12 rounded-xl object-cover shadow-md"
                                onError={(e) => (e.target.src = "")}
                              />
                              <div className="ml-4">
                                <div className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">
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
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800">
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
                                className={`h-3 w-3 rounded-full mr-2 ${
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
                                    className={`px-2 py-1 text-xs font-bold rounded-lg ${getBadgeColor(
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
                                className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg cursor-pointer"
                                title="Edit Product"
                              >
                                <FiEdit2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  setProductToDelete(product._id);
                                  setIsDeleteConfirmOpen(true);
                                }}
                                className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg cursor-pointer"
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
                          <FiPackage className="w-16 h-16 text-gray-300 mb-4 mx-auto" />
                          <p className="text-gray-500 font-medium">
                            {searchTerm
                              ? "No products match your search."
                              : "No products available. Add your first product!"}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {filteredProducts.length > productsPerPage && (
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200/50 bg-gray-50/50">
                  <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
                    <p className="text-sm text-gray-700 font-medium">
                      Showing{" "}
                      <span className="font-bold text-gray-900">
                        {indexOfFirstProduct + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-bold text-gray-900">
                        {Math.min(indexOfLastProduct, filteredProducts.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-gray-900">
                        {filteredProducts.length}
                      </span>{" "}
                      results
                    </p>
                    <nav className="flex rounded-lg shadow-sm -space-x-px">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiChevronLeft className="h-5 w-5" />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-4 py-2 border text-sm font-medium ${
                              currentPage === number
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500 text-white"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {number}
                          </button>
                        )
                      )}
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={handleDeleteModalBackdropClick}
          ref={deleteModalRef}
        >
          <div className="bg-white/95 rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Confirm Deletion
              </h2>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-gray-600">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-pink-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
