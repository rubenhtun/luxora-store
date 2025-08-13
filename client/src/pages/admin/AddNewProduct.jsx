export default function AddNewProduct() {
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

  return (
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
                    handleFormChange("price", parseFloat(e.target.value) || 0)
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
                    handleFormChange("rating", parseFloat(e.target.value) || 0)
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
                    handleFormChange("reviews", parseInt(e.target.value) || 0)
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
                  onChange={(e) => handleFormChange("category", e.target.value)}
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
                  onChange={(e) => handleFormChange("image", e.target.value)}
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
  );
}
