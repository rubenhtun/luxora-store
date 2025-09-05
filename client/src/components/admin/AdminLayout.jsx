// === imports ===
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
  FiBell,
  FiSearch,
  FiUser,
} from "react-icons/fi";

export default function AdminLayout() {
  // State to manage the current location
  const location = useLocation();

  // State to manage sidebar open/close
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Navigation links for the admin panel
  const navigation = [
    { name: "Dashboard", href: "/admin", icon: FiHome },
    { name: "Products", href: "/admin/products", icon: FiBox },
    { name: "Orders", href: "/admin/orders", icon: FiShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: FiUsers },
    { name: "Settings", href: "/admin/settings", icon: FiSettings },
  ];

  // Function to check if the current location matches the link
  const isActive = (href) => {
    if (href === "/admin") {
      return location.pathname === "/admin"; // Return true if the pathname is exactly "/admin"
    }
    return location.pathname.startsWith(href); // Return true if the pathname starts with the href
  };

  // Get the title of the current page
  const getPageTitle = () => {
    const currentRoute = navigation.find((item) => isActive(item.href)); // Find the current route
    return currentRoute ? currentRoute.name : "Dashboard"; // Return the name of the current route or "Dashboard"
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)} // Close sidebar on overlay click
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl shadow-xl border-r border-white/20 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <FiBox className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Luxora Admin</h1>
                <p className="text-blue-100 text-sm">Management Portal</p>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on close button click
              className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href); // Call isActive function to determine if the link is active

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click in mobile view
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer group ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200"
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/70 backdrop-blur-sm"
                }`}
              >
                <Icon
                  className={`w-5 h-5 mr-3 transition-colors ${
                    active
                      ? "text-white"
                      : "text-gray-500 group-hover:text-blue-600"
                  }`}
                />
                {item.name}
                {/* Add an indicator for the active link */}
                {active && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-sm" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <FiUser className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 truncate">
                  admin@luxora.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 min-w-0">
        {/* Top Header */}
        <header className="bg-white/70 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-0 z-30">
          <div className="px-6 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)} // Show sidebar depending on menu clickable action
                className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <FiMenu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {getPageTitle()}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Welcome back to your admin dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:block relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 border-0 bg-gray-100/70 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <FiBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center cursor-pointer">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-3">
          <div className="max-w-7xl mx-auto p-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
