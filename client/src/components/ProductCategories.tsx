
import { Button } from "@/components/ui/button";
import "../styles/brand-system.css";
import womenGlassesImage from "@assets/generated_images/Cool_woman_wearing_glasses_1e8db1d1.png";
import menGlassesImage from "@assets/generated_images/Cool_man_wearing_glasses_42815e12.png";
import coupleGlassesImage from "@assets/generated_images/Stylish_couple_wearing_glasses_751eb959.png";

const ProductCategories = () => {
  return (
    <section className="pt-10 md:pt-20 pb-5 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Glasses for Women */}
          <div className="group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden w-full h-[250px] md:h-[300px] lg:h-[378px] mx-auto shadow-lg">
              <img 
                src={womenGlassesImage} 
                alt="Glasses for Women"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[25%] md:h-[20%] flex flex-col items-center justify-center text-white bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="brand-font-heading text-lg md:text-2xl mb-1 uppercase tracking-wide drop-shadow-lg">GLASSES FOR WOMEN</h3>
                <p className="brand-font-primary text-sm md:text-md font-medium drop-shadow-md">Order today, get tomorrow!</p>
              </div>
            </div>
          </div>

          {/* Get 20% OFF Promotion */}
          <div className="group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden w-full h-[250px] md:h-[300px] lg:h-[378px] mx-auto shadow-lg">
              <img 
                src={coupleGlassesImage} 
                alt="Special Offer"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-4">
                <div className="text-center bg-white bg-opacity-90 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-lg max-w-xs mx-4">
                  <div className="brand-bg-primary px-4 md:px-6 py-2 rounded-full mb-3 shadow-md">
                    <span className="brand-font-heading text-lg md:text-2xl text-white">GET 20% OFF</span>
                  </div>
                  <p className="brand-font-primary text-sm md:text-lg font-medium brand-text-primary leading-tight">with two or more pair of glasses or sunglasses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Glasses for Men */}
          <div className="group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden w-full h-[250px] md:h-[300px] lg:h-[378px] mx-auto shadow-lg">
              <img 
                src={menGlassesImage} 
                alt="Glasses for Men"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[25%] md:h-[20%] flex flex-col items-center justify-center text-white bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="brand-font-heading text-lg md:text-2xl mb-1 uppercase tracking-wide drop-shadow-lg">GLASSES FOR MEN</h3>
                <p className="brand-font-primary text-sm md:text-md font-medium drop-shadow-md">Order today, get tomorrow!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
