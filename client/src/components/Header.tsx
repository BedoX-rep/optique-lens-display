
import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const leftNav = ["Glasses", "Sunglasses", "Designer Brands", "Reglaze"];
  const rightNav = ["About Us", "Explore"];

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top Header - Inspired by DirectSight design */}
      <div className="w-full bg-white text-sm py-2 px-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-700 font-medium">Over 4 years dispensing optical lenses to customers</span>
          <span className="text-gray-500">Rated Great on Trustpilot</span>
        </div>
        <div className="flex items-center gap-6 text-gray-700">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            01494 307 345
          </span>
        </div>
      </div>
      {/* Main Navigation */}
      <div className="w-full max-w-7xl mx-auto py-3 px-4 bg-white flex items-center justify-between">
        {/* Mobile Hamburger & Logo */}
        <div className="flex items-center md:hidden w-full justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2"><Menu className="h-7 w-7 text-[#220944]" /></button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[90vw] max-w-xs p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 py-4 border-b">
                  <span className="text-2xl font-bold tracking-wider select-none">
                    <span className="text-gray-800">OPTIQUE</span>
                    <span className="text-gray-500">LENS</span>
                  </span>
                  <button className="p-1"><X className="h-7 w-7 text-[#220944]" /></button>
                </div>
                <div className="text-center text-xs brand-font-primary font-semibold brand-text-primary py-2 border-b bg-white">Glasses From 99 MAD Including Prescription Lenses</div>
                <nav className="flex-1 overflow-y-auto">
                  {['Glasses', 'Sunglasses', 'Designer Brands', 'Lenses', 'Reglaze', 'Help'].map((item) => (
                    <div key={item} className="border-b">
                      <button className="w-full flex items-center justify-between px-4 py-4 text-base brand-font-primary font-medium brand-text-primary focus:outline-none">
                        {item}
                        <span className="ml-2">&#9662;</span>
                      </button>
                    </div>
                  ))}
                </nav>
                <div className="flex items-center justify-between px-4 py-4 border-t">
                  <button><Search className="h-6 w-6 text-[#220944]" /></button>
                  <button><User className="h-6 w-6 text-[#220944]" /></button>
                  <button><ShoppingCart className="h-6 w-6 text-[#220944]" /></button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <span className="text-2xl font-bold tracking-wider select-none mx-auto">
            <span className="text-gray-800">OPTIQUE</span>
            <span className="text-gray-500">LENS</span>
          </span>
          <div className="flex items-center gap-4">
            <button><Search className="h-6 w-6 text-[#220944]" /></button>
            <button><ShoppingCart className="h-6 w-6 text-[#220944]" /></button>
          </div>
        </div>

        {/* Desktop Navigation - DirectSight Style */}
        <nav className="hidden md:flex gap-8 text-gray-700 text-sm font-medium items-center">
          {leftNav.map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-gray-900 transition-colors py-2"
            >
              {item}
            </a>
          ))}
        </nav>
        
        {/* Center Logo */}
        <div className="hidden md:flex justify-center">
          <span className="text-3xl font-bold tracking-wider select-none">
            <span className="text-gray-800">OPTIQUE</span>
            <span className="text-gray-500">LENS</span>
          </span>
        </div>
        
        {/* Right Navigation and Icons */}
        <div className="hidden md:flex items-center justify-end">
          <nav className="flex gap-8 text-gray-700 text-sm font-medium items-center mr-8">
            {rightNav.map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-gray-900 transition-colors py-2"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <button className="p-1 hover:text-gray-900 transition-colors">
              <Search className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Search</span>
            </button>
            <button className="p-1 hover:text-gray-900 transition-colors">
              <User className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Favourites</span>
            </button>
            <button className="p-1 hover:text-gray-900 transition-colors">
              <User className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Account</span>
            </button>
            <button className="p-1 hover:text-gray-900 transition-colors">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Basket</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
