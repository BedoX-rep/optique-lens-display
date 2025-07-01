
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

  const navItems = [
    "GLASSES",
    "SUNGLASSES", 
    "CONTACT LENSES",
    "EYE TESTS",
    "OFFERS"
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Top Bar - Hidden on mobile */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <span>📞 +212 123 456 789</span>
            <span>📧 contact@optiquelens.ma</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>🚚 Free delivery across Morocco</span>
            <span>🔄 30-day returns</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="p-0">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors py-2 border-b border-gray-100"
                  >
                    {item}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col space-y-3 text-sm text-gray-600">
                  <span>📞 +212 123 456 789</span>
                  <span>📧 contact@optiquelens.ma</span>
                  <span>🚚 Free delivery across Morocco</span>
                  <span>🔄 30-day returns</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-800">
              OptiqueLens
            </h1>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="sm" className="p-2">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
