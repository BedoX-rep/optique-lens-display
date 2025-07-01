
import { Button } from "@/components/ui/button";

const ProductCategories = () => {
  return (
    <section className="pt-10 md:pt-20 pb-5 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Glasses for Women */}
          <div className="group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden w-full max-w-[450px] h-[250px] md:h-[300px] lg:h-[378px] mx-auto shadow-lg">
              <img 
                src="/attached_images/female.jpg" 
                alt="Glasses for Women"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[25%] md:h-[20%] flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
                <h3 className="text-lg md:text-2xl font-bold mb-1 uppercase tracking-wide drop-shadow-lg">GLASSES FOR WOMEN</h3>
                <p className="text-sm md:text-md font-medium drop-shadow-md">Order today, get tomorrow!</p>
              </div>
            </div>
          </div>

          {/* Get 20% OFF Promotion */}
          <div className="group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden w-full max-w-[450px] h-[250px] md:h-[300px] lg:h-[378px] mx-auto shadow-lg">
              <img 
                src="/attached_images/malefemale.webp" 
                alt="Special Offer"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-4">
                <div className="text-center bg-white bg-opacity-90 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-lg max-w-xs mx-4">
                  <div className="bg-red-600 px-4 md:px-6 py-2 rounded-full mb-3 shadow-md">
                    <span className="text-lg md:text-2xl font-bold text-white">GET 20% OFF</span>
                  </div>
                  <p className="text-sm md:text-lg font-medium text-gray-800 leading-tight">with two or more pair of glasses or sunglasses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Glasses for Men */}
          <div className="group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden w-full max-w-[450px] h-[250px] md:h-[300px] lg:h-[378px] mx-auto shadow-lg">
              <img 
                src="/attached_images/male.jpg" 
                alt="Glasses for Men"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[25%] md:h-[20%] flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
                <h3 className="text-lg md:text-2xl font-bold mb-1 uppercase tracking-wide drop-shadow-lg">GLASSES FOR MEN</h3>
                <p className="text-sm md:text-md font-medium drop-shadow-md">Order today, get tomorrow!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
