import "../styles/brand-system.css";
import sunglassesImage from "@assets/generated_images/Woman_wearing_stylish_sunglasses_f496508c.png";
import varifocalsImage from "@assets/generated_images/Professional_wearing_varifocal_glasses_f10f2f93.png";
import blueLightImage from "@assets/generated_images/Person_wearing_blue_light_blocking_glasses_9fab8022.png";
import transitionsImage from "@assets/generated_images/Person_wearing_transition_lenses_2ae86d8c.png";
import storeInteriorImage from "@assets/generated_images/Modern_optical_store_interior_681bc472.png";
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

        {/* Visit Our Store Section */}
        <div className="mb-12 md:mb-20">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl overflow-hidden shadow-xl" data-testid="section-visit-store">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Content Side */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
                <div className="max-w-lg">
                  <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6">
                    📍 Physical Location
                  </div>
                  <h3 className="brand-font-heading text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight">
                    Visit Our Store
                  </h3>
                  <p className="brand-font-primary text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                    Experience personalized service and try on hundreds of frames in our modern boutique location. Our expert team provides professional eye care and fitting services.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      <span>Expert consultations with certified optometrists</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      <span>Premium brands and exclusive collections</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      <span>Professional fittings and adjustments</span>
                    </div>
                  </div>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors group">
                    Find Our Location
                    <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </button>
                </div>
              </div>
              
              {/* Image Side */}
              <div className="order-1 md:order-2 h-64 md:h-auto">
                <img 
                  src={storeInteriorImage} 
                  alt="Modern optical store interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Frame Finder Section */}
        <div>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm" data-testid="section-ai-frame-finder">
            <div className="text-center py-16 md:py-20 px-8 md:px-12">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8">
                  🤖 AI Technology
                </div>
                <h3 className="brand-font-heading text-4xl md:text-5xl text-gray-900 mb-6 leading-tight">
                  AI Frame Finder
                </h3>
                <p className="brand-font-primary text-lg md:text-xl text-gray-600 mb-16 leading-relaxed max-w-2xl mx-auto">
                  Let our advanced AI technology analyze your face shape and recommend the perfect frames for you.
                </p>
                
                <div className="grid md:grid-cols-3 gap-12 mb-16">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl">📸</span>
                    </div>
                    <h4 className="text-gray-900 font-semibold text-lg mb-3">Face Analysis</h4>
                    <p className="text-gray-500">Advanced facial recognition technology</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h4 className="text-gray-900 font-semibold text-lg mb-3">Smart Matching</h4>
                    <p className="text-gray-500">Intelligent frame recommendations</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl">✨</span>
                    </div>
                    <h4 className="text-gray-900 font-semibold text-lg mb-3">Personalized</h4>
                    <p className="text-gray-500">Tailored to your unique style</p>
                  </div>
                </div>
                
                <div className="mb-12">
                  <img 
                    src={aiFittingImage} 
                    alt="AI eyewear fitting technology"
                    className="w-full max-w-2xl mx-auto rounded-xl shadow-md"
                  />
                </div>
                
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                  Try AI Frame Finder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSections;
