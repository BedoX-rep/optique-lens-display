
import { Search, Heart, User, ShoppingBag } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Top bar with store finder and language switcher */}
      <div className="flex justify-center bg-white">
        <div className="bg-gray-50 text-xs h-[44px] flex items-center max-w-[1440px] w-full">
          <div className="w-full px-4 flex justify-between items-center h-full">
            <div className="flex items-center space-x-6 h-full">
              <span className="text-gray-600 hover:text-blue-600 cursor-pointer flex items-center h-full text-[11px] font-medium">
                📍 Find Our Store
              </span>
              <div className="flex items-center space-x-2 h-full">
                <div className="flex items-center space-x-1 bg-white rounded-md px-2 py-1 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
                  <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  <select className="bg-transparent text-gray-600 text-[11px] border-none outline-none cursor-pointer hover:text-blue-600 font-medium pr-1">
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 h-full">
              <span className="text-gray-600 hover:text-blue-600 cursor-pointer flex items-center h-full text-[11px] font-medium">
                📞 01493 307 345
              </span>
              <span className="text-gray-600 hover:text-blue-600 cursor-pointer flex items-center h-full text-[11px] font-medium">
                💬 Online Chat
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-[1440px] mx-auto px-4 h-[70px]">
        <div className="flex items-center justify-between h-full">
          {/* Left Navigation */}
          <nav className="flex items-center space-x-8">
            <a href="#" className="text-gray-800 hover:text-blue-600 font-medium text-sm uppercase tracking-wide">Glasses</a>
            <a href="#" className="text-gray-800 hover:text-blue-600 font-medium text-sm uppercase tracking-wide">Sunglasses</a>
            <a href="#" className="text-gray-800 hover:text-blue-600 font-medium text-sm uppercase tracking-wide">Designer Brands</a>
            <a href="#" className="text-gray-800 hover:text-blue-600 font-medium text-sm uppercase tracking-wide">Reglaze</a>
          </nav>

          {/* Center Logo */}
          <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-bold text-gray-900 tracking-wider">
              OPTIQUE<span className="font-light">LENS</span>
            </h1>
          </div>

          {/* Right side navigation and icons */}
          <div className="flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium text-sm uppercase tracking-wide">About Us</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium text-sm uppercase tracking-wide">Explore</a>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center cursor-pointer group">
                <Search className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                <span className="text-gray-600 text-xs mt-1 group-hover:text-blue-600">Search</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <Heart className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                <span className="text-gray-600 text-xs mt-1 group-hover:text-blue-600">Favourites</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <User className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                <span className="text-gray-600 text-xs mt-1 group-hover:text-blue-600">Account</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                <span className="text-gray-600 text-xs mt-1 group-hover:text-blue-600">Basket</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
