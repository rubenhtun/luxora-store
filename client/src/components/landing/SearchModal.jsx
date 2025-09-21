import { useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function SearchModal({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  onSearch,
}) {
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus input when modal opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-black/10 backdrop-blur-[1px] z-50 flex items-start justify-center pt-16 transition-all duration-300 ease-in-out">
      <div
        ref={searchRef}
        className="w-full max-w-lg mx-4 bg-white rounded-lg shadow-lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-white overflow-hidden">
            {/* Search icon */}
            <div className="flex items-center px-3 text-slate-500">
              <FiSearch className="text-lg" />
            </div>

            {/* Search input */}
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-grow pr-3 py-3 text-base placeholder:text-sm focus:outline-none"
            />

            {/* Search button */}
            <button
              type="submit"
              className="px-4 py-3 text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none transition-colors"
            >
              Search
            </button>

            {/* Close button */}
            <button
              type="button"
              className="p-3 text-slate-500 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
              onClick={onClose}
              aria-label="Close search modal"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
