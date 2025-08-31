
import { Button } from "@/components/ui/button";
import "../styles/brand-system.css";

const BuyProcess = () => {
  const steps = [
    {
      id: 1,
      icon: "/iconscustomize/imgi_20_X_Frame_icon.png",
      title: "Find your pair",
      description: "Discover our designer eyewear and select your favorite frame."
    },
    {
      id: 2,
      icon: "/iconscustomize/imgi_21_X_Lenses_icon.png",
      title: "Select your lenses",
      description: "Choose your vision need and add your prescription."
    },
    {
      id: 3,
      icon: "/iconscustomize/imgi_22_X_Personalize_icon.png",
      title: "Personalize your lenses",
      description: "Select lens type and thickness, then add specialized treatments."
    },
    {
      id: 4,
      icon: "/iconscustomize/imgi_23_X_Shipping_icon.png",
      title: "Complete your purchase",
      description: "We ensure 100% satisfaction with our 30 day happiness guarantee."
    }
  ];

  return (
    <section className="pt-5 pb-5 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Container with background */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-200">
          {/* Main Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 uppercase tracking-wide leading-tight">
              CUSTOMIZING YOUR GLASSES HAS NEVER BEEN SO EASY
            </h2>
          </div>


          {/* Steps: Mobile timeline */}
          <div className="block md:hidden mb-6">
            <div className="relative flex flex-col gap-0 max-w-md mx-auto">
              {/* Single vertical dotted line from center of first icon to center of last icon */}
              <span
                className="absolute z-0 border-l-2 border-dotted border-gray-400"
                style={{
                  left: '20px', // move line further left
                  top: '32px', // lower by 4px from previous 28px
                  bottom: '28px',
                  height: 'calc(100% - 60px)', // adjust for new top
                  width: '0px'
                }}
                aria-hidden="true"
              ></span>
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-start relative z-10 mb-6 last:mb-0">
                  {/* Icon centered on the line */}
                  <div className="flex flex-col items-center mr-3 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-teal-100 flex items-center justify-center shadow-sm" style={{ zIndex: 2 }}>
                      <img src={step.icon} alt={step.title} className="w-6 h-6 object-contain" />
                    </div>
                  </div>
                  {/* Step Content */}
                  <div className="flex-1">
                    <h3 className="brand-font-heading text-base mb-1">
                      <span className="font-bold brand-text-primary mr-1">{step.id}</span>
                      <span className="font-bold text-gray-900">|</span> {step.title}
                    </h3>
                    <p className="brand-font-primary text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Info text below steps */}
            <div className="text-xs text-gray-400 text-center mt-2 mb-6 px-2">
              Prepare your prescription, and sync your insurance at any point during selection to apply your vision benefits.
            </div>
          </div>

          {/* Steps: Desktop grid */}
          <div className="hidden md:block mb-10 relative">
            {/* Horizontal dotted line from center of first icon to center of last icon */}
            <div className="hidden lg:block absolute left-1/2 top-10 h-0.5 z-0" style={{ pointerEvents: 'none', transform: 'translateX(-50%)' }}>
              <div
                className="h-0.5 border-t-2 border-dotted border-gray-400"
                style={{ width: '950px' }}
              ></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div key={step.id} className="text-center flex flex-col items-center relative">
                  {/* Icon Container layered above the line */}
                  <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center z-10">
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-colors duration-300">
                      <img 
                        src={step.icon} 
                        alt={step.title}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  </div>
                  {/* Step Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.id} | {step.title}
                    </h3>
                    <p className="brand-font-primary text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full max-w-md mx-auto justify-center items-center mt-2">
            <Button 
              className="bg-black hover:bg-gray-900 text-white px-6 py-3 text-base font-semibold uppercase tracking-wide w-full md:w-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              SHOP EYEWEAR
            </Button>
            <Button 
              className="bg-white border border-gray-300 text-gray-900 px-6 py-3 text-base font-semibold uppercase tracking-wide w-full md:w-auto rounded-lg shadow-md hover:bg-gray-50 transition-all duration-200"
            >
              DISCOVER LENSES
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyProcess;
