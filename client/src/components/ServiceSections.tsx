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

        {/* Visit Our Store Section - Creative Editorial Layout */}
        <div className="mb-12 md:mb-20">
          <div
            className="bg-white"
            data-testid="section-visit-store"
          >
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left: Editorial Content (3 columns) */}
              <div className="lg:col-span-3 order-1">
                {/* Section Tag */}
                <div className="inline-block px-4 py-1.5 border border-gray-900 mb-8">
                  <span className="text-xs tracking-[0.2em] uppercase text-gray-900 font-medium">
                    In-Person Experience
                  </span>
                </div>

                {/* Large Headline */}
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 leading-[0.95] tracking-tight">
                  Visit our
                  <br />
                  boutique
                  <br />
                  <span className="italic font-light">in person</span>
                </h3>

                {/* Keyline */}
                <div className="w-24 h-px bg-gray-900 mb-8"></div>

                {/* Description */}
                <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl font-light">
                  Book a personal styling session and discover hundreds of designer frames with expert guidance from our certified opticians.
                </p>

                {/* Features with dividers */}
                <div className="space-y-0 mb-12 max-w-xl">
                  <div className="py-4 border-t border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm text-gray-900 font-medium">Expert fittings</span>
                      <span className="text-sm text-gray-500">Complimentary</span>
                    </div>
                  </div>
                  <div className="py-4 border-t border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm text-gray-900 font-medium">Eye examinations</span>
                      <span className="text-sm text-gray-500">Same day available</span>
                    </div>
                  </div>
                  <div className="py-4 border-t border-b border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm text-gray-900 font-medium">Designer collections</span>
                      <span className="text-sm text-gray-500">500+ styles</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                  <button
                    className="bg-black hover:bg-gray-800 text-white px-8 py-4 font-medium transition-colors"
                    data-testid="button-find-location"
                  >
                    Book appointment
                  </button>
                  <button
                    className="border border-gray-900 hover:bg-gray-50 text-gray-900 px-8 py-4 font-medium transition-colors"
                  >
                    View location
                  </button>
                </div>
              </div>

              {/* Right: Asymmetric Frame Composition (2 columns) */}
              <div className="lg:col-span-2 order-2 relative">
                {/* Background accent */}
                <div className="absolute inset-0 bg-gray-50 -z-10"></div>

                <div className="relative h-full min-h-[500px] lg:min-h-[600px]">
                  {/* Frame 1 - Top Left */}
                  <div className="absolute top-12 left-8 w-48 md:w-56">
                    <div className="bg-white p-6 border border-gray-200 shadow-sm">
                      <img
                        src="/Frames/Roseeyewear1/Front_nobg.png"
                        alt="Designer frame front view"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="mt-3 text-xs tracking-wide text-gray-500">
                      <div>COLLECTION 2025</div>
                    </div>
                  </div>

                  {/* Frame 2 - Bottom Right Offset */}
                  <div className="absolute bottom-16 right-8 w-52 md:w-64">
                    <div className="bg-white p-6 border border-gray-200 shadow-sm">
                      <img
                        src="/Frames/Roseeyewear1/Angle_nobg.png"
                        alt="Designer frame angle view"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="mt-3 text-xs tracking-wide text-gray-500">
                      <div>PREMIUM MATERIALS</div>
                    </div>
                  </div>

                  {/* Circular Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-32 h-32 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-light text-gray-900">500+</div>
                        <div className="text-[10px] tracking-wider uppercase text-gray-600 mt-1">Frames</div>
                      </div>
                    </div>
                  </div>

                  {/* Diagonal line accent */}
                  <svg
                    className="absolute top-1/4 right-1/4 text-gray-200"
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="120"
                      y2="120"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  </svg>
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