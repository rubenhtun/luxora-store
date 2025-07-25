// components/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 hover:shadow-xl transition">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        )}
        <button className="absolute top-2 right-2 text-gray-600 hover:text-red-500">
          ❤️
        </button>
      </div>

      <h3 className="mt-4 font-semibold text-lg">{product.title}</h3>
      <p className="text-sm text-gray-500">({product.reviews} reviews)</p>

      <div className="mt-2">
        <span className="text-lg font-bold text-green-600">
          ${product.price}
        </span>
        {product.oldPrice && (
          <span className="text-sm line-through ml-2 text-gray-400">
            ${product.oldPrice}
          </span>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
          Add to Cart
        </button>
        <Link
          to={`/products/${product.id}`}
          className="text-sm text-blue-500 hover:underline"
        >
          View Full Details
        </Link>
      </div>
    </div>
  );
}
