import { FiPhone, FiMail, FiPackage, FiHelpCircle } from "react-icons/fi";

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

export default function Header() {
  return (
    <div className="max-w-7xl mx-auto border-b border-gray-100 py-2 px-4 lg:px-0">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        {/* Contact Information */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-2">
          <IconText icon={FiPhone}>+1 (234) 567-8900</IconText>
          <IconText icon={FiMail}>support@luxora.com</IconText>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center md:justify-end items-center gap-3 md:gap-2">
          <a href="/track-order" className="flex items-center text-slate-500">
            <IconText icon={FiPackage} iconPadding="p-1" />
            <span className="text-sm">Track Order</span>
          </a>

          <a href="/help" className="flex items-center text-slate-500">
            <IconText icon={FiHelpCircle} iconPadding="p-1" />
            <span className="text-sm">Help Center</span>
          </a>
        </div>
      </div>
    </div>
  );
}
