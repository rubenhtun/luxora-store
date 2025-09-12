import { FiHeart, FiStar, FiCheck } from "react-icons/fi";
import { useState } from "react";

// ProductCard component for displaying individual product details
// Uses responsive Tailwind CSS layout consistent with ProductsList, NavCategories, and Footer
export default function ProductCard({ product }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white cursor-pointer transition-all duration-300 hover:shadow-lg">
      {/* Product image with discount badge and quick actions */}
      <div className="w-full relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badges[0] && (
          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm">
            {product.badges[0]}% OFF
          </span>
        )}
        <div className="absolute right-2 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            className="rounded-full border border-gray-200 bg-white p-2 text-slate-500 cursor-pointer transition-colors hover:bg-gray-100 hover:text-blue-600"
            aria-label="Add to wishlist"
          >
            <FiHeart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product details with name, rating, and price */}
      <div className="p-4">
        <h3 className="mb-2 text-base font-semibold text-gray-800 hover:text-blue-600 line-clamp-1">
          {product.name}
        </h3>
        <div className="mb-2 flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`h-3 w-3 ${
                  i < product.rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-sm text-slate-500">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Action buttons for cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-800">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="ml-2 text-xs text-slate-500 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex items-center justify-center gap-1 rounded-md px-3 py-2.5 text-sm font-semibold text-white cursor-pointer transition-colors ${
              isAdded
                ? "bg-gray-500"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            }`}
            aria-label={isAdded ? "Added to cart" : "Add to cart"}
          >
            {isAdded ? (
              <>
                <FiCheck className="mr-1 h-4 w-4" />
                Added
              </>
            ) : (
              <>Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
