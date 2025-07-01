
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* FAQ Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">FAQ's</h3>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-medium text-gray-900">Can I upgrade my new glasses to Single?</span>
                <span className="text-gray-500">+</span>
              </button>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-medium text-gray-900">Can I upgrade to sunglasses as Direct Sight?</span>
                <span className="text-gray-500">+</span>
              </button>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-medium text-gray-900">How should I fit online prescription glasses similar?</span>
                <span className="text-gray-500">+</span>
              </button>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-medium text-gray-900">How do I find prescription online?</span>
                <span className="text-gray-500">+</span>
              </button>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-medium text-gray-900">Why is a prescription glasses so expensive in the UK?</span>
                <span className="text-gray-500">+</span>
              </button>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-medium text-gray-900">Is it safe to order prescription glasses online instead?</span>
                <span className="text-gray-500">+</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="border-t border-gray-200 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Shop */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">All Glasses</a></li>
                <li><a href="#" className="hover:text-gray-900">Lens + Glasses</a></li>
                <li><a href="#" className="hover:text-gray-900">New Glasses</a></li>
                <li><a href="#" className="hover:text-gray-900">Sunglasses</a></li>
                <li><a href="#" className="hover:text-gray-900">Blue Light Glasses</a></li>
                <li><a href="#" className="hover:text-gray-900">Varifocal Glasses</a></li>
                <li><a href="#" className="hover:text-gray-900">Call Our Experts</a></li>
                <li><a href="#" className="hover:text-gray-900">Eye Tests</a></li>
              </ul>
            </div>

            {/* Guides */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Guides</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Face Frame Guide</a></li>
                <li><a href="#" className="hover:text-gray-900">Understanding Fits</a></li>
                <li><a href="#" className="hover:text-gray-900">Prescription Guide</a></li>
                <li><a href="#" className="hover:text-gray-900">Lens Guide</a></li>
                <li><a href="#" className="hover:text-gray-900">FAQs</a></li>
                <li><a href="#" className="hover:text-gray-900">Reviews</a></li>
                <li><a href="#" className="hover:text-gray-900">Size Guide</a></li>
                <li><a href="#" className="hover:text-gray-900">Lens Finder & Clinic Finder</a></li>
              </ul>
            </div>

            {/* Lenses */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Lenses</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">All Lenses</a></li>
                <li><a href="#" className="hover:text-gray-900">Standard Lenses</a></li>
                <li><a href="#" className="hover:text-gray-900">Varifocal Lenses</a></li>
                <li><a href="#" className="hover:text-gray-900">Blue Light Lenses</a></li>
                <li><a href="#" className="hover:text-gray-900">Lens FAQ</a></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">About</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Our Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Press Enquiries</a></li>
                <li><a href="#" className="hover:text-gray-900">Affiliate</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Press Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Site Map</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter and Contact */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">OptiqueLens</h3>
                <p className="text-gray-600 mb-4">Subscribe for launches, news and special offers!</p>
              </div>
              <div className="flex items-center space-x-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Submit
                </button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <div className="text-blue-600 text-xl font-bold mb-4">Have a question?</div>
              <p className="text-gray-600 mb-4">
                We're here to help you find exactly what you're looking for.
                Monday - Friday 9am - 5pm. Saturday 10am - 4pm.
              </p>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    📞
                  </div>
                  <span className="text-sm text-gray-600">Call</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    💬
                  </div>
                  <span className="text-sm text-gray-600">Chat</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    ✉️
                  </div>
                  <span className="text-sm text-gray-600">Email</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    📍
                  </div>
                  <span className="text-sm text-gray-600">Visit</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
              <p>Direct Sight Ltd is a company registered in England and Wales under company number XXXXXXX.</p>
              <div className="flex justify-center space-x-4 mt-4">
                <span>🔒</span>
                <span>💳</span>
                <span>🚚</span>
                <span>📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
