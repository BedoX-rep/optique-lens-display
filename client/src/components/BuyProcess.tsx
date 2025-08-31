import { Button } from "@/components/ui/button";
import "../styles/brand-system.css";

const BuyProcess = () => {
  const steps = [
    {
      id: 1,
      icon: "/iconscustomize/imgi_20_X_Frame_icon.png",
      title: "Find your pair",
      description: "Discover designer eyewear"
    },
    {
      id: 2,
      icon: "/iconscustomize/imgi_21_X_Lenses_icon.png",
      title: "Select lenses",
      description: "Choose prescription type"
    },
    {
      id: 3,
      icon: "/iconscustomize/imgi_22_X_Personalize_icon.png",
      title: "Personalize",
      description: "Add treatments & coatings"
    },
    {
      id: 4,
      icon: "/iconscustomize/imgi_23_X_Shipping_icon.png",
      title: "Complete order",
      description: "30-day guarantee"
    }
  ];

  return (
    <section className="bg-gray-50 py-8" style={{ height: '130px' }}>
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="grid grid-cols-4 gap-8 h-full items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200">
                <img 
                  src={step.icon} 
                  alt={step.title}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block w-8 h-0.5 bg-gray-300 ml-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyProcess;