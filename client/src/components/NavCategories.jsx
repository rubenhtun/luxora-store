import { useState } from "react";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiStar,
  FiGift,
  FiWatch,
  FiAward,
  FiShoppingBag,
  FiHeart,
  FiHome,
} from "react-icons/fi";

export default function NavCategories() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const categories = [
    {
      name: "Collections",
      path: "/collections",
      icon: FiStar,
      isNew: true,
      subcategories: ["New Arrivals", "Best Sellers", "Limited Edition"],
    },
    {
      name: "Jewelry & Watches",
      path: "/jewelry-watches",
      icon: FiWatch,
      subcategories: ["Fine Jewelry", "Luxury Watches", "Designer Pieces"],
    },
    {
      name: "Luxury Fashion",
      path: "/luxury-fashion",
      icon: FiAward,
      subcategories: [
        "Designer Clothing",
        "Premium Brands",
        "Seasonal Collections",
      ],
    },
    {
      name: "Accessories",
      path: "/accessories",
      icon: FiShoppingBag,
      subcategories: ["Handbags", "Sunglasses", "Belts & Wallets"],
    },
    {
      name: "Beauty & Fragrance",
      path: "/beauty",
      icon: FiHeart,
      subcategories: ["Skincare", "Makeup", "Premium Fragrances"],
    },
    {
      name: "Designer Home",
      path: "/home",
      icon: FiHome,
      subcategories: ["Furniture", "Decor", "Lighting"],
    },
    {
      name: "Exclusive",
      path: "/exclusive",
      icon: FiGift,
      isExclusive: true,
      subcategories: ["VIP Collection", "Members Only", "Pre-Orders"],
    },
  ];

  const handleCategoryClick = (path) => {
    // In a real app, this would use React Router's navigate
    console.log(`Navigating to: ${path}`);
    setIsMobileMenuOpen(false);
  };

  const handleCategoryHover = (categoryName) => {
    setActiveCategory(categoryName);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-[100px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex justify-center space-x-1">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <li key={category.path} className="relative group">
                  <button
                    onClick={() => handleCategoryClick(category.path)}
                    onMouseEnter={() => handleCategoryHover(category.name)}
                    onMouseLeave={() => setActiveCategory("")}
                    className="flex items-center px-4 py-4 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 cursor-pointer relative group"
                  >
                    <Icon className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100 group-hover:text-blue-600 transition-all duration-200" />
                    <span className="relative">
                      {category.name}
                      {category.isNew && (
                        <span className="absolute -top-2 -right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                          NEW
                        </span>
                      )}
                      {category.isExclusive && (
                        <span className="absolute -top-2 -right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                          VIP
                        </span>
                      )}
                    </span>
                    <FiChevronDown className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100 transition-all duration-200" />

                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </button>

                  {/* Dropdown Menu */}
                  {activeCategory === category.name && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-xl shadow-xl z-50 p-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200/50">
                          {category.name}
                        </h3>
                        {category.subcategories.map((subcategory, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleCategoryClick(
                                `${category.path}/${subcategory
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`
                              )
                            }
                            className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 cursor-pointer"
                          >
                            {subcategory}
                          </button>
                        ))}
                      </div>

                      {/* Dropdown arrow */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/95 border-l border-t border-gray-200/50 rotate-45 backdrop-blur-xl"></div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-[140px] z-30">
        <div className="px-4 py-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl hover:bg-white/90 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center">
              <FiMenu className="w-4 h-4 mr-2" />
              <span>Browse Categories</span>
            </div>
            <FiChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-xl z-40">
            <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.path} className="space-y-2">
                    <button
                      onClick={() => handleCategoryClick(category.path)}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-gradient-to-r from-gray-100 to-slate-100 group-hover:from-blue-100 group-hover:to-indigo-100 rounded-lg mr-3 transition-all duration-200">
                          <Icon className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <span className="relative">
                          {category.name}
                          {category.isNew && (
                            <span className="ml-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                              NEW
                            </span>
                          )}
                          {category.isExclusive && (
                            <span className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                              VIP
                            </span>
                          )}
                        </span>
                      </div>
                      <FiChevronDown className="w-4 h-4 opacity-50" />
                    </button>

                    {/* Mobile Subcategories */}
                    <div className="pl-8 space-y-1">
                      {category.subcategories.map((subcategory, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleCategoryClick(
                              `${category.path}/${subcategory
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`
                            )
                          }
                          className="block w-full text-left px-3 py-2 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50/30 rounded-lg transition-all duration-200 cursor-pointer"
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Close button */}
            <div className="px-4 py-3 border-t border-gray-200/50">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100/50 hover:bg-gray-200/50 rounded-xl transition-all duration-200 cursor-pointer"
              >
                <FiX className="w-4 h-4 mr-2" />
                Close Menu
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay - for blur effect */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
