import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye, FiStar } from "react-icons/fi";

export default function ProductCard({ product }) {
  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl overflow-hidden p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative rounded-lg overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-56 object-cover group-hover:opacity-90 transition-opacity duration-300"
        />

        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            {product.discount}% OFF
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-pink-100 hover:text-pink-600 transition-colors">
            <FiHeart className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-blue-100 hover:text-blue-600 transition-colors">
            <FiEye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-1">
        <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-3 h-3 ${
                  i < product.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-sm line-through text-gray-400 ml-2">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center gap-2">
          <button className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm font-medium">
            <FiShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>

          <Link
            to={`/products/${product.id}`}
            className="flex items-center justify-center gap-1 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium p-2"
          >
            <FiEye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
