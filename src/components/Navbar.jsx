import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/queries", label: "Queries" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#001A4D] to-[#000B2F] shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-14 py-3 sm:py-4">
        
      
        <Link to="/" className="flex items-center">
          <div className="p-[3px] rounded-full bg-gradient-to-r from-[#001A4D] to-[#000B2F]">
            <img
              src="/pic1.jpg"
              alt="Logo"
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        
        <div className="flex items-center space-x-5 sm:space-x-12 pr-2 sm:pr-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-sm sm:text-lg font-medium text-white tracking-wide transition-all duration-300 ${
                pathname === item.path
                  ? "text-sky-400 after:w-full"
                  : "hover:text-sky-400"
              } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-sky-400 after:w-0 hover:after:w-full after:transition-all after:duration-500 after:ease-out`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
