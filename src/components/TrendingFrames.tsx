
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import MobileProductCard from "./MobileProductCard";

const TrendingFrames = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const frames = [
    {
      id: 1,
      name: "Margot",
      price: "£53",
      image: "/mockupphotos/imgi_148_1487257371233468_resize_680_340.jpg",
      colors: ["brown", "blue"]
    },
    {
      id: 2,
      name: "Corey",
      price: "£39",
      image: "/mockupphotos/imgi_151_1687258212854351_resize_680_340.jpg",
      colors: ["black", "brown", "gray"]
    },
    {
      id: 3,
      name: "Billie",
      price: "£39",
      image: "/mockupphotos/imgi_61_1467033542799571_resize_680_340.webp",
      colors: ["brown", "black", "purple"]
    },
    {
      id: 4,
      name: "Classic Square",
      price: "£45",
      image: "/mockupphotos/imgi_64_1487257371233468_resize_680_340.webp",
      colors: ["black", "tortoise"]
    },
    {
      id: 5,
      name: "Modern Round",
      price: "£42",
      image: "/mockupphotos/imgi_65_1686908083580558_resize_680_340.webp",
      colors: ["blue", "black", "brown"]
    },
    {
      id: 6,
      name: "Vintage Cat",
      price: "£48",
      image: "/mockupphotos/imgi_67_1687258212854351_resize_680_340.webp",
      colors: ["brown", "black"]
    },
    {
      id: 7,
      name: "Sport Style",
      price: "£52",
      image: "/mockupphotos/imgi_68_1467204059555909_resize_680_340.webp",
      colors: ["black", "gray", "blue"]
    }
  ];

  // Responsive: 1 card on mobile, 3 on desktop
  const [itemsPerView, setItemsPerView] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const maxDisplayIndex = Math.max(0, frames.length - itemsPerView);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxDisplayIndex ? 0 : prev + 1));
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [maxDisplayIndex]);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxDisplayIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev >= maxDisplayIndex ? 0 : prev + 1));
  };

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="pt-5 pb-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight bg-gradient-to-r from-purple-800 via-blue-700 to-purple-800 bg-clip-text text-transparent">
            Current trending frames
          </h2>
          <p className="text-lg text-gray-600 font-medium italic">
            Frames to suit every budget, select yours today.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white p-6 overflow-hidden">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-purple-600 hover:text-white border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-purple-600 hover:text-white border border-gray-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Track */}
          <div className="flex items-center justify-center">
            <div 
              className={`flex transition-transform duration-500 ease-in-out gap-6 px-0 md:px-12 ${itemsPerView === 1 ? 'w-full' : ''}`}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: itemsPerView === 1 ? '100%' : `${(frames.length / itemsPerView) * 100}%`
              }}
            >
              {frames.map((frame) => (
                <div 
                  key={frame.id}
                  className="flex-shrink-0"
                  style={{ width: itemsPerView === 1 ? '100%' : `${100 / itemsPerView}%` }}
                >
                  {itemsPerView === 1 ? (
                    <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center max-w-xs min-h-[370px] w-full mx-auto">
                      <img 
                        src={frame.image} 
                        alt={frame.name} 
                        className="mb-4 object-contain rounded-xl"
                        style={{ maxWidth: '90%', maxHeight: '140px', minHeight: '100px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                      />
                      <div className="w-full flex flex-col items-center gap-2">
                        <span className="text-lg font-bold text-gray-900 text-center leading-tight">{frame.name}</span>
                        <div className="flex flex-row items-center gap-2 mt-1 mb-1">
                          {frame.colors.map((color) => (
                            <span key={color} className="w-5 h-5 rounded-full border border-gray-300" style={{ backgroundColor: color }} title={color}></span>
                          ))}
                        </div>
                        <span className="text-base font-semibold text-purple-700 mt-1">{frame.price}</span>
                        <button
                          className={`mt-3 px-3 py-1 rounded-full border text-xs font-medium transition-colors ${likedProducts.includes(frame.id) ? 'bg-purple-100 text-purple-700 border-purple-400' : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-purple-50 hover:text-purple-700'}`}
                          onClick={() => toggleLike(frame.id)}
                        >
                          {likedProducts.includes(frame.id) ? '♥ Liked' : '♡ Like'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center w-full">
                      <div className="max-w-[350px] w-full mx-auto flex justify-center items-center">
                        <ProductCard
                          {...frame}
                          isLiked={likedProducts.includes(frame.id)}
                          onLike={() => toggleLike(frame.id)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: maxDisplayIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-purple-800 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingFrames;
