
import { Button } from "@/components/ui/button";
import { RotateCcw, Shield, MapPin, Lock } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-white h-[400px] md:h-[500px] relative">
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
              <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight tracking-tight px-4">
                <span className="block font-bold" style={{ color: '#220944' }}>Shop Prescription Glasses</span>
                <span className="block font-semibold text-white">& Sunglasses Online</span>
              </h1>
              <p className="text-sm md:text-base lg:text-xl text-black mb-6 max-w-2xl mx-auto leading-relaxed font-medium italic tracking-wide px-4">
                Free Lenses Included With Every Frame, Delivered Across <span className="morocco-animate">Morocco</span>
              </p>
              <Button className="bg-black hover:bg-gray-900 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold uppercase tracking-wide shadow-md transition-all duration-200 hover:shadow-lg mb-2">
                Shop now
              </Button>

              {/* Trust badges - responsive positioning */}
              <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 'calc(2rem - 50px)' }}>
                {/* Mobile version - stacked */}
                <div className="flex md:hidden flex-col bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <RotateCcw className="w-4 h-4" style={{ color: '#220944' }} />
                    <span className="font-semibold">30-Day Free Return</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Shield className="w-4 h-4" style={{ color: '#220944' }} />
                    <span className="font-semibold">365-Day Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-4 h-4" style={{ color: '#220944' }} />
                    <span className="font-semibold">Morocco Delivery 🇲🇦</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Lock className="w-4 h-4" style={{ color: '#220944' }} />
                    <span className="font-semibold">Secure Ordering</span>
                  </div>
                </div>

                {/* Desktop version - horizontal */}
                <div className="hidden md:flex bg-white/40 backdrop-blur-md rounded-full shadow-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-4 lg:px-8 py-3 lg:py-5 bg-white/80 hover:bg-gray-100 transition-colors duration-200 first:rounded-l-full text-sm lg:text-base text-gray-500">
                    <RotateCcw className="w-5 lg:w-6 h-5 lg:h-6" style={{ color: '#220944' }} />
                    <span className="font-semibold whitespace-nowrap">30-Day Free Return</span>
                  </div>
                  <div className="flex items-center" style={{background: 'rgba(255,255,255,0.8)'}}>
                    <div style={{width: '1px', height: '24px', background: '#220944', borderRadius: '1px'}} />
                  </div>
                  <div className="flex items-center gap-3 px-4 lg:px-8 py-3 lg:py-5 bg-white/80 hover:bg-gray-100 transition-colors duration-200 text-sm lg:text-base text-gray-500">
                    <Shield className="w-5 lg:w-6 h-5 lg:h-6" style={{ color: '#220944' }} />
                    <span className="font-semibold whitespace-nowrap">365-Day Guarantee</span>
                  </div>
                  <div className="flex items-center" style={{background: 'rgba(255,255,255,0.8)'}}>
                    <div style={{width: '1px', height: '24px', background: '#220944', borderRadius: '1px'}} />
                  </div>
                  <div className="flex items-center gap-3 px-4 lg:px-8 py-3 lg:py-5 bg-white/80 hover:bg-gray-100 transition-colors duration-200 text-sm lg:text-base text-gray-500">
                    <MapPin className="w-5 lg:w-6 h-5 lg:h-6" style={{ color: '#220944' }} />
                    <span className="font-semibold whitespace-nowrap">
                      Delivery within all of <span className="morocco-animate">Morocco</span> 🇲🇦
                    </span>
                  </div>
                  <div className="flex items-center" style={{background: 'rgba(255,255,255,0.8)'}}>
                    <div style={{width: '1px', height: '24px', background: '#220944', borderRadius: '1px'}} />
                  </div>
                  <div className="flex items-center gap-3 px-4 lg:px-8 py-3 lg:py-5 bg-white/80 hover:bg-gray-100 transition-colors duration-200 last:rounded-r-full text-sm lg:text-base text-gray-500">
                    <Lock className="w-5 lg:w-6 h-5 lg:h-6" style={{ color: '#220944' }} />
                    <span className="font-semibold whitespace-nowrap">Secure Online Ordering</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements - hidden on small screens */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <div className="absolute top-8 right-8 w-20 h-20 border border-white border-opacity-30 rounded-full"></div>
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
