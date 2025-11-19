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

        {/* Visit Our Store Section - Completely Redesigned */}
        <div className="mb-12 md:mb-20">
          <div 
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-[#064E3B] to-[#097969]" 
            data-testid="section-visit-store"
          >
            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#22D3EE] to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative grid lg:grid-cols-2 gap-0">
              {/* Left Side - Image with Overlay */}
              <div className="relative h-80 lg:h-auto order-2 lg:order-1">
                <img 
                  src={getCloudinaryUrl("/attached_images/generated_images/Modern_optical_store_interior_681bc472.png")}
                  alt="Modern optical store interior"
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#064E3B]/50 to-[#064E3B]"></div>
                
                {/* Floating Stats Cards */}
                <div className="absolute bottom-8 left-8 right-8 flex gap-4">
                  <div className="flex-1 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/20">
                    <div className="text-3xl font-bold text-[#097969] brand-font-heading">500+</div>
                    <div className="text-sm text-gray-600 brand-font-primary">Premium Frames</div>
                  </div>
                  <div className="flex-1 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/20">
                    <div className="text-3xl font-bold text-[#097969] brand-font-heading">15+</div>
                    <div className="text-sm text-gray-600 brand-font-primary">Expert Staff</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-1 lg:order-2">
                <div className="max-w-xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
                    <div className="w-2 h-2 bg-[#22D3EE] rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-white/90 brand-font-primary">In-Store Experience</span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight brand-font-heading">
                    Visit Our
                    <span className="block bg-gradient-to-r from-[#22D3EE] to-white bg-clip-text text-transparent">
                      Boutique Store
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-white/80 mb-8 leading-relaxed brand-font-primary">
                    Experience personalized eyewear consultations in our modern boutique. Our certified optometrists and stylists help you find the perfect frames.
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#22D3EE]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#22D3EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white mb-1">Expert Fitting</div>
                        <div className="text-xs text-white/60">Professional adjustments</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#22D3EE]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#22D3EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white mb-1">Eye Exams</div>
                        <div className="text-xs text-white/60">Same-day available</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#22D3EE]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#22D3EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white mb-1">Designer Brands</div>
                        <div className="text-xs text-white/60">Exclusive collections</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#22D3EE]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#22D3EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white mb-1">Quick Service</div>
                        <div className="text-xs text-white/60">Most repairs in 30min</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex gap-4">
                    <button 
                      className="group relative px-8 py-4 bg-white text-[#097969] rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 brand-font-primary"
                      data-testid="button-find-location"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Find Our Location
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white to-[#22D3EE]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                  </div>
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
