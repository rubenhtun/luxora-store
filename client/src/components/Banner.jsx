import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerContent = [
    {
      title: "Summer Luxury Collection",
      subtitle: "Discover exclusive pieces",
      image:
        "https://images.unsplash.com/photo-1541296289102-068d537670af?auto=format&fit=crop&q=80",
      cta: "Shop Now",
    },
    {
      title: "New Arrivals",
      subtitle: "Premium selections",
      image:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80",
      cta: "Explore",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerContent.length) % bannerContent.length
    );
  };

  return (
    <div className="relative h-[400px] overflow-hidden">
      {" "}
      {bannerContent.map((content, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={content.image}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30">
              <div className="max-w-7xl mx-auto h-full flex items-center px-4">
                <div className="text-white">
                  <h2 className="text-4xl font-bold mb-2">{content.title}</h2>{" "}
                  <p className="text-lg mb-4">{content.subtitle}</p>{" "}
                  <button className="bg-white text-black px-6 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors">
                    {" "}
                    {content.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/75 transition-colors"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/75 transition-colors"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
