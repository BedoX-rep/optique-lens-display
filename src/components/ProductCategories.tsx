
import { Button } from "@/components/ui/button";

const ProductCategories = () => {
  const categories = [
    {
      title: "PRESCRIPTION GLASSES",
      image: "/optique-lens-display/public/placeholder.svg",
      bgColor: "bg-blue-50"
    },
    {
      title: "SUNGLASSES",
      image: "/optique-lens-display/public/placeholder.svg",
      bgColor: "bg-yellow-50"
    },
    {
      title: "CONTACT LENSES",
      image: "/optique-lens-display/public/placeholder.svg",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-wide">
            Shop by Category
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            Find the perfect eyewear for your needs with our comprehensive range of prescription glasses, sunglasses, and contact lenses
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className={`${category.bgColor} rounded-lg aspect-[4/3] flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm hover:shadow-md`}>
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-32 h-32 object-cover"
                />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-lg font-medium text-gray-900 tracking-wider uppercase">{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
