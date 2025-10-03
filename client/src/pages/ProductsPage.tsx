import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Heart, ChevronDown, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Product } from '@shared/woocommerce-types';
import '../styles/brand-system.css';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [showAsSunglasses, setShowAsSunglasses] = useState(false);
  const [sortBy, setSortBy] = useState('Popularity');
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('frames');

  // Fetch products from WooCommerce API
  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: [`/api/categories/${selectedCategory}/products`],
    retry: 2,
    retryDelay: 1000,
  });

  // Debug logging
  console.log('[ProductsPage] Query state:', {
    selectedCategory,
    queryKey: `/api/categories/${selectedCategory}/products`,
    isLoading,
    hasError: !!error,
    productsCount: products.length,
    error: error
  });

  const handleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Extract unique attribute values for filters
  const getAttributeOptions = (attributeName: string): string[] => {
    const options = new Set<string>();
    products.forEach(product => {
      const values = product.attributes[attributeName];
      if (values) {
        values.forEach(v => options.add(v));
      }
    });
    return Array.from(options);
  };

  const filterOptions = {
    Shape: ['All', ...getAttributeOptions('Shape')],
    Material: ['All', ...getAttributeOptions('Material')],
    Colour: ['All', ...getAttributeOptions('Color')],
    Brand: ['All', ...getAttributeOptions('Brand')],
  };

  const FilterDropdown = ({ label, options }: { label: string, options: string[] }) => (
    <div className="relative group">
      <button className="flex items-center gap-2 px-0 py-3 text-base text-gray-700 hover:text-gray-900 transition-colors font-medium">
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );

  // Format price from cents to display
  const formatPrice = (priceInCents: number) => {
    return (priceInCents / 100).toFixed(2);
  };

  // Get color hex from color name
  const getColorHex = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      'black': '#000000',
      'brown': '#8B4513',
      'blue': '#4169E1',
      'clear': '#F5F5F5',
      'tortoise': '#D2691E',
      'gold': '#FFD700',
      'silver': '#C0C0C0',
      'green': '#228B22',
      'red': '#DC143C',
      'pink': '#FFC0CB',
    };
    return colorMap[colorName.toLowerCase()] || '#808080';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner Section */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] relative">
          <div className="w-full h-[310px] overflow-hidden">
            <img 
              src="/attached_images/products-banner.png" 
              alt="Prescription Glasses Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-start pl-8">
              <div className="text-left px-4 max-w-[50%]">
                <h1 className="brand-font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 drop-shadow-lg">
                  Buy Prescription Glasses
                </h1>
                <p className="brand-font-primary text-sm sm:text-base md:text-lg font-medium drop-shadow-md leading-relaxed text-gray-600">
                  Here at OptiqueLens we offer a huge selection of glasses for men and glasses for women. High quality eyewear at affordable prices. Browse our range frames including styles such as Wayfarer™, Clubmaster™ and Aviator. You will find our own brand and Designer Frames from the likes of Ray-ban® and Oakley®.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-full bg-white">
        <div className="w-full max-w-[1440px] mx-auto border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-8">
            <div className="flex items-center gap-3 h-[40px]">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-base font-medium text-gray-800 uppercase tracking-wide">FILTER BY</span>
            </div>

            <div className="flex items-center justify-evenly flex-1 px-8">
              {Object.entries(filterOptions).map(([label, options]) => (
                <div key={label} className="h-[37px] flex items-center">
                  <FilterDropdown label={label} options={options} />
                </div>
              ))}
            </div>

            <div className="h-[37px] flex items-center">
              <button className="text-base text-gray-600 hover:text-gray-800 transition-colors">
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] px-4 py-6 sm:py-8">

          {/* Sort Options */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showAsSunglasses}
                  onChange={(e) => setShowAsSunglasses(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                  data-testid="checkbox-sunglasses"
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

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-800 font-medium mb-2">Unable to load products</p>
                <p className="text-red-600 text-sm">Please check your WooCommerce connection settings.</p>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${product.slug}`)}
                  data-testid={`card-product-${product.id}`}
                >
                  {/* Product Image Container */}
                  <div className="relative bg-gray-50 rounded-lg p-4 sm:p-6 aspect-[4/3] sm:aspect-[393/235] flex items-center justify-center group-hover:shadow-lg transition-shadow w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[393px] mx-auto">
                    <img 
                      src={product.images[0]?.src} 
                      alt={product.name}
                      className="w-full h-auto max-h-[120px] sm:max-h-[150px] lg:max-h-[180px] object-contain group-hover:scale-105 transition-transform duration-300"
                      data-testid={`img-product-${product.id}`}
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
                      data-testid={`button-like-${product.id}`}
                    >
                      <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${likedProducts.includes(product.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* Stock Badge */}
                    {product.inStock && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1">
                          NEXT DAY Available
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="mt-3 text-left ml-[28px]">
                    <h3 className="brand-font-heading text-base sm:text-lg font-medium text-gray-800 mb-1" data-testid={`text-name-${product.id}`}>
                      {product.name}
                    </h3>
                    <p className="brand-font-heading text-lg sm:text-xl font-bold text-gray-900 mb-2" data-testid={`text-price-${product.id}`}>
                      £{formatPrice(product.price)}
                    </p>

                    {/* Color Options */}
                    {product.attributes['Color'] && (
                      <div className="flex gap-2">
                        {product.attributes['Color'].map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: getColorHex(color) }}
                            data-testid={`color-${product.id}-${index}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Products */}
          {!isLoading && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
