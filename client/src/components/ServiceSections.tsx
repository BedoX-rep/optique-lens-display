import "../styles/brand-system.css";
import sunglassesImage from "@assets/generated_images/Woman_wearing_stylish_sunglasses_f496508c.png";
import varifocalsImage from "@assets/generated_images/Professional_wearing_varifocal_glasses_f10f2f93.png";
import blueLightImage from "@assets/generated_images/Person_wearing_blue_light_blocking_glasses_9fab8022.png";
import transitionsImage from "@assets/generated_images/Person_wearing_transition_lenses_2ae86d8c.png";
import storeInteriorImage from "@assets/generated_images/Minimalist_optical_store_interior_0b57853f.png";
import aiFittingImage from "@assets/generated_images/AI_eyewear_fitting_technology_01b46048.png";

const ServiceSections = () => {
  const services = [
    {
      title: "SUNGLASSES",
      subtitle: "Large selection from only £19",
      bgColor: "from-teal-400 to-teal-500",
      image: sunglassesImage
    },
    {
      title: "VARIFOCALS",
      subtitle: "Lens options from only £84",
      bgColor: "from-teal-500 to-teal-600",
      image: varifocalsImage
    },
    {
      title: "BLUE LIGHT BLOCKING",
      subtitle: "Protect your eyes for only £20",
      bgColor: "from-teal-600 to-cyan-500",
      image: blueLightImage
    },
    {
      title: "TRANSITIONS",
      subtitle: "Lenses on offer from £60",
      bgColor: "from-cyan-400 to-teal-500",
      image: transitionsImage
    }
  ];

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-16">
          {services.map((service, index) => (
            <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
              {service.image ? (
                <div className="aspect-[4/3] relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              ) : (
                <div className={`aspect-[4/3] bg-gradient-to-br ${service.bgColor}`}></div>
              )}
              <div className="absolute inset-0 flex items-end">
                <div className="p-3 md:p-4 text-white w-full">
                  <h3 className="brand-font-heading text-sm md:text-lg mb-1">{service.title}</h3>
                  <p className="brand-font-primary text-xs md:text-sm opacity-90">{service.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Frame Finder Section */}
        <div className="mb-16 md:mb-24">
          <div className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 rounded-3xl overflow-hidden shadow-lg border border-gray-100" data-testid="section-ai-frame-finder">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-200/30 to-cyan-200/30 rounded-full blur-2xl"></div>
            
            <div className="relative grid lg:grid-cols-2 gap-0 items-center min-h-[500px]">
              {/* Image Side */}
              <div className="order-2 lg:order-1 p-8 lg:p-12">
                <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <img 
                    src="/attached_images/1210777b-d1c7f439.gif" 
                    alt="Virtual try-on technology demonstration"
                    className="w-full h-auto max-h-[400px] object-contain mx-auto rounded-xl"
                  />
                  <div className="absolute -top-3 -right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    ✨ AI Powered
                  </div>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="order-1 lg:order-2 p-8 md:p-12 lg:p-16">
                <div className="max-w-lg">
                  <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-6 shadow-sm border border-blue-100">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>Advanced AI Technology</span>
                  </div>
                  
                  <h3 className="brand-font-heading text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight font-medium">
                    Curated frame picks, at your fingertips with AI
                  </h3>
                  
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                    Virtually try on frames and get personalized recommendations with our ai technology
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group" data-testid="button-try-ai-finder">
                      <span className="flex items-center justify-center space-x-2">
                        <span>Try AI Frame Finder</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visit Our Store Section */}
        <div>
          <div className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 rounded-3xl overflow-hidden shadow-lg border border-teal-100" data-testid="section-visit-store">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-200/30 to-teal-200/30 rounded-full blur-2xl"></div>
            
            <div className="relative grid lg:grid-cols-2 gap-0 items-center min-h-[500px]">
              {/* Content Side */}
              <div className="order-1 lg:order-1 p-8 md:p-12 lg:p-16">
                <div className="max-w-lg">
                  <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-teal-700 mb-6 shadow-sm border border-teal-100">
                    <span>📍</span>
                    <span>Physical Location</span>
                  </div>
                  
                  <h3 className="brand-font-heading text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight font-medium">
                    Visit Our Store
                  </h3>
                  
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                    Experience personalized service and try on hundreds of frames in our modern boutique location
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                      </div>
                      <span>Expert consultations & professional fittings</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                      </div>
                      <span>Premium brands & exclusive collections</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group" data-testid="button-visit-store">
                      <span className="flex items-center justify-center space-x-2">
                        <span>Find Our Location</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Image Side */}
              <div className="order-2 lg:order-2 p-8 lg:p-12">
                <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <img 
                    src={storeInteriorImage} 
                    alt="Modern optical store interior"
                    className="w-full h-auto max-h-[400px] object-contain mx-auto rounded-xl"
                  />
                  <div className="absolute -top-3 -left-3 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    🏪 Premium Store
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

export default ServiceSections;
