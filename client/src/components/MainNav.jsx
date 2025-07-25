import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiX,
  FiMenu,
} from "react-icons/fi";
import { useState } from "react";

export default function MainNav() {
  const [searchValue, setSearchValue] = useState("");
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-40">
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        {/* Top bar with logo and icons */}
        <div className="px-3 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                  <FiStar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    LUXORA
                  </h1>
                  <p className="text-xs text-gray-500 font-medium -mt-1 hidden xs:block">
                    Premium Store
                  </p>
                </div>
              </a>
            </div>

            {/* Mobile Action Icons */}
            <div className="flex items-center space-x-1">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 text-gray-700 hover:text-blue-600 bg-white/50 hover:bg-white/80 rounded-lg backdrop-blur-sm border border-white/30 hover:border-blue-200 transition-all duration-200 shadow-sm cursor-pointer"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Account */}
              <a
                href="/account"
                className="p-2.5 text-gray-700 hover:text-blue-600 bg-white/50 hover:bg-white/80 rounded-lg backdrop-blur-sm border border-white/30 hover:border-blue-200 transition-all duration-200 shadow-sm cursor-pointer"
              >
                <FiUser className="w-5 h-5" />
              </a>

              {/* Wishlist */}
              <a
                href="/wishlist"
                className="p-2.5 text-gray-700 hover:text-pink-600 bg-white/50 hover:bg-white/80 rounded-lg backdrop-blur-sm border border-white/30 hover:border-pink-200 transition-all duration-200 shadow-sm cursor-pointer relative"
              >
                <FiHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-md text-[10px]">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </a>

              {/* Cart */}
              <a
                href="/cart"
                className="p-2.5 text-gray-700 hover:text-green-600 bg-white/50 hover:bg-white/80 rounded-lg backdrop-blur-sm border border-white/30 hover:border-green-200 transition-all duration-200 shadow-sm cursor-pointer relative"
              >
                <FiShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-md animate-pulse text-[10px]">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="px-3 pb-3 border-t border-gray-200/50">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 shadow-sm pr-10"
                autoFocus
              />

              {searchValue && (
                <button
                  onClick={() => setSearchValue("")}
                  className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <FiX className="w-3 h-3" />
                </button>
              )}

              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md cursor-pointer">
                <FiSearch className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tablet Layout */}
      <div className="hidden sm:block lg:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                  <FiStar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    LUXORA
                  </h1>
                  <p className="text-xs text-gray-500 font-medium -mt-1">
                    Premium Store
                  </p>
                </div>
              </a>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 shadow-sm hover:shadow-md pr-10"
                />

                {searchValue && (
                  <button
                    onClick={() => setSearchValue("")}
                    className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                )}

                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md cursor-pointer">
                  <FiSearch className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-2">
              {/* Account */}
              <a
                href="/account"
                className="flex flex-col items-center p-2 text-gray-700 hover:text-blue-600 bg-white/50 hover:bg-white/80 rounded-lg backdrop-blur-sm border border-white/30 hover:border-blue-200 transition-all duration-200 shadow-sm cursor-pointer min-w-[50px]"
              >
                <FiUser className="w-4 h-4" />
                <span className="text-xs mt-0.5 font-medium">Account</span>
              </a>

              {/* Wishlist */}
              <a
                href="/wishlist"
                className="flex flex-col items-center p-2 text-gray-700 hover:text-pink-600 bg-white/50 hover:bg-white/80 rounded-lg backdrop-blur-sm border border-white/30 hover:border-pink-200 transition-all duration-200 shadow-sm cursor-pointer min-w-[50px] relative"
              >
                <div className="relative">
                  <FiHeart className="w-4 h-4" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-md text-[10px]">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-0.5 font-medium">Wishlist</span>
              </a>

              {/* Cart */}
              <a
                href="/cart"
                className="flex flex-col items-center p-2 text-gray-700 hover:text-green-600 bg-white/50 hover:bg-white/80 rounded-lg backdrop-blur-sm border border-white/30 hover:border-green-200 transition-all duration-200 shadow-sm cursor-pointer min-w-[50px] relative"
              >
                <div className="relative">
                  <FiShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-md animate-pulse text-[10px]">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-0.5 font-medium">Cart</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 transform group-hover:-translate-y-0.5">
                  <FiStar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    LUXORA
                  </h1>
                  <p className="text-xs text-gray-500 font-medium -mt-1">
                    Premium Store
                  </p>
                </div>
              </a>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search for premium products, brands..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full px-5 py-3 text-sm bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 shadow-sm hover:shadow-md pr-12"
                />

                {searchValue && (
                  <button
                    onClick={() => setSearchValue("")}
                    className="absolute right-12 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}

                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer">
                  <FiSearch className="w-4 h-4" />
                </button>
              </div>

              {/* Search suggestions */}
              {searchValue && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-xl p-4 z-50 max-w-2xl">
                  <p className="text-sm text-gray-500 text-center">
                    Start typing to see search suggestions...
                  </p>
                </div>
              )}
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Account */}
              <a
                href="/account"
                className="flex flex-col items-center p-3 text-gray-700 hover:text-blue-600 bg-white/50 hover:bg-white/80 rounded-xl backdrop-blur-sm border border-white/30 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer group min-w-[60px]"
              >
                <div className="p-1.5 bg-gradient-to-r from-gray-100 to-slate-100 group-hover:from-blue-100 group-hover:to-indigo-100 rounded-lg transition-all duration-200">
                  <FiUser className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                </div>
                <span className="text-xs mt-1 font-medium">Account</span>
              </a>

              {/* Wishlist */}
              <a
                href="/wishlist"
                className="flex flex-col items-center p-3 text-gray-700 hover:text-pink-600 bg-white/50 hover:bg-white/80 rounded-xl backdrop-blur-sm border border-white/30 hover:border-pink-200 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer group min-w-[60px]"
              >
                <div className="relative">
                  <div className="p-1.5 bg-gradient-to-r from-gray-100 to-slate-100 group-hover:from-pink-100 group-hover:to-red-100 rounded-lg transition-all duration-200">
                    <FiHeart className="w-5 h-5 group-hover:text-pink-600 transition-colors" />
                  </div>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">Wishlist</span>
              </a>

              {/* Cart */}
              <a
                href="/cart"
                className="flex flex-col items-center p-3 text-gray-700 hover:text-green-600 bg-white/50 hover:bg-white/80 rounded-xl backdrop-blur-sm border border-white/30 hover:border-green-200 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer group min-w-[60px]"
              >
                <div className="relative">
                  <div className="p-1.5 bg-gradient-to-r from-gray-100 to-slate-100 group-hover:from-green-100 group-hover:to-emerald-100 rounded-lg transition-all duration-200">
                    <FiShoppingCart className="w-5 h-5 group-hover:text-green-600 transition-colors" />
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md animate-pulse">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">Cart</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar - Responsive */}
      <div className="border-t border-gray-200/50 bg-gradient-to-r from-gray-50/80 to-blue-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2">
          <div className="flex items-center justify-center space-x-3 sm:space-x-6 lg:space-x-8 text-xs">
            <span className="text-gray-600 font-medium flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 animate-pulse"></div>
              <span className="hidden sm:inline">Free shipping over $50</span>
              <span className="sm:hidden">Free $50+</span>
            </span>
            <span className="text-gray-600 font-medium flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-1.5 sm:mr-2"></div>
              <span className="hidden sm:inline">24/7 Customer Support</span>
              <span className="sm:hidden">24/7 Support</span>
            </span>
            <span className="text-gray-600 font-medium flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-1.5 sm:mr-2"></div>
              <span className="hidden sm:inline">30-day Returns</span>
              <span className="sm:hidden">30-day Returns</span>
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 sm:hidden"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </div>
  );
}
