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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Visit Our Store */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]" data-testid="section-visit-store">
            <div className="aspect-[2/1] relative">
              <img 
                src={storeInteriorImage} 
                alt="Modern optical store interior"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 md:px-6">
                <h3 className="brand-font-heading text-2xl md:text-3xl mb-2 md:mb-3">Visit Our Store</h3>
                <p className="brand-font-primary text-sm md:text-lg opacity-90 max-w-sm mx-auto leading-relaxed">
                  Experience personalized service and try on hundreds of frames in our modern boutique location
                </p>
                <div className="mt-3 md:mt-4 text-xs md:text-sm opacity-80">
                  📍 Expert consultations • Premium brands • Professional fittings
                </div>
              </div>
            </div>
          </div>

          {/* AI Frame Finder */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]" data-testid="section-ai-frame-finder">
            <div className="aspect-[2/1] relative">
              <img 
                src={aiFittingImage} 
                alt="AI eyewear fitting technology"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 md:px-6">
                <h3 className="brand-font-heading text-2xl md:text-3xl mb-2 md:mb-3">AI Frame Finder</h3>
                <p className="brand-font-primary text-sm md:text-lg opacity-90 max-w-sm mx-auto leading-relaxed">
                  Let our AI technology analyze your face shape and recommend the perfect frames for you
                </p>
                <div className="mt-3 md:mt-4 text-xs md:text-sm opacity-80">
                  🤖 Smart matching • Face analysis • Personalized recommendations
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
