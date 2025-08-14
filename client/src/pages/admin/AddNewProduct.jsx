// Third-party libraries
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// Base API URL
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

// Component for adding or editing a product
export default function AddNewProduct() {
  // Extract productToEdit from location state for editing
  const location = useLocation();
  const productToEdit = location.state?.productToEdit || null;
  const isEditMode = !!productToEdit;

  // State for form data
  const [formData, setFormData] = useState({
    name: productToEdit?.name || "",
    description: productToEdit?.description || "",
    price: productToEdit?.price || 0,
    originalPrice: productToEdit?.originalPrice || 0,
    rating: productToEdit?.rating || 0,
    reviews: productToEdit?.reviews || 0,
    inStock:
      productToEdit?.inStock !== undefined ? productToEdit.inStock : true,
    stockQuantity: productToEdit?.stockQuantity || 100,
    colors: productToEdit?.colors || [],
    image: productToEdit?.image || "",
    images: productToEdit?.images || [],
    category: productToEdit?.category || "",
    features: productToEdit?.features || [],
    badges: productToEdit?.badges || [],
    shippingInfo: productToEdit?.shippingInfo || "",
    returnPolicy: productToEdit?.returnPolicy || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Get badge color for display
  const getBadgeColor = (badge) => badgeColors[badge] || defaultBadgeColor;

  // Handle form field changes
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle array field changes (e.g., colors, badges, features)
  const handleArrayFieldChange = (field, value) => {
    const arrayValue = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    setFormData((prev) => ({ ...prev, [field]: arrayValue }));
  };

  // Reset form to initial state
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
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditMode) {
        // Update existing product
        await axios.put(`${baseURL}/products/${productToEdit._id}`, formData);
        toast.success("Product updated successfully!");
      } else {
        // Create new product
        await axios.post(`${baseURL}/products`, formData);
        toast.success("Product added successfully!");
      }
      resetForm();
      navigate("/admin/products");
    } catch (error) {
      const message =
        error.response?.status === 400
          ? "Invalid product data. Please check the form."
          : "Failed to save product. Please try again.";
      toast.error(message);
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    resetForm();
    navigate("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 lg:p-6">
      <div className="max-w-7xl mx-auto bg-white/70 rounded-2xl shadow-xl p-4 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h2>

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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70 resize-none"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
                min="0"
              />
            </div>

            {/* In Stock Toggle */}
            <div className="flex items-center space-x-4">
              <label className="block text-sm font-bold text-gray-700">
                In Stock <span className="text-red-500">*</span>
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
                  required
                />
                <label
                  htmlFor="inStock"
                  className={`block w-14 h-8 rounded-full cursor-pointer ${
                    formData.inStock ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      formData.inStock ? "translate-x-6" : ""
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
              />
              {formData.colors.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.colors.map((color, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-300"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
              />
              {formData.badges.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.badges.map((badge, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-sm font-bold rounded-lg ${getBadgeColor(
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
              />
              {formData.features.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200"
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
                Product Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) => handleFormChange("image", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
                required
              />
              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded-xl border border-gray-200"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/96")
                    }
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70 resize-none"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70 resize-none"
                rows={2}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}
