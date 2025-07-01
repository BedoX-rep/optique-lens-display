
import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const leftNav = ["Glasses", "Sunglasses", "Designer Brands", "Eye tests"];
  const rightNav = ["About Us", "Explore"];

  return (
    <header className="w-full bg-white border-b border-gray-100">
      {/* Utmost Top Header */}
      <div className="w-full bg-gray-50 text-xs text-gray-600 py-1 px-4 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Find Our Store
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 20c0-2.21 3.58-4 8-4s8 1.79 8 4v2H2v-2z" /></svg>
            English
            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-1.3L17 13M7 13V6h10v7" /></svg>
            01493 307 345
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
            Online Chat
          </span>
        </div>
      </div>
      {/* Main Header */}
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-3 items-center py-2 px-4 bg-white">
        {/* Left nav */}
        <nav className="flex gap-6 text-[#220944] text-[15px] font-medium h-full items-center tracking-wide justify-start">
          {leftNav.map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-[#6d28d9] transition-colors h-full flex items-center px-2"
              style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, letterSpacing: '0.02em', textTransform: 'capitalize' }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Logo */}
        <div className="flex justify-center" style={{ transform: 'translateX(-20px)' }}>
          <span className="text-2xl font-bold tracking-widest select-none">
            <span className="text-[#220944]">OPTIQUE</span>
            <span className="text-gray-500">LENS</span>
          </span>
        </div>

        {/* Right nav and icons */}
        <div className="flex items-center justify-end gap-8">
          <nav className="flex gap-6 text-[#220944] text-[15px] font-medium h-full items-center tracking-wide">
            {rightNav.map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-[#6d28d9] transition-colors h-full flex items-center px-2"
                style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, letterSpacing: '0.02em', textTransform: 'capitalize' }}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-end gap-8 ml-4">
            <div className="flex flex-col items-center group">
              <Search className="h-6 w-6 text-[#220944] group-hover:text-black transition-colors" />
              <span className="text-xs text-gray-500 mt-1">Search</span>
            </div>
            <div className="flex flex-col items-center group">
              <User className="h-6 w-6 text-[#220944] group-hover:text-black transition-colors" />
              <span className="text-xs text-gray-500 mt-1">Account</span>
            </div>
            <div className="flex flex-col items-center group">
              <ShoppingCart className="h-6 w-6 text-[#220944] group-hover:text-black transition-colors" />
              <span className="text-xs text-gray-500 mt-1">Basket</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
