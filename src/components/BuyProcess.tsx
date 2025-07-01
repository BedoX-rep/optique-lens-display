
import { Button } from "@/components/ui/button";

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

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {steps.map((step, index) => (
              <div key={step.id} className="text-center relative">
                {/* Dotted line connector - hidden on last item */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-px border-t-2 border-dotted border-gray-400 transform translate-x-1/2 z-0" />
                )}
                
                {/* Icon Container */}
                <div className="relative z-10 w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-colors duration-300">
                  <img 
                    src={step.icon} 
                    alt={step.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                {/* Step Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.id} | {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-800 hover:to-purple-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wide min-w-[200px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              SHOP EYEWEAR
            </Button>
            <Button 
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wide min-w-[200px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
