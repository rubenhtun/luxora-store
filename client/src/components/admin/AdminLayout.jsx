import { Link, Outlet } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiSettings,
} from "react-icons/fi";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">Luxora Admin</h1>
        </div>
        <nav className="p-4 space-y-1">
          <Link
            to="/admin"
            className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <FiHome className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <FiBox className="w-5 h-5 mr-3" />
            Products
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <FiShoppingBag className="w-5 h-5 mr-3" />
            Orders
          </Link>
          <Link
            to="/admin/customers"
            className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <FiUsers className="w-5 h-5 mr-3" />
            Customers
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <FiSettings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
