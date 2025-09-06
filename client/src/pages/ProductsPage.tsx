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
      <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Content */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] px-4 py-6">

          {/* Filter Bar */}
          <div className="bg-gray-50 border-b border-gray-200 -mx-4 px-4 py-4 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Filter Options */}
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-2 mr-4">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-800">FILTER BY</span>
                </div>

                {Object.entries(filterOptions).map(([label, options]) => (
                  <FilterDropdown key={label} label={label} options={options} />
                ))}

                <button className="text-sm text-gray-600 hover:text-gray-800 ml-4">
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showAsSunglasses}
                    onChange={(e) => setShowAsSunglasses(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">Show as Sunglasses</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="relative">
                  <button className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-800 hover:text-gray-600">
                    {sortBy}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Product Image Container */}
                <div className="relative bg-gray-50 rounded-lg p-8 mb-4 aspect-square flex items-center justify-center group-hover:shadow-lg transition-shadow">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-auto max-h-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Heart Icon */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(product.id);
                    }}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                      likedProducts.includes(product.id)
                        ? 'text-red-500 bg-white shadow-md' 
                        : 'text-gray-400 hover:text-red-500 bg-white/80 hover:bg-white shadow-sm'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedProducts.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  {/* Next Day Badge */}
                  {product.nextDay && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs font-medium">
                        NEXT DAY Available
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <h3 className="brand-font-heading text-lg font-medium text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="brand-font-heading text-xl font-bold text-gray-900 mb-3">
                    £{product.price}
                  </p>

                  {/* Color Options */}
                  <div className="flex justify-center gap-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-full border-2 border-gray-300"
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