import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiStar,
  FiTruck,
  FiHeadphones,
  FiRotateCcw,
  FiShield,
  FiSend,
  FiCheck,
} from "react-icons/fi";

// Footer component for displaying brand info, links, and newsletter subscription
// Uses responsive Tailwind CSS layout with white background, consistent with ProductsList and NavCategories
export default function Footer() {
  // State for newsletter subscription
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Handles newsletter subscription with success feedback
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // Footer links organized by category
  const footerLinks = {
    shop: [
      { name: "New Arrivals", href: "/new-arrivals" },
      { name: "Collections", href: "/collections" },
      { name: "Jewelry & Watches", href: "/jewelry-watches" },
      { name: "Luxury Fashion", href: "/luxury-fashion" },
      { name: "Accessories", href: "/accessories" },
    ],
    company: [
      { name: "About Luxora", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Careers", href: "/careers" },
      { name: "Sustainability", href: "/sustainability" },
    ],
    support: [
      { name: "Customer Service", href: "/support" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "FAQ", href: "/faq" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  // Feature highlights with icons and descriptions
  const features = [
    {
      icon: FiTruck,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: FiHeadphones,
      title: "24/7 Support",
      description: "Premium customer care",
    },
    {
      icon: FiRotateCcw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: FiShield,
      title: "Secure Shopping",
      description: "Protected transactions",
    },
  ];

  // Social media links with icons
  const socialLinks = [
    { icon: FiFacebook, href: "#", label: "Facebook" },
    { icon: FiInstagram, href: "#", label: "Instagram" },
    { icon: FiTwitter, href: "#", label: "Twitter" },
  ];

  return (
    // Main footer container with white background
    <footer className="bg-white text-gray-800">
      {/* Features section with centered layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Icon className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="text-sm font-semibold text-gray-800">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-500 text-center">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main footer content with links and newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section with logo and contact info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md flex items-center justify-center">
                <FiStar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">LUXORA</h2>
                <p className="text-xs text-gray-500">Premium Store</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Luxora offers an exclusive collection of luxury items, delivering
              premium quality and exceptional service.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-500 hover:text-gray-800">
                <FiMapPin className="w-4 h-4 text-blue-600 mr-2" />
                <span>123 Luxury Avenue, Fashion District</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 hover:text-gray-800">
                <FiPhone className="w-4 h-4 text-blue-600 mr-2" />
                <span>+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 hover:text-gray-800">
                <FiMail className="w-4 h-4 text-blue-600 mr-2" />
                <span>contact@luxora.com</span>
              </div>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-blue-600 group transition-colors"
                  >
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-blue-600 group transition-colors"
                  >
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter section with subscription form */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Get exclusive offers and updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                disabled={isSubscribed}
                className={`w-full px-4 py-2.5 text-sm text-white rounded-md transition-colors ${
                  isSubscribed
                    ? "bg-gray-500"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                } flex items-center justify-center cursor-pointer`}
              >
                {isSubscribed ? (
                  <>
                    <FiCheck
                      className="w-4 h-4 mr-2 text-white"
                      aria-hidden="true"
                    />
                    Subscribed
                  </>
                ) : (
                  <>
                    <FiSend
                      className="w-4 h-4 mr-2 text-white"
                      aria-hidden="true"
                    />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar with social and legal links */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Follow us:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              © 2025 <span className="text-gray-800 font-semibold">Luxora</span>
              . All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
