
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top bar with reviews and contact */}
      <div className="bg-gray-50 py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <span className="text-green-600 mr-1">★</span>
              Over 15,000 Reviews
            </span>
            <span>Rated 5★ on Trustpilot</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>0800 328 248</span>
            <span>Online Chat</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">OptiqueLens</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900">GLASSES</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">SUNGLASSES</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">CONTACT LENSES</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">HEARING</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">ABOUT US</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">BLOG</a>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-600" />
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
