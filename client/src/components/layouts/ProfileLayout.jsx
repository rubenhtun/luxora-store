// === imports ===
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FiUser,
  FiHome,
  FiCreditCard,
  FiPackage,
  FiHeart,
  FiLock,
  FiSettings,
  FiGift,
  FiHelpCircle,
  FiMenu,
  FiX,
  FiChevronRight,
} from "react-icons/fi";

export default function ProfileLayout() {
  // Get the current URL location
  const location = useLocation();

  // State to manage sidebar open/close for mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Navigation links organized by sections for better UX
  const navigationSections = [
    {
      title: "Account",
      items: [
        { name: "User Info", href: "/profile", icon: FiUser },
        { name: "Address Book", href: "/profile/address-book", icon: FiHome },
        {
          name: "Security Settings",
          href: "/profile/security-settings",
          icon: FiLock,
        },
        { name: "Preferences", href: "/profile/preferences", icon: FiSettings },
      ],
    },
    {
      title: "Orders & Shopping",
      items: [
        { name: "Orders", href: "/profile/orders", icon: FiPackage },
        { name: "Wishlist", href: "/profile/wishlist", icon: FiHeart },
        {
          name: "Payment Methods",
          href: "/profile/payment-methods",
          icon: FiCreditCard,
        },
        { name: "Reviews", href: "/profile/reviews", icon: FiSettings },
      ],
    },
    {
      title: "Benefits & Support",
      items: [
        { name: "Rewards", href: "/profile/rewards", icon: FiGift },
        { name: "Support", href: "/profile/support", icon: FiHelpCircle },
      ],
    },
  ];

  // Helper function to check if the current route matches the link
  const isActive = (href) => {
    if (href === "/profile") return location.pathname === "/profile";
    return location.pathname.startsWith(href);
  };

  // Get the title and section of the currently active page
  const getPageInfo = () => {
    for (const section of navigationSections) {
      const currentRoute = section.items.find((item) => isActive(item.href));
      if (currentRoute) {
        return {
          title: currentRoute.name,
          section: section.title,
        };
      }
    }
    return { title: "User Info", section: "Account" };
  };

  const pageInfo = getPageInfo();

  // Get first letter of username
  const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="relative p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-xl font-bold text-white">My Profile</h1>
              <p className="text-blue-100 text-sm mt-1">Account Dashboard</p>
            </div>
            <button
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          {/* Decorative element */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
          {navigationSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-2">
              {/* Section Header */}
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>

              {/* Section Items */}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer group ${
                        active
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200/50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon
                          className={`w-5 h-5 mr-3 transition-colors ${
                            active
                              ? "text-white"
                              : "text-gray-400 group-hover:text-blue-600"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>

                      {/* active indicator and hover arrow */}
                      {active ? (
                        <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                      ) : (
                        <FiChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Section Divider (except for last section) */}
              {sectionIndex < navigationSections.length - 1 && (
                <div className="pt-4">
                  <div className="border-t border-gray-200"></div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-0 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(true)}
              >
                <FiMenu className="w-5 h-5" />
              </button>

              {/* Page Title with Breadcrumb */}
              <div className="flex-1 lg:flex-none">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                  <span>Profile</span>
                  <FiChevronRight className="w-4 h-4" />
                  <span>{pageInfo.section}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {pageInfo.title}
                </h2>
              </div>

              {/* Optional: Add user avatar or actions */}
              <div className="hidden lg:flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center">
                  {firstLetter}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Content Container with better spacing */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 min-h-[600px]">
              <div className="p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </main>

        {/* Optional Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-gray-500 text-center">
              Need help?{" "}
              <Link
                to="/profile/support"
                className="text-blue-600 hover:text-blue-800"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
