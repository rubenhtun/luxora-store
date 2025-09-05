// Third-party libraries
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// Base API URL
import { baseURL } from "../../config";

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

export default function AddNewProduct() {
  const location = useLocation(); // Access the current location
  const productToEdit = location.state?.productToEdit || false; // Get previous old data and determine if in edit mode
  const isEditMode = !!productToEdit; // Boolean flag for edit mode

  const [productData, setProductData] = useState({
    name: productToEdit?.name || "",
    description: productToEdit?.description || "",
    price: productToEdit?.price || 0,
    originalPrice: productToEdit?.originalPrice || 0,
    rating: productToEdit?.rating || 0,
    reviews: productToEdit?.reviews || 0,
    inStock:
      productToEdit?.inStock !== undefined ? productToEdit.inStock : true,
    stockQuantity: productToEdit?.stockQuantity || "100",
    colors: productToEdit?.colors || [],
    image: productToEdit?.image || "",
    images: productToEdit?.images || [],
    category: productToEdit?.category || "",
    features: productToEdit?.features || [],
    badges: productToEdit?.badges || [],
    shippingInfo: productToEdit?.shippingInfo || "",
    returnPolicy: productToEdit?.returnPolicy || "",
  }); // State to hold product data
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
  const navigate = useNavigate(); // Navigation function

  // Get badge color class based on badge name
  const getBadgeColor = (badge) => {
    return badgeColors[badge] || defaultBadgeColor;
  };

  // Handle changes to product data fields
  const handleProductDataChange = (field, value) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  // Reset product data to initial state
  const resetProductData = () => {
    setProductData({
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

  // Handle form submission to add or update product
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Set loading state initially

    try {
      if (isEditMode) {
        // Update existing product
        const response = await axios.put(
          `${baseURL}/products/${productToEdit._id}`,
          productData
        );
        if (response.status === 200) {
          toast.success("Product updated successfully!");
          resetProductData(); // Reset form data
          navigate("/admin/products"); // Navigate back to products list
        }
      } else {
        // Add new product
        const response = await axios.post(`${baseURL}/products`, productData);
        if (response.status === 201) {
          toast.success("Product added successfully!");
          resetProductData(); // Reset form data
          navigate("/admin/products"); // Navigate back to products list
        }
      }
    } catch (error) {
      toast.error("An error occurred while saving the product.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    resetProductData(); // Reset form data
    navigate("/admin/products"); // Navigate back to products list
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
                value={productData.name}
                onChange={(e) =>
                  handleProductDataChange("name", e.target.value)
                }
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
                value={productData.description}
                onChange={(e) =>
                  handleProductDataChange("description", e.target.value)
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
                value={productData.price}
                onChange={(e) =>
                  handleProductDataChange("price", parseFloat(e.target.value))
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
                value={productData.originalPrice}
                onChange={(e) =>
                  handleProductDataChange(
                    "originalPrice",
                    parseFloat(e.target.value)
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
                value={productData.rating}
                onChange={(e) =>
                  handleProductDataChange("rating", parseFloat(e.target.value))
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
                value={productData.reviews}
                onChange={(e) =>
                  handleProductDataChange("reviews", parseFloat(e.target.value))
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
                value={productData.category}
                onChange={(e) =>
                  handleProductDataChange("category", e.target.value)
                }
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
                value={productData.stockQuantity}
                onChange={(e) =>
                  handleProductDataChange(
                    "stockQuantity",
                    parseFloat(e.target.value)
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
                  checked={productData.inStock}
                  onChange={(e) =>
                    handleProductDataChange("inStock", e.target.checked)
                  }
                  className="sr-only"
                />
                <label
                  htmlFor="inStock"
                  className={`block w-14 h-8 rounded-full cursor-pointer ${
                    productData.inStock ? "bg-green-500" : "bg-red-400"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      productData.inStock ? "translate-x-6" : ""
                    }`}
                  />
                </label>
              </div>
              <span
                className={`text-sm font-medium ${
                  productData.inStock ? "text-green-600" : "text-red-500"
                }`}
              >
                {productData.inStock ? "Available" : "Out of Stock"}
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
                value={productData.colors.join(", ")}
                onChange={(e) =>
                  handleProductDataChange("colors", e.target.value.split(", "))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
              />
              {productData.colors.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {productData.colors.map((color, index) => (
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
                placeholder="Best Seller, New, Premium, Featured, Professional, Limited Edition"
                value={productData.badges.join(", ")}
                onChange={(e) =>
                  handleProductDataChange("badges", e.target.value.split(", "))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
              />
              {productData.badges.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {productData.badges.map((badge, index) => (
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
                value={productData.features.join(", ")}
                onChange={(e) =>
                  handleProductDataChange(
                    "features",
                    e.target.value.split(", ")
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70"
              />
              {productData.features.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {productData.features.map((feature, index) => (
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

            {/* Image Upload */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Product Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70 cursor-pointer"
                required
                onChange={(e) => {
                  const file = e.target.files[0]; // Get the first selected file

                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      handleProductDataChange("image", reader.result);
                    };
                    reader.readAsDataURL(file); // Convert to Base64 string
                  }
                }}
              />
              {productData.image && (
                <div className="mt-3">
                  <img
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded-xl border border-gray-200"
                    src={productData.image}
                  />
                </div>
              )}
            </div>

            {/* Additional Images Upload */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Additional Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/70 cursor-pointer"
                onChange={(e) => {
                  const files = Array.from(e.target.files); // Convert FileList to Array
                  const imagesArray = [];

                  // Read each file and convert to Base64
                  files.forEach((file) => {
                    const reader = new FileReader(); // Create a new FileReader
                    reader.onload = () => {
                      imagesArray.push(reader.result);

                      // Only update state when all files are read
                      if (imagesArray.length === files.length) {
                        handleProductDataChange("images", imagesArray);
                      }
                    };
                    reader.readAsDataURL(file); // Convert each file to Base64 string
                  });
                }}
              />
              {productData.images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {productData.images.map((imgSrc, index) => (
                    <img
                      key={index}
                      alt={`Additional Image ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-xl border border-gray-200"
                      src={imgSrc || "/placeholder-image.png"}
                    />
                  ))}
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
                value={productData.shippingInfo}
                onChange={(e) =>
                  handleProductDataChange("shippingInfo", e.target.value)
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
                value={productData.returnPolicy}
                onChange={(e) =>
                  handleProductDataChange("returnPolicy", e.target.value)
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
              disabled={isLoading} // Disable button when loading
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
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
