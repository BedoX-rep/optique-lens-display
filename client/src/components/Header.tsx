
import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import "../styles/brand-system.css";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = ["Eyeglasses", "Sunglasses", "Contacts", "Accessories", "Eye exams", "Find a store"];

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Main Navigation */}
      <div className="w-full bg-white py-4 flex justify-center">
        <div className="w-full max-w-[1440px] px-4 flex items-center justify-between">
          {/* Left Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-wider select-none" data-testid="logo-optique">
              <span className="text-teal-600">OPTIQUE</span>
              <span className="text-gray-900">LENS</span>
            </Link>
          </div>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center justify-center space-x-8">
            <Link
              to="/products"
              className="text-gray-700 hover:text-gray-900 text-base font-medium transition-colors"
              data-testid="nav-eyeglasses"
            >
              Eyeglasses
            </Link>
            {navigationItems.slice(1).map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-gray-900 text-base font-medium transition-colors"
                data-testid={`nav-${item.toLowerCase().replace(' ', '-')}`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right Side - Sign in + Icons */}
          <div className="flex items-center space-x-6">
            {/* Sign in - Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 text-base font-medium">Sign in</span>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              <button 
                className="p-1 hover:text-gray-900 transition-colors"
                data-testid="button-search"
              >
                <Search className="h-5 w-5 text-gray-600" />
                <span className="sr-only">Search</span>
              </button>
              
              <button 
                className="p-1 hover:text-gray-900 transition-colors"
                data-testid="button-wishlist"
              >
                <Heart className="h-5 w-5 text-gray-600" />
                <span className="sr-only">Wishlist</span>
              </button>
              
              <button 
                className="p-1 hover:text-gray-900 transition-colors"
                data-testid="button-cart"
              >
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="sr-only">Cart</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 lg:hidden" data-testid="mobile-menu-trigger">
                  <Menu className="h-6 w-6 text-gray-600" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-6 py-4 border-b">
                    <span className="text-xl font-bold tracking-wider select-none">
                      <span className="text-teal-600">OPTIQUE</span>
                      <span className="text-gray-900">LENS</span>
                    </span>
                  </div>
                  <nav className="flex-1 overflow-y-auto py-4">
                    <div className="px-6 py-3 border-b">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700 font-medium">Sign in</span>
                      </div>
                    </div>
                    {navigationItems.map((item) => (
                      <div key={item} className="border-b">
                        <a
                          href="#"
                          className="block px-6 py-4 text-base font-medium text-gray-700 hover:text-gray-900"
                        >
                          {item}
                        </a>
                      </div>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
