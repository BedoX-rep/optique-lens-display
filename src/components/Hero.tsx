import { Button } from "@/components/ui/button";
import { RotateCcw, Shield, MapPin, Lock } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-white h-[500px]">
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
            <div className="w-full text-center">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 leading-tight tracking-wide">
                Prescription Glasses &<br />
                <span className="font-normal">Sunglasses Online</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed font-light">
                Free Single Vision Basic Lenses<br />
                Included With All Frames
              </p>
              <div className="mb-12">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-none text-lg font-medium uppercase tracking-wider shadow-lg transition-all duration-300 hover:shadow-xl">
                  Shop now
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 text-sm text-white">
                <div className="flex items-center bg-white bg-opacity-10 px-4 py-3 rounded backdrop-blur-sm border border-white border-opacity-20">
                  <RotateCcw className="mr-2 w-4 h-4" />
                  <span className="font-light">30-Day Free Return</span>
                </div>
                <div className="flex items-center bg-white bg-opacity-10 px-4 py-3 rounded backdrop-blur-sm border border-white border-opacity-20">
                  <Shield className="mr-2 w-4 h-4" />
                  <span className="font-light">365-Day Guarantee</span>
                </div>
                <div className="flex items-center bg-white bg-opacity-10 px-4 py-3 rounded backdrop-blur-sm border border-white border-opacity-20">
                  <MapPin className="mr-2 w-4 h-4" />
                  <span className="font-light">Delivery within all of Morocco 🇲🇦</span>
                </div>
                <div className="flex items-center bg-white bg-opacity-10 px-4 py-3 rounded backdrop-blur-sm border border-white border-opacity-20">
                  <Lock className="mr-2 w-4 h-4" />
                  <span className="font-light">Secure Online Ordering</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top right circle (replacing Jane rectangle and name) */}
            <div className="absolute top-4 right-4 lg:top-8 lg:right-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-200 bg-opacity-80 rounded-full shadow-xl"></div>
            </div>

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
