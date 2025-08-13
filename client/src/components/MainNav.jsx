import { FiUser, FiHeart, FiShoppingCart, FiSearch } from "react-icons/fi";

export default function MainNav() {
  const navIcons = [FiUser, FiHeart, FiShoppingCart];

  return (
    <nav className="max-w-7xl mx-auto border-b border-gray-100 flex flex-col md:flex-row items-center justify-between py-4 px-4 lg:px-0 gap-4 md:gap-0">
      <h1 className="text-2xl font-bold text-gray-800">Luxora Store</h1>

      {/* Search bar with icon and button */}
      <div className="flex w-full md:flex-grow max-w-lg rounded-md focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-2 focus-within:ring-offset-white overflow-hidden border border-gray-300">
        {/* Search icon inside input */}
        <div className="flex items-center px-3 text-slate-500">
          <FiSearch className="text-lg" />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search products..."
          className="flex-grow pr-3 py-2 text-base placeholder:text-sm focus:outline-none"
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 text-sm hover:bg-blue-700 cursor-pointer transition-colors focus:outline-none rounded-none"
        >
          Search
        </button>
      </div>

      {/* Icons */}
      <div className="flex space-x-4 text-base">
        {navIcons.map((Icon, idx) => (
          <button
            key={idx}
            className="p-3 rounded-lg hover:bg-stone-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <Icon />
          </button>
        ))}
      </div>
    </nav>
  );
}
