import "../styles/brand-system.css";

const Footer = () => {
  return (
    <footer className="py-12">
      <div className="w-full max-w-[1440px] mx-auto px-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-2xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="brand-font-heading text-2xl mb-6 text-gray-900">
              <span className="text-teal-600">OPTIQUE</span>
              <span className="font-normal">LENS</span>
            </h3>
            <p className="brand-font-primary text-gray-600 mb-6 leading-relaxed">
              Your trusted online destination for prescription glasses, sunglasses, and eye care solutions.
            </p>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-gray-500 hover:text-teal-600 transition-colors duration-200"
                data-testid="social-facebook"
              >
                Facebook
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-teal-600 transition-colors duration-200"
                data-testid="social-twitter"
              >
                Twitter
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-teal-600 transition-colors duration-200"
                data-testid="social-instagram"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="brand-font-heading font-bold text-gray-900 mb-6">Customer Service</h4>
            <ul className="space-y-3 brand-font-primary">
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Size Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Prescription Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Shipping Info</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">FAQ</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="brand-font-heading font-bold text-gray-900 mb-6">Products</h4>
            <ul className="space-y-3 brand-font-primary">
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Prescription Glasses</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Sunglasses</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Reading Glasses</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Designer Brands</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Contact Lenses</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Accessories</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="brand-font-heading font-bold text-gray-900 mb-6">About</h4>
            <ul className="space-y-3 brand-font-primary">
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Our Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Press Enquiries</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Affiliate</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 text-center">
          <p className="brand-font-primary text-gray-600">
            © 2024 OptiqueLens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;