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
    <section className="w-full h-[450px] overflow-hidden">
      {/* Hero content with full-width background image */}
      <div className="relative flex items-center justify-center md:justify-end h-full">
        {/* Background image with subtle overlay */}
        <img
          src={bannerContent.image}
          alt={bannerContent.title}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Text content aligned with first menu category */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-0 w-full text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            {bannerContent.title}
          </h2>
          <p className="text-slate-200 text-sm sm:text-base md:text-lg mb-6 max-w-md">
            {bannerContent.subtitle}
          </p>
          <a
            href="/shop"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md font-semibold text-sm hover:bg-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            aria-label={bannerContent.cta}
          >
            <FiShoppingBag className="w-4 h-4 mr-2" />
            {bannerContent.cta}
            <FiArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
