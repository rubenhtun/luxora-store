import { FiPackage, FiDollarSign, FiUsers, FiTrendingUp } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiPackage className="w-6 h-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-xl font-semibold text-gray-800">245</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Sales</p>
              <h3 className="text-xl font-semibold text-gray-800">$12,426</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FiUsers className="w-6 h-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Customers</p>
              <h3 className="text-xl font-semibold text-gray-800">1,245</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-orange-50 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-orange-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Growth</p>
              <h3 className="text-xl font-semibold text-gray-800">+24%</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Sample row - replace with real data */}
              <tr>
                <td className="px-6 py-4">#ORD-001</td>
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">$126.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
