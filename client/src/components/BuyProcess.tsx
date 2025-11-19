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
      className="bg-gradient-to-b from-gray-50 to-white py-16" 
      data-testid="section-buy-process"
    >
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Section Label */}
        <div className="text-center mb-12">
          <div className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-2 font-semibold">
            The Process
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
            Four Simple Steps
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="relative group flex flex-col items-center text-center"
              data-testid={`step-${step.id}`}
            >
              {/* Connecting Line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-[calc(50%+48px)] top-[48px] w-[calc(100%-96px)] h-[2px] bg-gradient-to-r from-gray-300 to-gray-200">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-gray-200"></div>
                </div>
              )}
              
              {/* Circular Number Container */}
              <div className="relative mb-6 group-hover:scale-110 transition-transform duration-300">
                {/* Outer Circle */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  {/* Inner Circle */}
                  <div className="w-20 h-20 rounded-full bg-white border border-gray-100 flex items-center justify-center">
                    {/* Number */}
                    <span className="text-3xl font-light text-gray-900 tracking-tight">
                      {step.number}
                    </span>
                  </div>
                </div>
                
                {/* Decorative Accent */}
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Step Label */}
              <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-3 font-semibold">
                {step.label}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed max-w-[200px]" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyProcess;