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

        {/* Smart Frame Finder Section */}
        <div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-8 lg:py-16" data-testid="section-ai-frame-finder">
            {/* Image Side */}
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-purple-400/20 rounded-3xl blur-2xl transform -rotate-3 scale-105"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src={aiFittingImage} 
                    alt="Smart eyewear fitting technology"
                    className="w-full h-64 md:h-80 object-cover rounded-xl"
                  />
                  
                  {/* Floating Feature Cards */}
                  <div className="absolute -top-4 -right-4 bg-teal-500 text-white px-4 py-2 rounded-xl shadow-lg transform rotate-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold">Smart Matching</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-4 py-2 rounded-xl shadow-lg transform -rotate-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold">Virtual Try-On</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Side */}
            <div className="order-1 lg:order-2">
              <div className="max-w-lg">
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <span className="text-sm">✨</span>
                  <span>Smart Technology</span>
                </div>
                
                <h3 className="brand-font-heading text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight">
                  Find your perfect frames instantly
                </h3>
                
                <p className="brand-font-primary text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                  Get personalized recommendations and virtually try on hundreds of frames using our intelligent matching system.
                </p>
                
                {/* Enhanced Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-teal-50 transition-colors">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-lg">📸</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Virtual Try-On</h4>
                      <p className="text-sm text-gray-600">See how frames look on you instantly with camera technology</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-lg">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Personalized Recommendations</h4>
                      <p className="text-sm text-gray-600">Curated selections based on your face shape and style preferences</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-lg">⚡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Instant Results</h4>
                      <p className="text-sm text-gray-600">Find your perfect match in seconds, not hours</p>
                    </div>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group" data-testid="button-try-ai-finder">
                    <span className="flex items-center justify-center space-x-2">
                      <span>Try Smart Frame Finder</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </button>
                  <button className="border-2 border-gray-300 hover:border-teal-500 text-gray-700 hover:text-teal-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-teal-50" data-testid="button-learn-more">
                    Learn More
                  </button>
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
