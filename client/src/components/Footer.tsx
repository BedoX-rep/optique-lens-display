import "../styles/brand-system.css";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 py-16">
      <div className="w-full max-w-[1440px] mx-auto px-4">
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
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Press Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">Site Map</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-teal-50 rounded-2xl p-8 mt-12 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="brand-font-heading text-xl text-gray-900 mb-4">
              Stay Updated with OptiqueLens
            </h4>
            <p className="brand-font-primary text-gray-600 mb-6">
              Get the latest news, exclusive offers, and eyewear trends delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                data-testid="input-newsletter-email"
              />
              <button 
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 brand-font-primary font-medium"
                data-testid="button-newsletter-subscribe"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="brand-font-primary text-gray-600 text-center md:text-left">
              © 2024 OptiqueLens. All rights reserved.
            </p>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-sm brand-font-primary text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-teal-600">🛡️</span>
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-teal-600">📦</span>
                <span>Free Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-teal-600">💎</span>
                <span>Quality Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;