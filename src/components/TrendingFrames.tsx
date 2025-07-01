
import { Button } from "@/components/ui/button";

const TrendingFrames = () => {
  const frames = [
    { name: "Aviator", price: "£35", colors: ["black", "gold", "silver"] },
    { name: "Lens", price: "£49", colors: ["black", "blue", "brown"] },
    { name: "Square", price: "£55", colors: ["black", "brown", "blue"] },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Current trending frames
          </h2>
          <p className="text-gray-600">
            Frames to suit every budget, select yours today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {frames.map((frame, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-24 h-16 bg-gray-300 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{frame.name}</h3>
              <p className="text-lg font-bold text-gray-900 mb-3">{frame.price}</p>
              <div className="flex justify-center space-x-2 mb-4">
                {frame.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className={`w-4 h-4 rounded-full ${
                      color === 'black' ? 'bg-black' :
                      color === 'gold' ? 'bg-yellow-500' :
                      color === 'silver' ? 'bg-gray-400' :
                      color === 'blue' ? 'bg-blue-500' :
                      color === 'brown' ? 'bg-yellow-800' : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <Button className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-3 rounded-full">
            Shop Glasses
          </Button>
          <Button className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-3 rounded-full">
            Shop Sunglasses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingFrames;
