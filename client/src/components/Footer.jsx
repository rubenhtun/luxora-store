import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiStar,
  FiShoppingBag,
  FiHeart,
  FiShield,
  FiTruck,
  FiHeadphones,
  FiRotateCcw,
  FiArrowRight,
  FiSend,
} from "react-icons/fi";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    shop: [
      { name: "New Arrivals", href: "/new-arrivals", badge: "NEW" },
      { name: "Collections", href: "/collections" },
      { name: "Jewelry & Watches", href: "/jewelry-watches" },
      { name: "Luxury Fashion", href: "/luxury-fashion" },
      { name: "Accessories", href: "/accessories" },
      { name: "Beauty & Fragrance", href: "/beauty" },
    ],
    company: [
      { name: "About Luxora", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Brand Partners", href: "/partners" },
    ],
    support: [
      { name: "Customer Service", href: "/support" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "Track Your Order", href: "/track-order" },
      { name: "FAQ", href: "/faq" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  };

  const features = [
    {
      icon: FiTruck,
      title: "Free Shipping",
      description: "On orders over $50",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FiHeadphones,
      title: "24/7 Support",
      description: "Premium customer care",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: FiRotateCcw,
      title: "Easy Returns",
      description: "30-day return policy",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FiShield,
      title: "Secure Shopping",
      description: "Protected transactions",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Features Section */}
      <div className="relative border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center sm:items-start p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div
                    className={`p-3 bg-gradient-to-r ${feature.color} rounded-lg mb-3 sm:mb-0 sm:mr-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-white font-semibold text-sm sm:text-base mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-2">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FiStar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    LUXORA
                  </h2>
                  <p className="text-xs text-gray-400 -mt-1">Premium Store</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Luxora offers an exclusive collection of luxury items,
                delivering premium quality and exceptional service to our
                distinguished clientele worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm group hover:text-white transition-colors cursor-pointer">
                  <div className="p-2 bg-gradient-to-r from-blue-100/10 to-indigo-100/10 rounded-lg mr-3 group-hover:from-blue-100/20 group-hover:to-indigo-100/20 transition-all">
                    <FiMapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <span>123 Luxury Avenue, Fashion District</span>
                </div>
                <div className="flex items-center text-sm group hover:text-white transition-colors cursor-pointer">
                  <div className="p-2 bg-gradient-to-r from-green-100/10 to-emerald-100/10 rounded-lg mr-3 group-hover:from-green-100/20 group-hover:to-emerald-100/20 transition-all">
                    <FiPhone className="w-4 h-4 text-green-400" />
                  </div>
                  <span>+1 (234) 567-8900</span>
                </div>
                <div className="flex items-center text-sm group hover:text-white transition-colors cursor-pointer">
                  <div className="p-2 bg-gradient-to-r from-purple-100/10 to-pink-100/10 rounded-lg mr-3 group-hover:from-purple-100/20 group-hover:to-pink-100/20 transition-all">
                    <FiMail className="w-4 h-4 text-purple-400" />
                  </div>
                  <span>contact@luxora.com</span>
                </div>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
                <FiShoppingBag className="w-5 h-5 mr-2 text-blue-400" />
                Shop
              </h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                      {link.badge && (
                        <span className="ml-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
                <FiHeart className="w-5 h-5 mr-2 text-pink-400" />
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
                <FiHeadphones className="w-5 h-5 mr-2 text-green-400" />
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
                <FiMail className="w-5 h-5 mr-2 text-purple-400" />
                Newsletter
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Get exclusive offers and latest updates delivered to your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/10 transition-all duration-200 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isSubscribed
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-lg hover:scale-105"
                  }`}
                >
                  {isSubscribed ? (
                    <>
                      <FiShield className="w-4 h-4 mr-2" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4 mr-2" />
                      Subscribe
                      <FiArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800/50 bg-gradient-to-r from-gray-800/50 to-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400 mr-2">Follow us:</span>
              <div className="flex space-x-3">
                {[
                  {
                    icon: FiFacebook,
                    href: "#",
                    color: "from-blue-600 to-blue-700",
                  },
                  {
                    icon: FiInstagram,
                    href: "#",
                    color: "from-pink-600 to-purple-600",
                  },
                  {
                    icon: FiTwitter,
                    href: "#",
                    color: "from-sky-500 to-blue-600",
                  },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`p-2.5 bg-gradient-to-r ${social.color} rounded-lg text-white hover:scale-110 hover:shadow-lg transition-all duration-300 group`}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © 2025 <span className="text-white font-semibold">Luxora</span>.
              All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
