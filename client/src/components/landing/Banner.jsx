import { FiShoppingBag, FiArrowRight } from "react-icons/fi";
import banner from "../../assets/images/banner/banner.png";

// Hero banner component for the landing page, showcasing a full-width promotional section
// Uses a responsive layout with Tailwind CSS, aligning text with the first menu category
export default function Banner() {
  // Static content for the banner
  const bannerContent = {
    title: "Summer Luxury Collection",
    subtitle: "Discover exclusive premium pieces crafted for discerning taste",
    image: banner,
    cta: "Shop Collection",
  };

  return (
    // Main banner container with full-width and fixed height
    <section className="max-w-7xl mx-auto h-[550px] overflow-hidden relative">
      {/* Background image with overlay */}
      <img
        src={bannerContent.image}
        alt={bannerContent.title}
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero content */}
      <div className="relative flex items-center justify-center md:justify-start h-full px-6 lg:px-12">
        <div className="z-10 max-w-lg text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            {bannerContent.title}
          </h2>
          <p className="text-slate-200 text-sm sm:text-base md:text-lg mb-6">
            {" "}
            {bannerContent.subtitle}{" "}
          </p>
          <a
            href="/shop"
            className="inline-flex items-center p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md text-sm shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            aria-label={bannerContent.cta}
          >
            <FiShoppingBag className="w-5 h-5 mr-2" />
            {bannerContent.cta}
            <FiArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
