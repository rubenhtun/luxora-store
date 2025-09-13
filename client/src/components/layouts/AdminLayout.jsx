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
  FiChevronRight,
  FiBarChart,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

export default function AdminLayout() {
  // State to manage the current location
  const location = useLocation();

  // State to manage sidebar open/close
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Navigation links organized by sections for better admin UX
  const navigationSections = [
    {
      title: "Overview",
      items: [
        { name: "Dashboard", href: "/admin", icon: FiHome },
        { name: "Analytics", href: "/admin/analytics", icon: FiBarChart },
        { name: "Revenue", href: "/admin/revenue", icon: FiDollarSign },
      ],
    },
    {
      title: "Commerce",
      items: [
        { name: "Products", href: "/admin/products", icon: FiBox },
        {
          name: "User Orders",
          href: "/admin/user-orders",
          icon: FiShoppingBag,
        },
        { name: "Sales Reports", href: "/admin/sales", icon: FiTrendingUp },
      ],
    },
    {
      title: "Management",
      items: [
        { name: "Customers", href: "/admin/customers", icon: FiUsers },
        { name: "Settings", href: "/admin/settings", icon: FiSettings },
      ],
    },
  ];

  // Function to check if the current location matches the link
  const isActive = (href) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
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
    return { title: "Dashboard", section: "Overview" };
  };

  const pageInfo = getPageInfo();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="relative p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <FiBox className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white">Luxora Admin</h1>
                <p className="text-blue-100 text-sm">Management Portal</p>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          {/* Decorative element */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-240px)]">
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
                          : "text-gray-600 hover:text-gray-800 hover:bg-white/70 backdrop-blur-sm"
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
                  <div className="border-t border-gray-200/50"></div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 backdrop-blur-sm">
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
      <div className="flex-1 lg:ml-0 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="bg-white/70 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiMenu className="w-5 h-5" />
                </button>

                {/* Page Title with Breadcrumb */}
                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                    <span>Admin</span>
                    <FiChevronRight className="w-4 h-4" />
                    <span>{pageInfo.section}</span>
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {pageInfo.title}
                  </h2>
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
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Content Container with better spacing */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 min-h-[600px]">
              <div className="p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/50 backdrop-blur-sm border-t border-white/20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-sm text-gray-500">
              © 2025 Luxora Admin Panel - All rights reserved
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>System Status: Online</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
