import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";

export default function MainNav() {
  return (
    <div className="border-b shadow-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {" "}
        <div className="flex items-center justify-between gap-6">
          {" "}
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-900">
              LUXORA
            </a>{" "}
          </div>
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <FiSearch className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          {/* Action Icons */}
          <div className="flex items-center space-x-6">
            <a href="/account" className="flex flex-col items-center">
              <FiUser className="w-6 h-6" />
              <span className="text-xs mt-1">Account</span>
            </a>
            <a href="/wishlist" className="flex flex-col items-center">
              <div className="relative">
                <FiHeart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="text-xs mt-1">Wishlist</span>
            </a>
            <a href="/cart" className="flex flex-col items-center">
              <div className="relative">
                <FiShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="text-xs mt-1">Cart</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
