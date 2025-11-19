import "../styles/brand-system.css";

const BuyProcess = () => {
  const steps = [
    {
      id: 1,
      number: "01",
      label: "STEP ONE",
      title: "Find your pair",
      description: "Browse designer collections"
    },
    {
      id: 2,
      number: "02",
      label: "STEP TWO",
      title: "Select lenses",
      description: "Choose your prescription"
    },
    {
      id: 3,
      number: "03",
      label: "STEP THREE",
      title: "Personalize",
      description: "Custom treatments"
    },
    {
      id: 4,
      number: "04",
      label: "STEP FOUR",
      title: "Complete",
      description: "30-day guarantee"
    }
  ];

  return (
    <section 
      className="bg-white py-8 flex items-center justify-center" 
      style={{ height: '260px' }}
      data-testid="section-buy-process"
    >
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Section Label */}
        <div className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-6 font-medium text-center">
          The Process
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="relative group"
              data-testid={`step-${step.id}`}
            >
              {/* Vertical divider for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-0 h-full w-px bg-gray-200"></div>
              )}
              
              <div className="pr-4">
                {/* Step Label */}
                <div className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-3 font-medium">
                  {step.label}
                </div>

                {/* Large Number */}
                <div className="text-6xl font-light text-gray-900 mb-2 leading-none tracking-tighter">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-lg font-medium text-gray-900 mb-1 tracking-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow indicator */}
                {index < steps.length - 1 && (
                  <svg 
                    className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-gray-300" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none"
                  >
                    <path 
                      d="M7 4L13 10L7 16" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyProcess;