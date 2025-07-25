import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {" "}
          {/* About Section */}
          <div>
            <h3 className="text-white text-base font-semibold mb-3">
              About Luxora
            </h3>{" "}
            <p className="text-xs">
              {" "}
              Luxora offers an exclusive collection of luxury items, delivering
              premium quality and exceptional service to our distinguished
              clientele.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/collections" className="hover:text-white">
                  Collections
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <FiMapPin className="mr-2" />
                123 Luxury Avenue, Fashion District
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2" />
                +1 (234) 567-8900
              </li>
              <li className="flex items-center">
                <FiMail className="mr-2" />
                contact@luxora.com
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Newsletter
            </h3>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
              <button
                type="submit"
                className="w-full bg-white text-gray-900 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-800">
          {" "}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="hover:text-white">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm">© 2025 Luxora. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
