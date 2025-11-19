import "../styles/brand-system.css";
import { getCloudinaryUrl } from "@shared/image-mappings";

const ServiceSections = () => {
  const services = [
    {
      title: "SUNGLASSES",
      subtitle: "Large selection from only £19",
      bgColor: "from-teal-400 to-teal-500",
      image: getCloudinaryUrl("/attached_images/generated_images/Woman_wearing_stylish_sunglasses_f496508c.png")
    },
    {
      title: "VARIFOCALS",
      subtitle: "Lens options from only £84",
      bgColor: "from-teal-500 to-teal-600",
      image: getCloudinaryUrl("/attached_images/generated_images/Professional_wearing_varifocal_glasses_f10f2f93.png")
    },
    {
      title: "BLUE LIGHT BLOCKING",
      subtitle: "Protect your eyes for only £20",
      bgColor: "from-teal-600 to-cyan-500",
      image: getCloudinaryUrl("/attached_images/generated_images/Person_wearing_blue_light_blocking_glasses_9fab8022.png")
    },
    {
      title: "TRANSITIONS",
      subtitle: "Lenses on offer from £60",
      bgColor: "from-cyan-400 to-teal-500",
      image: getCloudinaryUrl("/attached_images/generated_images/Person_wearing_transition_lenses_2ae86d8c.png")
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

        {/* Visit Our Store Section - Minimalist Redesign */}
        <div className="mb-12 md:mb-20">
          <div 
            className="bg-white" 
            data-testid="section-visit-store"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image Side */}
              <div className="order-2 lg:order-1">
                <div className="aspect-[4/3] bg-gray-100 border border-gray-200">
                  <img 
                    src={getCloudinaryUrl("/attached_images/generated_images/Modern_optical_store_interior_681bc472.png")}
                    alt="Modern optical store interior"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="order-1 lg:order-2">
                <div className="max-w-lg">
                  {/* Heading */}
                  <h3 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
                    Visit our store
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-gray-500 mb-8 leading-relaxed font-normal tracking-wide">
                    Experience personalized service and try on hundreds of frames in our modern boutique. Our expert team provides professional eye care and fitting services.
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-10">
                    <div className="text-base text-gray-600">Expert consultations with certified optometrists</div>
                    <div className="text-base text-gray-600">Premium brands and exclusive collections</div>
                    <div className="text-base text-gray-600">Professional fittings and adjustments</div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium transition-colors"
                    data-testid="button-find-location"
                  >
                    Find our location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Frame Finder Section */}
        <div>
          <div className="bg-white rounded-2xl overflow-hidden" data-testid="section-ai-frame-finder">
            <div className="grid lg:grid-cols-2 gap-0 items-center">
              {/* Image Side */}
              <div className="order-2 lg:order-1">
                <div className="aspect-[4/3] lg:aspect-square lg:h-[500px]">
                  <img 
                    src="https://res.cloudinary.com/dox1gblux/image/upload/v1759875235/VTOOO-730x456_oogrne.jpg" 
                    alt="Virtual try-on technology demonstration"
                    className="w-full h-full object-contain object-center"
                  />
                </div>
              </div>
              
              {/* Content Side */}
              <div className="order-1 lg:order-2 p-8 md:p-12 lg:p-16">
                <div className="max-w-lg">
                  <h3 className="font-light text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-[1.1] tracking-tight">
                    Curated frame picks, at your fingertips with AI
                  </h3>
                  
                  <p className="font-normal text-lg md:text-xl text-gray-500 leading-relaxed mb-10 tracking-wide">
                    Virtually try on frames and get personalized recommendations with our ai technology
                  </p>
                  
                  {/* CTA Button */}
                  <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium text-base transition-colors duration-300 group" data-testid="button-try-ai-finder">
                    <span className="flex items-center justify-center space-x-3">
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
    </section>
  );
};

export default ServiceSections;
