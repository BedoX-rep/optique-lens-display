import "../styles/brand-system.css";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="brand-font-heading text-xl mb-4">OPTIQUE<span className="font-normal">LENS</span></h3>
            <p className="brand-font-primary text-gray-400 mb-4">
              Your trusted online destination for prescription glasses, sunglasses, and eye care solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="brand-font-heading font-bold text-gray-100 mb-4">Customer Service</h4>
            <ul className="space-y-2 brand-font-primary text-gray-400">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Size Guide</a></li>
              <li><a href="#" className="hover:text-white">Prescription Guide</a></li>
              <li><a href="#" className="hover:text-white">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="brand-font-heading font-bold text-gray-100 mb-4">Products</h4>
            <ul className="space-y-2 brand-font-primary text-gray-400">
              <li><a href="#" className="hover:text-white">Prescription Glasses</a></li>
              <li><a href="#" className="hover:text-white">Sunglasses</a></li>
              <li><a href="#" className="hover:text-white">Reading Glasses</a></li>
              <li><a href="#" className="hover:text-white">Designer Brands</a></li>
              <li><a href="#" className="hover:text-white">Contact Lenses</a></li>
              <li><a href="#" className="hover:text-white">Accessories</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="brand-font-heading font-bold text-gray-100 mb-4">About</h4>
            <ul className="space-y-2 brand-font-primary text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Our Blog</a></li>
              <li><a href="#" className="hover:text-white">Press Enquiries</a></li>
              <li><a href="#" className="hover:text-white">Affiliate</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Press Policy</a></li>
              <li><a href="#" className="hover:text-white">Site Map</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="brand-font-primary text-gray-400">
            © 2024 OptiqueLens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;