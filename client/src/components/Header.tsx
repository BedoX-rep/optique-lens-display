import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingCart, User, Heart } from "lucide-react";
import { Link, useLocation } from "wouter";
import CartDrawer from "./CartDrawer";
import { getCloudinaryUrl } from "@shared/image-mappings";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [location] = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update cart count
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((total: number, item: any) => total + (item.quantity || 1), 0);
        setCartItemCount(totalItems);
      } catch (error) {
        setCartItemCount(0);
      }
    };

    updateCartCount();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
    };

    const handleCartUpdate = () => updateCartCount();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const leftNavLinks = [
    { name: "Eye Exams", path: "/eye-exams" },
    { name: "Contact Lenses", path: "/contact-lenses" },
    { name: "Optical", path: "/products?category=optical" },
    { name: "Sunglasses", path: "/products?category=sunglasses" },
  ];

  const rightNavLinks = [
    { name: "Explore", path: "/explore" },
    { name: "Home Try-On", path: "/try-on" },
    { name: "About", path: "/about" },
  ];

  const allLinks = [...leftNavLinks, ...rightNavLinks];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
          ? "bg-white/95 backdrop-blur-md border-gray-100 py-3 shadow-sm"
          : "bg-white border-transparent py-5"
          }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative">
          <div className="flex items-center justify-between h-[61px]">
            {/* Left Side: Mobile Menu & Left Nav */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 -ml-2 text-gray-900 hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Desktop Left Navigation */}
              <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                {leftNavLinks.map((link) => (
                  <Link key={link.path} href={link.path}>
                    <a className={`text-sm font-medium tracking-wide transition-colors duration-200 ${location === link.path
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                      }`}>
                      {link.name.toUpperCase()}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Link href="/">
                <a className="flex-shrink-0 group block">
                  <img
                    src="/test-frames/logo-caps.png"
                    alt="OPTIQUELENS"
                    className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
                  />
                </a>
              </Link>
            </div>

            {/* Right Side: Right Nav & Actions */}
            <div className="flex items-center space-x-6 xl:space-x-8">
              {/* Desktop Right Navigation */}
              <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                {rightNavLinks.map((link) => (
                  <Link key={link.path} href={link.path}>
                    <a className={`text-sm font-medium tracking-wide transition-colors duration-200 ${location === link.path
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                      }`}>
                      {link.name.toUpperCase()}
                    </a>
                  </Link>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center space-x-4 md:space-x-6 pl-4 border-l border-gray-200">
                <button className="hidden md:block text-gray-500 hover:text-gray-900 transition-colors">
                  <Search size={20} strokeWidth={1.5} />
                </button>
                <button className="hidden md:block text-gray-500 hover:text-gray-900 transition-colors">
                  <User size={20} strokeWidth={1.5} />
                </button>
                <button className="text-gray-500 hover:text-gray-900 transition-colors relative group">
                  <Heart size={20} strokeWidth={1.5} />
                </button>
                <button
                  className="text-gray-900 hover:text-gray-600 transition-colors relative group"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart size={20} strokeWidth={1.5} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`} onClick={() => setIsMenuOpen(false)} />

        {/* Mobile Menu Drawer */}
        <div className={`fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-out lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold tracking-tight">MENU</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 text-gray-500">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              {allLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <a
                    className="text-xl font-medium text-gray-900 hover:text-gray-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <button className="flex items-center space-x-3 text-gray-600 font-medium">
                  <User size={20} />
                  <span>My Account</span>
                </button>
                <button className="flex items-center space-x-3 text-gray-600 font-medium">
                  <Search size={20} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jumping when header becomes fixed */}
      <div className="h-[61px]" />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
