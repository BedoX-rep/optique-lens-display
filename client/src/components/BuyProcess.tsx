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
    <section className="py-8" style={{ height: '130px' }}>
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="grid grid-cols-4 gap-8 h-full items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
                <img 
                  src={step.icon} 
                  alt={step.title}
                  className="w-8 h-8 object-contain filter brightness-0 invert"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-700">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block w-12 h-1 bg-gradient-to-r from-teal-300 to-teal-400 rounded-full ml-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyProcess;