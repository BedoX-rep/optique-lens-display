

import { Button } from "@/components/ui/button";

const TrendingFrames = () => {
  const frames = [
    {
      id: 1,
      name: "Classic Round",
      price: "£89",
      originalPrice: "£120",
      image: "/optique-lens-display/public/placeholder.svg",
      colors: ["black", "brown", "gold"]
    },
    {
      id: 2,
      name: "Modern Square",
      price: "£95",
      originalPrice: "£130",
      image: "/optique-lens-display/public/placeholder.svg",
      colors: ["black", "blue", "silver"]
    },
    {
      id: 3,
      name: "Vintage Cat Eye",
      price: "£79",
      originalPrice: "£110",
      image: "/optique-lens-display/public/placeholder.svg",
      colors: ["red", "black", "tortoise"]
    },
    {
      id: 4,
      name: "Sport Wrap",
      price: "£105",
      originalPrice: "£140",
      image: "/optique-lens-display/public/placeholder.svg",
      colors: ["black", "gray", "blue"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Section with contained background */}
        <div className="bg-gray-50 rounded-2xl px-8 lg:px-16 py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              Trending Frames
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Discover our most popular frames, loved by customers worldwide for their style and quality
            </p>
          </div>

          {/* Frames Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {frames.map((frame) => (
              <div key={frame.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-square bg-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                  <img 
                    src={frame.image} 
                    alt={frame.name}
                    className="w-32 h-32 object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3 tracking-wide">{frame.name}</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-light text-purple-800">{frame.price}</span>
                    <span className="text-sm text-gray-500 line-through font-light">{frame.originalPrice}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-6">
                    {frame.colors.map((color, index) => (
                      <div 
                        key={index}
                        className={`w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm ${
                          color === 'black' ? 'bg-black' :
                          color === 'brown' ? 'bg-amber-800' :
                          color === 'gold' ? 'bg-yellow-400' :
                          color === 'blue' ? 'bg-blue-600' :
                          color === 'silver' ? 'bg-gray-400' :
                          color === 'red' ? 'bg-red-600' :
                          color === 'tortoise' ? 'bg-amber-600' :
                          color === 'gray' ? 'bg-gray-500' : 'bg-gray-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <Button className="w-full bg-purple-800 hover:bg-purple-900 text-white font-light py-3 rounded-lg transition-colors">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button className="bg-purple-800 hover:bg-purple-900 text-white font-light px-12 py-4 text-lg rounded-lg transition-colors">
              View All Frames
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingFrames;

