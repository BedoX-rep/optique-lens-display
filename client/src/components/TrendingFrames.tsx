
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import MobileProductCard from "./MobileProductCard";
import "../styles/brand-system.css";

const TrendingFrames = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const frames = [
    {
      id: 1,
      name: "Crystal Clear",
      price: "£29",
      image: "/test-frames/test1.png",
      colors: ["clear", "gold"]
    },
    {
      id: 2,
      name: "Tortoise Classic",
      price: "£29",
      image: "/test-frames/test2.png",
      colors: ["tortoise", "brown"]
    },
    {
      id: 3,
      name: "Sage Green",
      price: "£29",
      image: "/test-frames/test3.png",
      colors: ["green", "gold"]
    },
    {
      id: 4,
      name: "Clear Vision",
      price: "£29",
      image: "/test-frames/test4.png",
      colors: ["clear", "gold"]
    },
    {
      id: 5,
      name: "Ocean Blue",
      price: "£29",
      image: "/test-frames/test1.png",
      colors: ["blue", "silver"]
    },
    {
      id: 6,
      name: "Forest Frame",
      price: "£29",
      image: "/test-frames/test2.png",
      colors: ["green", "gold"]
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

  // Auto-scroll functionality - moves one frame at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % frames.length);
        setIsTransitioning(false);
      }, 150);
    }, 3500);

    return () => clearInterval(interval);
  }, [frames.length]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + frames.length) % frames.length);
      setIsTransitioning(false);
    }, 150);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % frames.length);
      setIsTransitioning(false);
    }, 150);
  };

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Get visible frames based on current index and items per view
  const getVisibleFrames = () => {
    const visibleFrames = [];
    for (let i = 0; i < itemsPerView; i++) {
      const frameIndex = (currentIndex + i) % frames.length;
      visibleFrames.push(frames[frameIndex]);
    }
    return visibleFrames;
  };

  const visibleFrames = getVisibleFrames();

  return (
    <section className="pt-8 pb-16 bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="brand-font-heading text-3xl lg:text-4xl mb-4 tracking-tight bg-gradient-to-r from-teal-700 via-emerald-600 to-green-700 bg-clip-text text-transparent font-bold">
            Current trending frames
          </h2>
          <p className="brand-font-primary text-lg text-teal-700 font-medium italic">
            Frames to suit every budget, select yours today.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-gradient-to-r from-white/80 to-teal-50/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-teal-100/50 overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-100/20 via-transparent to-emerald-100/20 pointer-events-none"></div>
          
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-teal-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-teal-600 hover:to-emerald-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-teal-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-teal-600 hover:to-emerald-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Track */}
          <div className="flex items-center justify-center">
            <div 
              className={`flex gap-6 px-0 md:px-12 transition-all duration-700 ease-in-out ${
                isTransitioning ? 'transform scale-95 opacity-90' : 'transform scale-100 opacity-100'
              }`}
              style={{
                width: itemsPerView === 1 ? '100%' : 'auto'
              }}
            >
              {visibleFrames.map((frame, index) => (
                <div 
                  key={`${frame.id}-${currentIndex}-${index}`}
                  className={`flex-shrink-0 transition-all duration-700 ease-in-out transform ${
                    isTransitioning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
                  }`}
                  style={{ 
                    width: itemsPerView === 1 ? '100%' : '320px',
                    animation: isTransitioning ? 'none' : 'slideInFade 0.7s ease-out'
                  }}
                >
                  {itemsPerView === 1 ? (
                    <div 
                      className="p-6 bg-gradient-to-br from-white to-teal-50/50 rounded-2xl shadow-xl border border-teal-200/50 flex flex-col items-center justify-center max-w-xs min-h-[400px] w-full mx-auto cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-teal-300"
                      onClick={() => navigate(`/product/${frame.id}`)}
                      data-testid={`card-frame-${frame.id}`}
                    >
                      <img 
                        src={frame.image} 
                        alt={frame.name} 
                        className="mb-6 object-contain rounded-xl transition-transform duration-300 hover:scale-110"
                        style={{ maxWidth: '90%', maxHeight: '140px', minHeight: '100px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                      />
                      <div className="w-full flex flex-col items-center gap-3">
                        <span className="brand-font-heading text-lg text-teal-800 text-center leading-tight font-semibold">{frame.name}</span>
                        <div className="flex flex-row items-center gap-2 mt-1 mb-2">
                          {frame.colors.map((color) => (
                            <span 
                              key={color} 
                              className="w-5 h-5 rounded-full border-2 border-teal-300 shadow-sm hover:scale-125 transition-transform" 
                              style={{ backgroundColor: color }} 
                              title={color}
                            ></span>
                          ))}
                        </div>
                        <span className="brand-font-primary text-xl font-bold text-teal-600">{frame.price}</span>
                        <button
                          className={`brand-font-primary mt-4 px-6 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                            likedProducts.includes(frame.id) 
                              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-teal-400 shadow-lg' 
                              : 'bg-white/80 text-teal-700 border-teal-300 hover:bg-teal-50 hover:border-teal-400'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(frame.id);
                          }}
                          data-testid={`button-like-${frame.id}`}
                        >
                          {likedProducts.includes(frame.id) ? '♥ Liked' : '♡ Like'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center w-full">
                      <div 
                        className="max-w-[320px] w-full mx-auto flex justify-center items-center cursor-pointer transition-all duration-500 hover:scale-105"
                        onClick={() => navigate(`/product/${frame.id}`)}
                        data-testid={`card-frame-desktop-${frame.id}`}
                      >
                        <div className="p-6 bg-gradient-to-br from-white to-teal-50/50 rounded-2xl shadow-xl border border-teal-200/50 hover:shadow-2xl transition-all duration-500 hover:border-teal-300 w-full">
                          <img 
                            src={frame.image} 
                            alt={frame.name} 
                            className="mb-6 object-contain rounded-xl w-full transition-transform duration-300 hover:scale-110"
                            style={{ maxHeight: '160px', minHeight: '120px' }}
                          />
                          <div className="flex flex-col items-center gap-3">
                            <span className="brand-font-heading text-lg text-teal-800 text-center leading-tight font-semibold">{frame.name}</span>
                            <div className="flex flex-row items-center gap-2 mt-1 mb-2">
                              {frame.colors.map((color) => (
                                <span 
                                  key={color} 
                                  className="w-5 h-5 rounded-full border-2 border-teal-300 shadow-sm hover:scale-125 transition-transform" 
                                  style={{ backgroundColor: color }} 
                                  title={color}
                                ></span>
                              ))}
                            </div>
                            <span className="brand-font-primary text-xl font-bold text-teal-600">{frame.price}</span>
                            <button
                              className={`brand-font-primary mt-4 px-6 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                likedProducts.includes(frame.id) 
                                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-teal-400 shadow-lg' 
                                  : 'bg-white/80 text-teal-700 border-teal-300 hover:bg-teal-50 hover:border-teal-400'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(frame.id);
                              }}
                              data-testid={`button-like-${frame.id}`}
                            >
                              {likedProducts.includes(frame.id) ? '♥ Liked' : '♡ Like'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-3 mt-10">
          {frames.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, 150);
                }
              }}
              className={`h-3 rounded-full transition-all duration-500 hover:scale-125 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 w-8 shadow-lg' 
                  : 'bg-teal-300 w-3 hover:bg-teal-400'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFade {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default TrendingFrames;
