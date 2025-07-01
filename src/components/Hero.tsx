
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-100 to-blue-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="relative">
          {/* Floating glasses images */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-8 left-16 w-32 h-20 bg-gray-200 rounded-lg opacity-80"></div>
            <div className="absolute top-12 right-20 w-28 h-18 bg-gray-300 rounded-lg opacity-70"></div>
            <div className="absolute bottom-16 left-32 w-36 h-22 bg-gray-250 rounded-lg opacity-60"></div>
            <div className="absolute bottom-20 right-16 w-30 h-20 bg-gray-200 rounded-lg opacity-75"></div>
          </div>

          {/* Hero content */}
          <div className="text-center relative z-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Prescription Glasses &<br />
              Sunglasses Online
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Free Single Vision Prescription Lenses<br />
              Included with All Frames
            </p>
            <Button className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-3 rounded-full text-lg">
              Shop now
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex justify-center items-center space-x-8 mt-12 text-sm text-gray-700">
            <div className="flex items-center">
              <span className="mr-2">📦</span>
              30-Day Free Return
            </div>
            <div className="flex items-center">
              <span className="mr-2">🛡️</span>
              365-Day Guarantee
            </div>
            <div className="flex items-center">
              <span className="mr-2">🇬🇧</span>
              Made in the UK
            </div>
            <div className="flex items-center">
              <span className="mr-2">🔒</span>
              Secure Online Ordering
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
