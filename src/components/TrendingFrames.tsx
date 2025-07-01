
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const TrendingFrames = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [itemsPerView, setItemsPerView] = useState(3);

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

  // Set items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxDisplayIndex = Math.max(0, frames.length - itemsPerView);
  const displayFrames = frames.slice(currentIndex, currentIndex + itemsPerView);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxDisplayIndex ? 0 : prev + 1));
    }, 4000);

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
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight bg-gradient-to-r from-purple-800 via-blue-700 to-purple-800 bg-clip-text text-transparent">
            Current trending frames
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-medium italic">
            <span className="text-gray-500">Frames to suit every budget, select yours today.</span>
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white p-3 md:p-6 overflow-hidden">
          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={goToPrevious}
            className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-purple-600 hover:text-white border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={goToNext}
            className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-purple-600 hover:text-white border border-gray-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Track */}
          <div className="flex items-center justify-center">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-3 md:gap-6 px-0 md:px-12"
              style={{ width: '100%' }}
            >
              {displayFrames.map((frame) => (
                <div 
                  key={frame.id} 
                  className="flex-shrink-0"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="max-w-[350px] mx-auto">
                    <ProductCard
                      {...frame}
                      isLiked={likedProducts.includes(frame.id)}
                      onLike={() => toggleLike(frame.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex md:hidden justify-center gap-4 mb-6">
          <button
            onClick={goToPrevious}
            className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-purple-600 hover:text-white border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={goToNext}
            className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-purple-600 hover:text-white border border-gray-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
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
