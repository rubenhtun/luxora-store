import {
  FiPhone,
  FiMail,
  FiPackage,
  FiHelpCircle,
  FiMapPin,
  FiClock,
} from "react-icons/fi";

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-50 to-indigo-100 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="block sm:hidden py-3">
          {/* Top row - Contact info */}
          <div className="flex flex-col space-y-2 mb-3">
            <div className="flex items-center justify-center text-gray-700">
              <div className="p-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mr-2">
                <FiPhone className="w-3 h-3 text-blue-600" />
              </div>
              <span className="font-medium text-xs">+1 (234) 567-8900</span>
            </div>

            <div className="flex items-center justify-center text-gray-700">
              <div className="p-1.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mr-2">
                <FiMail className="w-3 h-3 text-green-600" />
              </div>
              <span className="font-medium text-xs">support@luxora.com</span>
            </div>
          </div>

          {/* Bottom row - Action buttons */}
          <div className="flex items-center justify-center gap-2">
            <a
              href="/track-order"
              className="flex items-center px-2.5 py-1.5 text-gray-700 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 rounded-lg backdrop-blur-sm border border-white/30 hover:border-transparent transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <div className="p-1 bg-gradient-to-r from-blue-100 to-indigo-100 group-hover:from-white/20 group-hover:to-white/20 rounded-full mr-1.5 transition-all duration-200">
                <FiPackage className="w-3 h-3 text-blue-600 group-hover:text-white" />
              </div>
              <span className="text-xs font-semibold">Track</span>
            </a>

            <a
              href="/help"
              className="flex items-center px-2.5 py-1.5 text-gray-700 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-lg backdrop-blur-sm border border-white/30 hover:border-transparent transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <div className="p-1 bg-gradient-to-r from-purple-100 to-pink-100 group-hover:from-white/20 group-hover:to-white/20 rounded-full mr-1.5 transition-all duration-200">
                <FiHelpCircle className="w-3 h-3 text-purple-600 group-hover:text-white" />
              </div>
              <span className="text-xs font-semibold">Help</span>
            </a>

            <div className="flex items-center text-gray-600 px-2.5 py-1.5 bg-white/30 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="p-1 bg-gradient-to-r from-gray-100 to-slate-100 rounded-full mr-1.5">
                <FiMapPin className="w-3 h-3 text-gray-600" />
              </div>
              <span className="text-xs font-medium">Free $50+</span>
            </div>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden sm:block md:hidden py-2.5">
          {/* Top row - Contact and hours */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 group">
                <div className="p-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mr-2 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200">
                  <FiPhone className="w-3 h-3 text-blue-600" />
                </div>
                <span className="font-medium text-sm">+1 (234) 567-8900</span>
              </div>

              <div className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 group">
                <div className="p-1.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mr-2 group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-200">
                  <FiMail className="w-3 h-3 text-green-600" />
                </div>
                <span className="font-medium text-sm">support@luxora.com</span>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <div className="p-1.5 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mr-2">
                <FiClock className="w-3 h-3 text-orange-600" />
              </div>
              <span className="text-xs font-medium">Mon-Fri 9AM-6PM EST</span>
            </div>
          </div>

          {/* Bottom row - Action buttons */}
          <div className="flex items-center justify-center gap-3">
            <a
              href="/track-order"
              className="flex items-center px-3 py-1.5 text-gray-700 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 rounded-lg backdrop-blur-sm border border-white/30 hover:border-transparent transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <div className="p-1 bg-gradient-to-r from-blue-100 to-indigo-100 group-hover:from-white/20 group-hover:to-white/20 rounded-full mr-2 transition-all duration-200">
                <FiPackage className="w-3 h-3 text-blue-600 group-hover:text-white" />
              </div>
              <span className="text-xs font-semibold">Track Order</span>
            </a>

            <a
              href="/help"
              className="flex items-center px-3 py-1.5 text-gray-700 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-lg backdrop-blur-sm border border-white/30 hover:border-transparent transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <div className="p-1 bg-gradient-to-r from-purple-100 to-pink-100 group-hover:from-white/20 group-hover:to-white/20 rounded-full mr-2 transition-all duration-200">
                <FiHelpCircle className="w-3 h-3 text-purple-600 group-hover:text-white" />
              </div>
              <span className="text-xs font-semibold">Help Center</span>
            </a>

            <div className="flex items-center text-gray-600">
              <div className="p-1.5 bg-gradient-to-r from-gray-100 to-slate-100 rounded-full mr-2">
                <FiMapPin className="w-3 h-3 text-gray-600" />
              </div>
              <span className="text-xs font-medium">
                Free shipping over $50
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Layout (MD and above) */}
        <div className="hidden md:flex flex-col lg:flex-row justify-between items-center py-2 text-sm">
          {/* Contact Information */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-2 lg:mb-0">
            <div className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 group">
              <div className="p-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mr-2 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200">
                <FiPhone className="w-3 h-3 text-blue-600" />
              </div>
              <span className="font-medium">+1 (234) 567-8900</span>
            </div>

            <div className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 group">
              <div className="p-1.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mr-2 group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-200">
                <FiMail className="w-3 h-3 text-green-600" />
              </div>
              <span className="font-medium">support@luxora.com</span>
            </div>

            <div className="flex items-center text-gray-600">
              <div className="p-1.5 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mr-2">
                <FiClock className="w-3 h-3 text-orange-600" />
              </div>
              <span className="text-xs font-medium">Mon-Fri 9AM-6PM EST</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-3 lg:gap-4">
            <a
              href="/track-order"
              className="flex items-center px-3 py-1.5 text-gray-700 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 rounded-lg backdrop-blur-sm border border-white/30 hover:border-transparent transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <div className="p-1 bg-gradient-to-r from-blue-100 to-indigo-100 group-hover:from-white/20 group-hover:to-white/20 rounded-full mr-2 transition-all duration-200">
                <FiPackage className="w-3 h-3 text-blue-600 group-hover:text-white" />
              </div>
              <span className="text-xs font-semibold">Track Order</span>
            </a>

            <a
              href="/help"
              className="flex items-center px-3 py-1.5 text-gray-700 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-lg backdrop-blur-sm border border-white/30 hover:border-transparent transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <div className="p-1 bg-gradient-to-r from-purple-100 to-pink-100 group-hover:from-white/20 group-hover:to-white/20 rounded-full mr-2 transition-all duration-200">
                <FiHelpCircle className="w-3 h-3 text-purple-600 group-hover:text-white" />
              </div>
              <span className="text-xs font-semibold">Help Center</span>
            </a>

            <div className="hidden lg:flex items-center text-gray-600 ml-2">
              <div className="p-1.5 bg-gradient-to-r from-gray-100 to-slate-100 rounded-full mr-2">
                <FiMapPin className="w-3 h-3 text-gray-600" />
              </div>
              <span className="text-xs font-medium">
                Free shipping over $50
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
