import { useState, useEffect, useRef } from "react";
import { FiUser, FiHeart, FiShoppingCart, FiSearch, FiX } from "react-icons/fi";

// Primary navigation component for the landing page, featuring a logo, search bar/modal, and action icons
// Uses a responsive layout with an inline search bar on desktop and a blurred-background modal on small screens
export default function MainNav() {
  // State to toggle search modal visibility on small screens
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Reference to search modal/input for outside click detection
  const searchRef = useRef(null);

  // Array of icons for user actions (profile, wishlist, cart)
  const navIcons = [FiUser, FiHeart, FiShoppingCart];

  // Toggles the search modal open/closed state on small screens
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // Closes modal when clicking outside the search box on small screens
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  return (
    // Main navigation container with constrained width, centered layout, and bottom border
    <nav className="max-w-7xl mx-auto border-b border-gray-100 flex items-center justify-between py-4 px-4 lg:px-0 gap-4">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-800">Luxora Store</h1>

      {/* Search bar for desktop (md and above) */}
      <div className="hidden md:flex w-full md:flex-grow max-w-lg rounded-md focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-2 focus-within:ring-offset-white overflow-hidden border border-gray-300">
        {/* Search icon for visual affordance */}
        <div className="flex items-center px-3 text-slate-500">
          <FiSearch className="text-lg" />
        </div>

        {/* Search input field */}
        <input
          type="text"
          placeholder="Search products..."
          className="flex-grow pr-3 py-2 text-base placeholder:text-sm focus:outline-none"
        />

        {/* Search submission button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 text-sm hover:bg-blue-700 cursor-pointer transition-colors focus:outline-none rounded-none"
        >
          Search
        </button>
      </div>

      {/* Action icons and search trigger for small screens, horizontally aligned */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search icon button to open modal on small screens (hidden on md and above) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={toggleSearch}
          aria-label="Open search modal"
        >
          <FiSearch className="text-lg text-slate-500" />
        </button>

        {/* Action icons for user interactions (profile, wishlist, cart) */}
        {navIcons.map((Icon, idx) => (
          <button
            key={idx}
            className="p-2 md:p-3 rounded-lg hover:bg-stone-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={["View profile", "View wishlist", "View cart"][idx]}
          >
            <Icon className="text-lg text-slate-500" />
          </button>
        ))}
      </div>

      {/* Search modal for small screens with blurred background, positioned below nav */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-0 bg-black/10 backdrop-blur-[1px] z-50 flex items-start justify-center pt-16 transition-all duration-300 ease-in-out">
          <div ref={searchRef} className="w-full max-w-lg mx-4 bg-white">
            {/* Search bar with close button */}
            <div className="flex rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-2 focus-within:ring-offset-white overflow-hidden">
              {/* Search icon for visual affordance */}
              <div className="flex items-center px-3 text-slate-500">
                <FiSearch className="text-lg" />
              </div>

              {/* Search input field */}
              <input
                type="text"
                placeholder="Search products..."
                className="flex-grow pr-3 py-2 text-base placeholder:text-sm focus:outline-none"
                autoFocus
              />

              {/* Close button for modal */}
              <button
                className="p-3 text-slate-500 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={toggleSearch}
                aria-label="Close search modal"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
