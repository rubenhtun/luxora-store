import { FiPhone, FiMail, FiPackage, FiHelpCircle } from "react-icons/fi";

// Reusable component for rendering an icon with adjacent text, supporting customizable styling
// Props:
// - icon: React component for the icon (e.g., FiPhone)
// - children: Text content to display
// - textColor: Tailwind class for text color (defaults to text-slate-500)
// - iconPadding: Tailwind class for icon padding (defaults to p-1)
function IconText({
  icon: Icon,
  children,
  textColor = "text-slate-500",
  iconPadding = "p-1",
}) {
  return (
    <div className={`flex items-center ${textColor}`}>
      <div className={iconPadding}>
        <Icon className="w-3 h-3" />
      </div>
      <span className="text-sm">{children}</span>
    </div>
  );
}

// Renders the landing page header with contact information and navigation links
// Uses a responsive layout with Tailwind CSS for mobile and desktop displays
export default function Header() {
  return (
    // Main container with constrained width, centered layout, and subtle bottom border
    <div className="max-w-7xl mx-auto border-b border-gray-100 py-2 px-4 lg:px-0">
      {/* Responsive flex container for contact info and navigation */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        {/* Contact information section, centered on mobile, left-aligned on desktop */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-2">
          <IconText icon={FiPhone}>+1 (234) 567-8900</IconText>
          <IconText icon={FiMail}>support@luxora.com</IconText>
        </div>

        {/* Navigation links section, centered on mobile, right-aligned on desktop */}
        <div className="flex justify-center md:justify-end items-center gap-3 md:gap-2">
          {/* Track Order link with icon */}
          <a href="/track-order" className="flex items-center text-slate-500">
            <IconText icon={FiPackage} iconPadding="p-1" />
            <span className="text-sm">Track Order</span>
          </a>

          {/* Help Center link with icon */}
          <a href="/help" className="flex items-center text-slate-500">
            <IconText icon={FiHelpCircle} iconPadding="p-1" />
            <span className="text-sm">Help Center</span>
          </a>
        </div>
      </div>
    </div>
  );
}
