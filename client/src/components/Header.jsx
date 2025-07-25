import { FiPhone, FiMail, FiPackage, FiHelpCircle } from "react-icons/fi";

export default function Header() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-8 text-xs">
          {" "}
          {/* Reduced height and font size */}
          {/* Contact Information */}
          <div className="flex items-center space-x-3">
            {" "}
            {/* Reduced spacing */}
            <div className="flex items-center">
              <FiPhone className="w-3 h-3 mr-1" /> {/* Smaller icons */}
              <span className="text-gray-600">+1 (234) 567-8900</span>
            </div>
            <div className="flex items-center">
              <FiMail className="w-3 h-3 mr-1" />
              <span className="text-gray-600">support@luxora.com</span>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <a
              href="/track-order"
              className="flex items-center hover:text-gray-600"
            >
              <FiPackage className="w-4 h-4 mr-1" />
              <span>Track Order</span>
            </a>
            <a href="/help" className="flex items-center hover:text-gray-600">
              <FiHelpCircle className="w-4 h-4 mr-1" />
              <span>Help</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
