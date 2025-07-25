import { Link } from "react-router-dom";

export default function NavCategories() {
  const categories = [
    { name: "Collections", path: "/collections" },
    { name: "Jewelry & Watches", path: "/jewelry-watches" },
    { name: "Luxury Fashion", path: "/luxury-fashion" },
    { name: "Accessories", path: "/accessories" },
    { name: "Beauty & Fragrance", path: "/beauty" },
    { name: "Designer Home", path: "/home" },
    { name: "Exclusive", path: "/exclusive" },
  ];

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex justify-center space-x-6">
          {" "}
          {categories.map((category) => (
            <li key={category.path}>
              <Link
                to={category.path}
                className="inline-block py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-900 transition-colors"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
