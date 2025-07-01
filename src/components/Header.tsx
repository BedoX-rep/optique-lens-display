
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
      {/* Main Header - Responsive */}
      <div className="w-full max-w-[1440px] mx-auto py-2 px-4 bg-white flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
        {/* Mobile Hamburger & Logo */}
        <div className="flex items-center md:hidden w-full justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2"><Menu className="h-7 w-7 text-[#220944]" /></button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[90vw] max-w-xs p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 py-4 border-b">
                  <span className="text-2xl font-bold tracking-widest select-none">
                    <span className="text-[#220944]">OPTIQUE</span>
                    <span className="text-gray-500">LENS</span>
                  </span>
                  <button className="p-1"><X className="h-7 w-7 text-[#220944]" /></button>
                </div>
                <div className="text-center text-xs font-semibold text-[#220944] py-2 border-b bg-white">Glasses From 99 MAD Including Prescription Lenses</div>
                <nav className="flex-1 overflow-y-auto">
                  {['Glasses', 'Sunglasses', 'Designer Brands', 'Lenses', 'Reglaze', 'Help'].map((item) => (
                    <div key={item} className="border-b">
                      <button className="w-full flex items-center justify-between px-4 py-4 text-base font-medium text-[#220944] focus:outline-none">
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
          <span className="text-2xl font-bold tracking-widest select-none mx-auto">
            <span className="text-[#220944]">OPTIQUE</span>
            <span className="text-gray-500">LENS</span>
          </span>
          <div className="flex items-center gap-4">
            <button><Search className="h-6 w-6 text-[#220944]" /></button>
            <button><ShoppingCart className="h-6 w-6 text-[#220944]" /></button>
          </div>
        </div>

        {/* Desktop Nav & Logo */}
        <nav className="hidden md:flex gap-6 text-[#220944] text-[15px] font-medium h-full items-center tracking-wide justify-start">
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
        <div className="hidden md:flex justify-center" style={{ transform: 'translateX(-20px)' }}>
          <span className="text-2xl font-bold tracking-widest select-none">
            <span className="text-[#220944]">OPTIQUE</span>
            <span className="text-gray-500">LENS</span>
          </span>
        </div>
        <div className="hidden md:flex items-center justify-end gap-8">
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
