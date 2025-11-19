import "../styles/brand-system.css";

const BuyProcess = () => {
  const steps = [
    {
      id: 1,
      number: "1",
      title: "Find your pair",
      description: "Discover designer eyewear"
    },
    {
      id: 2,
      number: "2",
      title: "Select lenses",
      description: "Choose prescription type"
    },
    {
      id: 3,
      number: "3",
      title: "Personalize",
      description: "Add treatments & coatings"
    },
    {
      id: 4,
      number: "4",
      title: "Complete order",
      description: "30-day guarantee"
    }
  ];

  return (
    <section 
      className="bg-white border-y border-gray-100" 
      style={{ height: '130px' }}
      data-testid="section-buy-process"
    >
      <div className="max-w-[1440px] mx-auto px-8 h-full">
        <div className="flex items-center h-full gap-16">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-16 flex-1">
              <div className="flex items-center gap-4 flex-1" data-testid={`step-${step.id}`}>
                {/* Number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                  <span className="text-sm font-normal text-gray-900">{step.number}</span>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-base font-normal text-gray-900 mb-0.5 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-normal">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Divider */}
              {index < steps.length - 1 && (
                <div className="hidden xl:block w-px h-12 bg-gray-200 flex-shrink-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyProcess;