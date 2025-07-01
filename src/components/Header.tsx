
import { Search, Heart, User, ShoppingBag } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Top bar with reviews and contact */}
      <div className="bg-gray-50 py-2 text-xs">
        <div className="max-w-[1440px] mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-green-600 font-medium">
              ★ Over 40,000 Reviews
            </span>
            <span className="text-gray-600">Rated Great on Trustpilot</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-gray-600">📞 01493 307 345</span>
            <span className="text-gray-600">💬 Online Chat</span>
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
