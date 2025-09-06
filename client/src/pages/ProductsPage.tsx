
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ChevronDown, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import '../styles/brand-system.css';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [showAsSunglasses, setShowAsSunglasses] = useState(false);
  const [sortBy, setSortBy] = useState('Popularity');
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  // Sample product data matching the design
  const products = [
    {
      id: 1,
      name: 'Frances',
      price: 29,
      image: '/test-frames/test1.png',
      colors: ['#8B4513', '#9932CC', '#000000'], // brown, purple, black
      nextDay: true
    },
    {
      id: 2,
      name: 'Norman',
      price: 15,
      image: '/test-frames/test2.png',
      colors: ['#4169E1', '#000000'], // blue, black
      nextDay: true
    },
    {
      id: 3,
      name: 'Jamie',
      price: 15,
      image: '/test-frames/test3.png',
      colors: ['#000000'], // black
      nextDay: true
    },
    {
      id: 4,
      name: 'Clear Vision',
      price: 29,
      image: '/test-frames/test4.png',
      colors: ['#FFD700', '#708090'], // gold, gray
      nextDay: true
    },
    // Add more products to fill the grid
    {
      id: 5,
      name: 'Classic',
      price: 25,
      image: '/test-frames/test1.png',
      colors: ['#8B4513', '#000000'],
      nextDay: false
    },
    {
      id: 6,
      name: 'Modern',
      price: 35,
      image: '/test-frames/test2.png',
      colors: ['#4169E1', '#9932CC'],
      nextDay: true
    }
  ];

  const filterOptions = {
    Gender: ['All', 'Men', 'Women', 'Unisex'],
    Shape: ['All', 'Round', 'Square', 'Rectangle', 'Cat Eye', 'Aviator'],
    'Frame Type': ['All', 'Full Rim', 'Half Rim', 'Rimless'],
    'Lens Type': ['All', 'Single Vision', 'Bifocal', 'Progressive', 'Reading'],
    Material: ['All', 'Plastic', 'Metal', 'Titanium', 'Acetate'],
    Colour: ['All', 'Black', 'Brown', 'Blue', 'Clear', 'Tortoise'],
    Brand: ['All', 'OptiqueLens', 'Designer', 'Premium']
  };

  const handleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const FilterDropdown = ({ label, options }: { label: string, options: string[] }) => (
    <div className="relative group">
      <button className="flex items-center gap-1 px-0 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium">
        {label}
        <ChevronDown className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner Section - Following 1440px standard */}
      <div className="w-full flex justify-center bg-gray-50">
        <div className="w-full max-w-[1440px] relative">
          <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] overflow-hidden">
            <img 
              src="/attached_images/products-banner1.png" 
              alt="Prescription Glasses Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl">
                <h1 className="brand-font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                  Buy Prescription Glasses
                </h1>
                <p className="brand-font-primary text-sm sm:text-base md:text-lg font-medium drop-shadow-md leading-relaxed">
                  Here at OptiqueLens we offer a huge selection of glasses for men and glasses for women. High quality eyewear at affordable prices. Browse our range frames including styles such as Wayfarer™, Clubmaster™ and Aviator. You will find our own brand and Designer Frames from the likes of Ray-ban® and Oakley®.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content - Following homepage pattern */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] px-4 py-6 sm:py-8">

          {/* Filter Bar - Minimal Design with Better Spacing */}
          <div className="bg-white border-b border-gray-200 pb-6 mb-8">
            {/* First Row - Filter Options */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-800 uppercase tracking-wide">FILTER BY</span>
              </div>

              <div className="flex flex-wrap items-center gap-6 lg:gap-8">
                {Object.entries(filterOptions).map(([label, options]) => (
                  <FilterDropdown key={label} label={label} options={options} />
                ))}
              </div>

              <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                Clear Filters
              </button>
            </div>

            {/* Second Row - Show as Sunglasses and Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showAsSunglasses}
                    onChange={(e) => setShowAsSunglasses(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">Show as Sunglasses</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="relative">
                  <button className="flex items-center gap-1 px-0 py-1 text-sm font-medium text-gray-800 hover:text-gray-600">
                    {sortBy}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid - Responsive with smaller images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Product Image Container - Responsive sizing */}
                <div className="relative bg-gray-50 rounded-lg p-4 sm:p-6 aspect-[4/3] sm:aspect-[393/235] flex items-center justify-center group-hover:shadow-lg transition-shadow w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[393px] mx-auto">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-auto max-h-[120px] sm:max-h-[150px] lg:max-h-[180px] object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Heart Icon */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                      likedProducts.includes(product.id)
                        ? 'text-red-500 bg-white shadow-md' 
                        : 'text-gray-400 hover:text-red-500 bg-white/80 hover:bg-white shadow-sm'
                    }`}
                  >
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${likedProducts.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  {/* Next Day Badge */}
                  {product.nextDay && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1">
                        NEXT DAY Available
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Product Info - Below Image */}
                <div className="mt-3 text-left">
                  <h3 className="brand-font-heading text-base sm:text-lg font-medium text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="brand-font-heading text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    £{product.price}
                  </p>

                  {/* Color Options */}
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Load More Products
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
