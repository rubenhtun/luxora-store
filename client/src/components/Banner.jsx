import { useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const bannerContent = [
    {
      title: "Summer Luxury Collection",
      subtitle:
        "Discover exclusive premium pieces crafted for discerning taste",
      image:
        "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&q=80",
      cta: "Shop Collection",
      badge: "NEW",
      badgeColor: "from-green-500 to-emerald-500",
      accent: "from-blue-600 to-indigo-600",
    },
    {
      title: "Designer New Arrivals",
      subtitle: "Premium selections from world-renowned luxury brands",
      image:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80",
      cta: "Explore Now",
      badge: "EXCLUSIVE",
      badgeColor: "from-purple-500 to-pink-500",
      accent: "from-purple-600 to-pink-600",
    },
    {
      title: "VIP Member Benefits",
      subtitle: "Unlock exclusive access to limited edition collections",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80",
      cta: "Join VIP",
      badge: "VIP",
      badgeColor: "from-yellow-500 to-orange-500",
      accent: "from-indigo-600 to-purple-600",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerContent.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, bannerContent.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % bannerContent.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) => (prev - 1 + bannerContent.length) % bannerContent.length
    );
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden bg-gradient-to-r from-gray-100 to-slate-100">
      {/* Slides */}
      {bannerContent.map((content, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "translate-x-0 opacity-100"
              : index < currentSlide
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="relative w-full h-full">
            {/* Background Image */}
            <img
              src={content.image}
              alt={content.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0">
              <div className="max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
                <div className="text-white max-w-2xl">
                  {/* Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${content.badgeColor} shadow-lg backdrop-blur-sm`}
                    >
                      <FiStar className="w-3 h-3 mr-1" />
                      {content.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                    <span className="block">
                      {content.title.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <span
                      className={`block bg-gradient-to-r ${content.accent} bg-clip-text text-transparent`}
                    >
                      {content.title.split(" ").slice(2).join(" ")}
                    </span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-200 leading-relaxed max-w-xl">
                    {content.subtitle}
                  </p>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      className={`group flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${content.accent} text-white rounded-xl font-semibold text-sm sm:text-base hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20`}
                    >
                      <FiShoppingBag className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      {content.cta}
                      <FiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button className="group flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-xl text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-white/20 transition-all duration-300 border border-white/30 hover:border-white/50">
                      Learn More
                      <FiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 backdrop-blur-xl text-white rounded-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg group z-10"
      >
        <FiChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 backdrop-blur-xl text-white rounded-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg group z-10"
      >
        <FiChevronRight className="w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {bannerContent.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <div
          className={`h-full bg-gradient-to-r ${bannerContent[currentSlide].accent} transition-all duration-300`}
          style={{
            width: isAutoPlaying ? "100%" : "0%",
            animation: isAutoPlaying ? "progress 5s linear infinite" : "none",
          }}
        />
      </div>

      {/* Features Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-white text-xs sm:text-sm">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Free Shipping
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Premium Quality
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Exclusive Access
              </span>
            </div>

            <div className="text-xs text-gray-300">
              {String(currentSlide + 1).padStart(2, "0")} /{" "}
              {String(bannerContent.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
