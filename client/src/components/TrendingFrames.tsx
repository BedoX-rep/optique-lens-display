
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import MobileProductCard from "./MobileProductCard";
import type { Product } from "@shared/woocommerce-types";
import "../styles/brand-system.css";

const TrendingFrames = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  // Fetch trending frames from WooCommerce API
  const { data: frames = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/trending-frames'],
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes to avoid unnecessary calls
  });

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
    if (frames.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxDisplayIndex ? 0 : prev + 1));
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [maxDisplayIndex, frames.length]);

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

  // Format price from cents to currency display
  const formatPrice = (priceInCents: number) => {
    return `£${(priceInCents / 100).toFixed(0)}`;
  };

  // Extract color options from product attributes
  const getProductColors = (product: Product): string[] => {
    return product.attributes?.Color || ['black'];
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="pt-5 pb-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="brand-font-heading text-3xl lg:text-4xl mb-4 tracking-tight" style={{ color: '#220944' }}>
              Current trending frames
            </h2>
            <p className="brand-font-primary text-lg text-gray-600 font-medium italic">
              Loading trending frames...
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || frames.length === 0) {
    return (
      <section className="pt-5 pb-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="brand-font-heading text-3xl lg:text-4xl mb-4 tracking-tight" style={{ color: '#220944' }}>
              Current trending frames
            </h2>
            <p className="brand-font-primary text-lg text-gray-600 font-medium italic">
              No trending frames available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-5 pb-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="brand-font-heading text-3xl lg:text-4xl mb-4 tracking-tight" style={{ color: '#220944' }}>
            Current trending frames
          </h2>
          <p className="brand-font-primary text-lg text-gray-600 font-medium italic">
            Frames to suit every budget, select yours today.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white p-6 overflow-hidden">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#097969'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; e.currentTarget.style.color = 'black'; }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#097969'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; e.currentTarget.style.color = 'black'; }}
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
                    <div 
                      className="p-4 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center max-w-xs min-h-[370px] w-full mx-auto cursor-pointer hover:shadow-xl transition-shadow"
                      onClick={() => navigate(`/product/${frame.id}`)}
                      data-testid={`card-frame-${frame.id}`}
                    >
                      <img 
                        src={frame.images[0]?.src || "/placeholder.svg"} 
                        alt={frame.images[0]?.alt || frame.name} 
                        className="mb-4 object-contain rounded-xl"
                        style={{ maxWidth: '90%', maxHeight: '140px', minHeight: '100px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                      />
                      <div className="w-full flex flex-col items-center gap-2">
                        <span className="brand-font-heading text-lg text-gray-900 text-center leading-tight">{frame.name}</span>
                        <div className="flex flex-row items-center gap-2 mt-1 mb-1">
                          {getProductColors(frame).map((color) => (
                            <span 
                              key={color} 
                              className="w-5 h-5 rounded-full border border-gray-300" 
                              style={{ 
                                backgroundColor: color === 'clear' || color === 'transparent' ? '#f3f4f6' : color 
                              }} 
                              title={color}
                            ></span>
                          ))}
                        </div>
                        <span className="brand-font-primary text-base font-semibold mt-1" style={{ color: '#097969' }}>
                          {formatPrice(frame.price)}
                        </span>
                        <button
                          className={`brand-font-primary mt-3 px-3 py-1 rounded-full border text-xs font-medium transition-colors ${likedProducts.includes(frame.id) ? 'border-teal-400' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
                          style={likedProducts.includes(frame.id) ? { backgroundColor: '#097969', color: 'white' } : { backgroundColor: 'rgba(156, 163, 175, 0.1)' }}
                          onMouseEnter={(e) => { if (!likedProducts.includes(frame.id)) { e.currentTarget.style.backgroundColor = 'rgba(9, 121, 105, 0.1)'; e.currentTarget.style.color = '#097969'; } }}
                          onMouseLeave={(e) => { if (!likedProducts.includes(frame.id)) { e.currentTarget.style.backgroundColor = 'rgba(156, 163, 175, 0.1)'; e.currentTarget.style.color = 'rgb(75, 85, 99)'; } }}
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
                        className="max-w-[350px] w-full mx-auto flex justify-center items-center cursor-pointer"
                        onClick={() => navigate(`/product/${frame.id}`)}
                        data-testid={`card-frame-desktop-${frame.id}`}
                      >
                        <ProductCard
                          id={frame.id}
                          name={frame.name}
                          price={formatPrice(frame.price)}
                          image={frame.images[0]?.src || "/placeholder.svg"}
                          colors={getProductColors(frame)}
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
