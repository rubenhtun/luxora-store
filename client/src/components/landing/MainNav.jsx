import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiSearch,
  FiLogOut,
} from "react-icons/fi";

// Auth context
import { useAuth } from "../../context/AuthContext";
// Search modals
import SearchModal from "./SearchModal";

// Reusable button styles
const ICON_BUTTON_CLASSES =
  "p-2 md:p-3 rounded-lg hover:bg-stone-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors";
const SEARCH_INPUT_CLASSES =
  "flex-grow pr-3 py-2 text-base placeholder:text-sm focus:outline-none";

export default function MainNav() {
  // State management
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Toggle search modal
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  // Handle search submission
  const handleSearch = (e) => {
    if (e) e.preventDefault();

    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setIsSearchOpen(false); // Close mobile search modal
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Navigation handlers
  const goToProfile = () => navigate("/profile");
  const goToSignup = () => navigate("/signup");
  const goToWishlist = () => navigate("/wishlist");
  const goToCart = () => navigate("/cart");

  return (
    <nav className="max-w-7xl mx-auto border-b border-gray-100 flex items-center justify-between py-4 px-4 lg:px-0 gap-4">
      {/* Logo */}
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <h1 className="text-2xl font-bold text-gray-800">Luxora Store</h1>
      </div>

      {/* Desktop Search Bar */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex w-full md:flex-grow max-w-lg rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-white overflow-hidden border border-gray-300"
      >
        {/* Search icon */}
        <div className="flex items-center px-3 text-slate-500">
          <FiSearch className="text-lg" />
        </div>

        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className={SEARCH_INPUT_CLASSES}
        />

        {/* Search button */}
        <button
          type="submit"
          className="cursor-pointer px-4 py-2 rounded-none text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none transition-colors"
        >
          Search
        </button>
      </form>

      {/* Action Icons */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile Search Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          onClick={toggleSearch}
          aria-label="Open search modal"
        >
          <FiSearch className="text-lg text-slate-500" />
        </button>

        {/* Profile / Sign Up */}
        {isAuthenticated ? (
          <button
            onClick={goToProfile}
            className={`${ICON_BUTTON_CLASSES} flex items-center gap-2`}
            aria-label="View profile"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <FiUser className="text-lg text-slate-500" />
            )}
            {user?.name && (
              <span className="hidden lg:block text-sm text-slate-600 max-w-20 truncate">
                {user.name}
              </span>
            )}
          </button>
        ) : (
          <button
            onClick={goToSignup}
            className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-stone-100 cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            aria-label="Sign up"
          >
            Sign Up
          </button>
        )}

        {/* Wishlist */}
        <button
          onClick={goToWishlist}
          className={ICON_BUTTON_CLASSES}
          aria-label="View wishlist"
        >
          <FiHeart className="text-lg text-slate-500" />
        </button>

        {/* Cart */}
        <button
          onClick={goToCart}
          className={ICON_BUTTON_CLASSES}
          aria-label="View cart"
        >
          <FiShoppingCart className="text-lg text-slate-500" />
        </button>

        {/* Logout */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="p-2 md:p-3 rounded-lg hover:bg-red-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
            aria-label="Logout"
          >
            <FiLogOut className="text-lg text-red-500" />
          </button>
        )}
      </div>

      {/* Mobile Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
    </nav>
  );
}
