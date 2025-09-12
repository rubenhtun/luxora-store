import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

// Navigation component for displaying product categories Partnerships
// Uses a responsive layout with Tailwind CSS for desktop and mobile displays
export default function NavCategories() {
  // State to toggle mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Array of category names for navigation links
  const categories = [
    "All Products",
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
    "Sale",
  ];

  // Toggles the mobile menu open/closed state
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    // Main navigation container with constrained width and centered layout
    <nav className="max-w-7xl mx-auto py-4 px-4 lg:px-0">
      <div className="flex items-center justify-between">
        {/* Hamburger menu button for mobile (hidden on md and above) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>

        {/* Category links: horizontal on md+, vertical on mobile when menu is open */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row w-full md:w-auto items-center gap-4 md:gap-6 text-sm font-medium text-slate-500`}
        >
          {categories.map((category, idx) => (
            // Individual category link with hover effect
            <a
              key={idx}
              href={`/${category
                .toLowerCase()
                .replace(/ & /g, "-")
                .replace(/ /g, "-")}`}
              className="hover:text-blue-500 transition-colors"
              onClick={() => setIsMenuOpen(false)} // Close menu on link click (mobile)
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
