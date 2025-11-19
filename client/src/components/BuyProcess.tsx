import "../styles/brand-system.css";
import { ArrowRight } from "lucide-react";

const BuyProcess = () => {
  const steps = [
    {
      id: 1,
      number: "01",
      icon: "/iconscustomize/imgi_20_X_Frame_icon.png",
      title: "Find your pair",
      description: "Discover designer eyewear",
      gradient: "from-[#097969] to-[#0891B2]"
    },
    {
      id: 2,
      number: "02",
      icon: "/iconscustomize/imgi_21_X_Lenses_icon.png",
      title: "Select lenses",
      description: "Choose prescription type",
      gradient: "from-[#0891B2] to-[#22D3EE]"
    },
    {
      id: 3,
      number: "03",
      icon: "/iconscustomize/imgi_22_X_Personalize_icon.png",
      title: "Personalize",
      description: "Add treatments & coatings",
      gradient: "from-[#22D3EE] to-[#0891B2]"
    },
    {
      id: 4,
      number: "04",
      icon: "/iconscustomize/imgi_23_X_Shipping_icon.png",
      title: "Complete order",
      description: "30-day guarantee",
      gradient: "from-[#0891B2] to-[#064E3B]"
    }
  ];

  return (
    <section 
      className="relative overflow-hidden" 
      style={{ height: '130px' }}
      data-testid="section-buy-process"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50"></div>
      
      {/* Content Container */}
      <div className="relative max-w-[1440px] mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full gap-3">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3 flex-1">
              {/* Card */}
              <div 
                className="group relative flex items-center gap-4 px-6 py-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-[#097969]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex-1"
                data-testid={`step-${step.id}`}
              >
                {/* Step Number Background */}
                <div className="absolute top-2 right-2 text-6xl font-bold text-gray-50 leading-none select-none">
                  {step.number}
                </div>

                {/* Icon Container */}
                <div className={`relative z-10 w-14 h-14 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <img 
                    src={step.icon} 
                    alt={step.title}
                    className="w-7 h-7 object-contain brightness-0 invert"
                  />
                </div>

                {/* Text Content */}
                <div className="relative z-10 flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-0.5 brand-font-heading">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 brand-font-primary">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow Connector */}
              {index < steps.length - 1 && (
                <ArrowRight 
                  className="hidden xl:block text-[#097969]/40 flex-shrink-0" 
                  size={20}
                  strokeWidth={2}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#097969]/5 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#22D3EE]/5 to-transparent rounded-full blur-2xl"></div>
    </section>
  );
};

export default BuyProcess;