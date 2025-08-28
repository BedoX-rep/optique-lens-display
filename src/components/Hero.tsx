
import { Button } from "@/components/ui/button";
import { RotateCcw, Shield, MapPin, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-white h-[310px] md:h-[500px] relative">
      <div className="max-w-[1440px] mx-auto relative overflow-hidden h-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-tr from-blue-200/60 via-transparent to-blue-400/40"></div>
        </div>
        {/* Responsive hero image: use a different image for mobile */}
        <div className="absolute inset-0">
          <img 
            src="/attached_images/imgi_241_banner_background.webp" 
            alt="Hero banner mobile" 
            className="w-full h-full object-cover block md:hidden"
          />
          <img 
            src="/attached_images/banner2.png" 
            alt="Hero banner desktop" 
            className="w-full h-full object-cover hidden md:block"
          />
          <div className="absolute inset-0 bg-blue-400 bg-opacity-30"></div>
        </div>

        <div className="px-4 py-8 relative z-10 h-full">
          <div className="flex flex-col lg:flex-row items-center justify-between h-full">
            {/* Hero content - Center */}
            <div className="w-full flex flex-col items-center justify-center text-center h-full relative">

              <h1
                className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight tracking-tight px-4 hero-title-mt"
                style={{ marginTop: '50px' }}
              >
                <style>{`
                  @media (max-width: 767px) {
                    .hero-title-mt {
                      margin-top: 77px !important;
                    }
                  }
                `}</style>
                <span className="block font-bold" style={{ color: '#220944' }}>Shop Prescription Glasses</span>
                <span className="block font-semibold text-white">& Sunglasses Online</span>
              </h1>
              <p className="text-sm md:text-base lg:text-xl text-black mb-6 max-w-2xl mx-auto leading-relaxed font-medium italic tracking-wide px-4">
                Free Lenses Included With Every Frame.<br className="block md:hidden" /> Delivered Across <span className="morocco-animate">Morocco</span>
              </p>
              {/* Hide Shop button on mobile */}
              <div className="hidden md:block">
                <Button asChild className="bg-primary hover:bg-primary-light text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold uppercase tracking-wide shadow-md transition-all duration-200 hover:shadow-lg mb-2">
                  <Link to="/products">Shop now</Link>
                </Button>
              </div>

              {/* Mobile Trust Badges - Interconnected Minimalist Design */}
              <div className="md:hidden flex justify-center mt-4 mb-2 w-full">
                <div className="flex w-full max-w-xs bg-white rounded-2xl shadow border border-purple-100 overflow-hidden">
                  {/* Badge 1 */}
                  <div className="flex-1 flex flex-col items-center py-2 px-1">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#4B176A" strokeWidth="1.5" fill="none"/><path d="M7 13c0-2.5 2-5 5-5s5 2.5 5 5" stroke="#4B176A" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <span className="text-[10px] font-medium text-purple-900 mt-1">30d Return</span>
                  </div>
                  {/* Divider */}
                  <div className="w-px bg-purple-100 my-2"></div>
                  {/* Badge 2 */}
                  <div className="flex-1 flex flex-col items-center py-2 px-1">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3" stroke="#4B176A" strokeWidth="1.5" fill="none"/><path d="M7 10h10" stroke="#4B176A" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <span className="text-[10px] font-medium text-purple-900 mt-1">365d Guarantee</span>
                  </div>
                  {/* Divider */}
                  <div className="w-px bg-purple-100 my-2"></div>
                  {/* Badge 3 */}
                  <div className="flex-1 flex flex-col items-center py-2 px-1">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="8" rx="2" stroke="#4B176A" strokeWidth="1.5" fill="none"/><path d="M12 14v-2" stroke="#4B176A" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <span className="text-[10px] font-medium text-purple-900 mt-1">Secure</span>
                  </div>
                </div>
              </div>

              {/* Trust badges - responsive positioning (desktop only) */}
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:block" style={{ bottom: 'calc(2rem - 50px)' }}>
                {/* Desktop version - horizontal */}
                <div className="flex bg-white/40 backdrop-blur-md rounded-full shadow-2xl overflow-hidden">
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
