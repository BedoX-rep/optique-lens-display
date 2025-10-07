import { Button } from "@/components/ui/button";
import { RotateCcw, Shield, MapPin, Lock } from "lucide-react";
import "../styles/brand-system.css";
import { getCloudinaryUrl } from "@shared/image-mappings";

const Hero = () => {
  return (
    <section className="bg-white" style={{ height: '410px', maxHeight: '410px' }} data-hero-section="true">
      <div className="max-w-[1440px] mx-auto relative overflow-hidden h-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-tr from-blue-200/60 via-transparent to-blue-400/40"></div>
        </div>
        {/* Hero banner image */}
        <div className="absolute inset-0">
          <img 
            src={getCloudinaryUrl("/attached_images/hero-banner.png")}
            alt="Eyeglasses collection banner" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-4 py-8 relative z-10 h-full">
          <div className="flex flex-col lg:flex-row items-center justify-between h-full">
            {/* Hero content - Center */}
            <div className="w-full flex flex-col items-center justify-center text-center h-full relative">

              <h1 className="brand-font-heading text-xl md:text-3xl xl:text-4xl text-white mb-3 leading-tight tracking-tight px-4 text-center">
                <span className="block font-bold text-white drop-shadow-lg">Shop Prescription Glasses</span>
                <span className="block font-semibold text-white drop-shadow-lg">& Sunglasses Online</span>
              </h1>
              <p className="brand-font-primary text-xs md:text-sm lg:text-base text-white mb-4 max-w-2xl mx-auto leading-relaxed font-medium tracking-wide px-4 drop-shadow-md">
                Free Lenses Included With Every Frame.<br className="block md:hidden" /> Delivered Across <span className="morocco-animate">Morocco</span>
              </p>
              {/* Shop button */}
              <div className="hidden md:block">
                <Button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-full shadow-md transition-all duration-200 hover:shadow-lg mb-2 font-semibold text-base">
                  Shop now
                </Button>
              </div>

              {/* Mobile Trust Badges - Interconnected Minimalist Design */}
              <div className="md:hidden flex justify-center mt-4 mb-2 w-full">
                <div className="flex w-full max-w-xs bg-white rounded-2xl shadow border border-teal-100 overflow-hidden">
                  {/* Badge 1 */}
                  <div className="flex-1 flex flex-col items-center py-2 px-1">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#097969" strokeWidth="1.5" fill="none"/><path d="M7 13c0-2.5 2-5 5-5s5 2.5 5 5" stroke="#097969" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <span className="text-[9px] font-medium text-teal-800 mt-1">30d Return</span>
                  </div>
                  {/* Divider */}
                  <div className="w-px bg-teal-100 my-2"></div>
                  {/* Badge 2 */}
                  <div className="flex-1 flex flex-col items-center py-2 px-1">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3" stroke="#097969" strokeWidth="1.5" fill="none"/><path d="M7 10h10" stroke="#097969" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <span className="text-[9px] font-medium text-teal-800 mt-1">365d Guarantee</span>
                  </div>
                  {/* Divider */}
                  <div className="w-px bg-teal-100 my-2"></div>
                  {/* Badge 3 */}
                  <div className="flex-1 flex flex-col items-center py-2 px-1">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="8" rx="2" stroke="#097969" strokeWidth="1.5" fill="none"/><path d="M12 14v-2" stroke="#097969" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <span className="text-[9px] font-medium text-teal-800 mt-1">Secure</span>
                  </div>
                </div>
              </div>

              {/* Trust badges - responsive positioning (desktop only) */}
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:block" style={{ bottom: 'calc(1.5rem - 40px)' }}>
                {/* Desktop version - horizontal */}
                <div className="flex bg-white/40 backdrop-blur-md rounded-full shadow-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-3 lg:px-6 py-2 lg:py-3 bg-white/80 hover:bg-gray-100 transition-colors duration-200 first:rounded-l-full text-xs lg:text-sm text-gray-600">
                    <RotateCcw className="w-4 lg:w-5 h-4 lg:h-5" style={{ color: '#097969' }} />
                    <span className="font-medium whitespace-nowrap">30-Day Free Return</span>
                  </div>
                  <div className="flex items-center" style={{background: 'rgba(255,255,255,0.8)'}}>
                    <div style={{width: '1px', height: '20px', background: '#097969', borderRadius: '1px'}} />
                  </div>
                  <div className="flex items-center gap-2 px-3 lg:px-6 py-2 lg:py-3 bg-white/80 hover:bg-gray-100 transition-colors duration-200 text-xs lg:text-sm text-gray-600">
                    <Shield className="w-4 lg:w-5 h-4 lg:h-5" style={{ color: '#097969' }} />
                    <span className="font-medium whitespace-nowrap">365-Day Guarantee</span>
                  </div>
                  <div className="flex items-center" style={{background: 'rgba(255,255,255,0.8)'}}>
                    <div style={{width: '1px', height: '20px', background: '#097969', borderRadius: '1px'}} />
                  </div>
                  <div className="flex items-center gap-2 px-3 lg:px-6 py-2 lg:py-3 bg-white/80 hover:bg-gray-100 transition-colors duration-200 text-xs lg:text-sm text-gray-600">
                    <MapPin className="w-4 lg:w-5 h-4 lg:h-5" style={{ color: '#097969' }} />
                    <span className="font-medium whitespace-nowrap">
                      Delivery in <span className="morocco-animate">Morocco</span> 🇲🇦
                    </span>
                  </div>
                  <div className="flex items-center" style={{background: 'rgba(255,255,255,0.8)'}}>
                    <div style={{width: '1px', height: '20px', background: '#097969', borderRadius: '1px'}} />
                  </div>
                  <div className="flex items-center gap-2 px-3 lg:px-6 py-2 lg:py-3 bg-white/80 hover:bg-gray-100 transition-colors duration-200 last:rounded-r-full text-xs lg:text-sm text-gray-600">
                    <Lock className="w-4 lg:w-5 h-4 lg:h-5" style={{ color: '#097969' }} />
                    <span className="font-medium whitespace-nowrap">Secure Online Ordering</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
