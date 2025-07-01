import { Button } from "@/components/ui/button";
import { RotateCcw, Shield, MapPin, Lock } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-white h-[500px] relative">
      <div className="max-w-[1440px] mx-auto relative overflow-hidden h-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-tr from-blue-200/60 via-transparent to-blue-400/40"></div>
        </div>
        <div className="absolute inset-0">
          <img 
        src="/attached_images/banner2.png" 
        alt="Hero banner" 
        className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-400 bg-opacity-30"></div>
        </div>

        <div className="px-4 py-8 relative z-10 h-full">
          <div className="flex flex-col lg:flex-row items-center justify-between h-full">
        {/* Hero content - Center */}
        <div className="w-full flex flex-col items-center justify-center text-center h-full relative">
          <h1 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500">Shop Prescription Glasses</span>
            <span className="block font-semibold text-white">& Sunglasses Online</span>
          </h1>
          <p className="text-base lg:text-xl text-black mb-6 max-w-2xl mx-auto leading-relaxed font-medium italic tracking-wide">
            Free Lenses Included With Every Frame, Delivered Across <span className="morocco-animate">Morocco</span>
          </p>
          <Button className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full text-base font-semibold uppercase tracking-wide shadow-md transition-all duration-200 hover:shadow-lg mb-2">
            Shop now
          </Button>

          {/* Trust badges absolutely positioned at bottom 20% */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 'calc(20% - 75px)' }}>
            <div className="flex bg-white/40 backdrop-blur-md rounded-full shadow-2xl overflow-hidden border-2 border-purple-300 divide-x-2 divide-purple-200">
              {/* 30-Day Free Return */}
              <div className="flex items-center gap-3 px-8 py-5 text-purple-900 bg-white/80 hover:bg-purple-100 transition-colors duration-200 first:rounded-l-full last:rounded-r-full text-base">
                <RotateCcw className="w-6 h-6 text-purple-700" />
                <span className="font-semibold whitespace-nowrap">30-Day Free Return</span>
              </div>
              {/* 365-Day Guarantee */}
              <div className="flex items-center gap-3 px-8 py-5 text-purple-900 bg-white/80 hover:bg-purple-100 transition-colors duration-200 first:rounded-l-full last:rounded-r-full text-base">
                <Shield className="w-6 h-6 text-purple-700" />
                <span className="font-semibold whitespace-nowrap">365-Day Guarantee</span>
              </div>
              {/* Delivery within all of Morocco */}
              <div className="flex items-center gap-3 px-8 py-5 text-purple-900 bg-white/80 hover:bg-purple-100 transition-colors duration-200 first:rounded-l-full last:rounded-r-full text-base">
                <MapPin className="w-6 h-6 text-purple-700" />
                <span className="font-semibold whitespace-nowrap">
                  Delivery within all of <span className="morocco-animate">Morocco</span> 🇲🇦
                </span>
              </div>
              {/* Secure Online Ordering */}
              <div className="flex items-center gap-3 px-8 py-5 text-purple-900 bg-white/80 hover:bg-purple-100 transition-colors duration-200 first:rounded-l-full last:rounded-r-full text-base">
                <Lock className="w-6 h-6 text-purple-700" />
                <span className="font-semibold whitespace-nowrap">Secure Online Ordering</span>
              </div>
            </div>
          </div>
        </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
        {/* Top right circle - match style with other circles */}
        <div className="absolute top-8 right-8 w-20 h-20 border border-white border-opacity-30 rounded-full"></div>

        {/* Additional decorative circles */}
        <div className="absolute top-1/4 left-1/6 w-20 h-20 border border-white border-opacity-30 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/6 w-24 h-24 border border-white border-opacity-20 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-white border-opacity-25 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
