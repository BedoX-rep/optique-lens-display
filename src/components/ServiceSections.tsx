const ServiceSections = () => {
  const services = [
    {
      title: "SUNGLASSES",
      subtitle: "Large selection from only £19",
      bgColor: "from-orange-400 to-orange-500"
    },
    {
      title: "VARIFOCALS",
      subtitle: "Lens options from only £84",
      bgColor: "from-purple-400 to-purple-500"
    },
    {
      title: "BLUE LIGHT BLOCKING",
      subtitle: "Protect your eyes for only £20",
      bgColor: "from-blue-400 to-blue-500"
    },
    {
      title: "TRANSITIONS",
      subtitle: "Lenses on offer from £60",
      bgColor: "from-green-400 to-green-500"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg">
              <div className={`aspect-[4/3] bg-gradient-to-br ${service.bgColor}`}></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{service.title}</h3>
                  <p className="text-sm">{service.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Iconic Brands */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            <div className="aspect-[2/1] bg-gradient-to-br from-gray-800 to-gray-900"></div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-2">Iconic Brands</h3>
                <p className="text-lg">Shop the latest iconic eyewear</p>
              </div>
            </div>
          </div>

          {/* Reuse your Eyewear */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            <div className="aspect-[2/1] bg-gradient-to-br from-gray-200 to-gray-300"></div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-2">Reuse your Eyewear</h3>
                <p className="text-lg max-w-xs">Replace your glasses and help us add another pair to those 1000 we've already saved from landfill.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSections;