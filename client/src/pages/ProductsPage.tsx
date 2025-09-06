import { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import '../styles/brand-system.css';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  color: string;
  material: string;
  shape: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Crystal Clear',
    price: 29,
    image: '/test-frames/test1.png',
    category: 'prescription',
    color: 'clear',
    material: 'acetate',
    shape: 'round'
  },
  {
    id: '2', 
    name: 'Tortoise Classic',
    price: 29,
    image: '/test-frames/test2.png',
    category: 'prescription',
    color: 'tortoise',
    material: 'acetate', 
    shape: 'square'
  },
  {
    id: '3',
    name: 'Sage Green',
    price: 29,
    image: '/test-frames/test3.png',
    category: 'prescription',
    color: 'green',
    material: 'acetate',
    shape: 'oval'
  },
  {
    id: '4',
    name: 'Clear Vision',
    price: 29,
    image: '/test-frames/test4.png',
    category: 'prescription',
    color: 'clear',
    material: 'acetate',
    shape: 'round'
  },
  {
    id: '5',
    name: 'Modern Black',
    price: 35,
    image: '/test-frames/test1.png',
    category: 'sunglasses',
    color: 'black',
    material: 'metal',
    shape: 'aviator'
  },
  {
    id: '6',
    name: 'Classic Brown',
    price: 39,
    image: '/test-frames/test2.png',
    category: 'sunglasses',
    color: 'brown',
    material: 'acetate',
    shape: 'square'
  },
  {
    id: '7',
    name: 'Navy Frame',
    price: 32,
    image: '/test-frames/test3.png',
    category: 'prescription',
    color: 'blue',
    material: 'acetate',
    shape: 'oval'
  },
  {
    id: '8',
    name: 'Gold Wire',
    price: 45,
    image: '/test-frames/test4.png',
    category: 'prescription',
    color: 'gold',
    material: 'metal',
    shape: 'round'
  }
];

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ['prescription', 'sunglasses'];
  const colors = ['clear', 'black', 'brown', 'tortoise', 'blue', 'green', 'gold'];
  const materials = ['acetate', 'metal'];
  const shapes = ['round', 'square', 'oval', 'aviator'];

  const filteredProducts = mockProducts.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
    const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
    const shapeMatch = selectedShapes.length === 0 || selectedShapes.includes(product.shape);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return categoryMatch && colorMatch && materialMatch && shapeMatch && priceMatch;
  });

  const toggleFilter = (filterArray: string[], setFilter: (arr: string[]) => void, value: string) => {
    if (filterArray.includes(value)) {
      setFilter(filterArray.filter(item => item !== value));
    } else {
      setFilter([...filterArray, value]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="brand-font-heading text-4xl md:text-5xl text-gray-900 mb-4" data-testid="text-page-title">
              Eyewear Collection
            </h1>
            <p className="brand-font-primary text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of prescription glasses and sunglasses. Find your perfect frame from our collection of stylish, high-quality eyewear.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 bg-white hover:bg-gray-50"
                data-testid="button-toggle-filter"
              >
                <Filter className="w-4 h-4" />
                {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <span className="brand-font-primary text-gray-600" data-testid="text-results-count">
                {filteredProducts.length} products
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="brand-font-primary text-sm text-gray-500">Sort by:</span>
              <select className="brand-font-primary border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          {isFilterOpen && (
            <div className="w-80 flex-shrink-0" data-testid="sidebar-filters">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="brand-font-heading text-xl text-gray-900">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedColors([]);
                      setSelectedMaterials([]);
                      setSelectedShapes([]);
                      setPriceRange([0, 100]);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                    data-testid="button-clear-filters"
                  >
                    Clear all
                  </Button>
                </div>
                
                {/* Category Filter */}
                <div className="mb-8">
                  <h3 className="brand-font-primary font-semibold text-gray-900 mb-4">Category</h3>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-3">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleFilter(selectedCategories, setSelectedCategories, category)}
                          data-testid={`checkbox-category-${category}`}
                        />
                        <label 
                          htmlFor={`category-${category}`}
                          className="brand-font-primary text-gray-700 capitalize cursor-pointer"
                        >
                          {category === 'prescription' ? 'Prescription Glasses' : 'Sunglasses'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="mb-8">
                  <h3 className="brand-font-primary font-semibold text-gray-900 mb-4">Color</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {colors.map(color => (
                      <div key={color} className="flex items-center space-x-3">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => toggleFilter(selectedColors, setSelectedColors, color)}
                          data-testid={`checkbox-color-${color}`}
                        />
                        <label 
                          htmlFor={`color-${color}`}
                          className="brand-font-primary text-gray-700 capitalize cursor-pointer text-sm"
                        >
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Material Filter */}
                <div className="mb-8">
                  <h3 className="brand-font-primary font-semibold text-gray-900 mb-4">Material</h3>
                  <div className="space-y-3">
                    {materials.map(material => (
                      <div key={material} className="flex items-center space-x-3">
                        <Checkbox
                          id={`material-${material}`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => toggleFilter(selectedMaterials, setSelectedMaterials, material)}
                          data-testid={`checkbox-material-${material}`}
                        />
                        <label 
                          htmlFor={`material-${material}`}
                          className="brand-font-primary text-gray-700 capitalize cursor-pointer"
                        >
                          {material}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shape Filter */}
                <div className="mb-8">
                  <h3 className="brand-font-primary font-semibold text-gray-900 mb-4">Shape</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {shapes.map(shape => (
                      <div key={shape} className="flex items-center space-x-3">
                        <Checkbox
                          id={`shape-${shape}`}
                          checked={selectedShapes.includes(shape)}
                          onCheckedChange={() => toggleFilter(selectedShapes, setSelectedShapes, shape)}
                          data-testid={`checkbox-shape-${shape}`}
                        />
                        <label 
                          htmlFor={`shape-${shape}`}
                          className="brand-font-primary text-gray-700 capitalize cursor-pointer text-sm"
                        >
                          {shape}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="brand-font-primary font-semibold text-gray-900 mb-4">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100}
                      min={0}
                      step={5}
                      className="mb-4"
                      data-testid="slider-price-range"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className="brand-font-primary">£{priceRange[0]}</span>
                      <span className="brand-font-primary">£{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                isFilterOpen 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`} data-testid="grid-products">
                {filteredProducts.map(product => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    className="group"
                    data-testid={`card-product-${product.id}`}
                  >
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group-hover:border-gray-300">
                      <div className="relative">
                        <div className="bg-gray-100 p-8 aspect-square flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain max-w-[180px] max-h-[180px] group-hover:scale-105 transition-transform duration-300"
                            data-testid={`img-product-${product.id}`}
                          />
                        </div>
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="brand-font-primary font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors" data-testid={`text-name-${product.id}`}>
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="brand-font-primary text-lg font-semibold text-gray-900" data-testid={`text-price-${product.id}`}>
                            £{product.price}
                          </p>
                          <span className="brand-font-primary text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
                            {product.category === 'prescription' ? 'Prescription' : 'Sunglasses'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16" data-testid="message-no-results">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="brand-font-heading text-xl text-gray-900 mb-2">No products found</h3>
                  <p className="brand-font-primary text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedColors([]);
                      setSelectedMaterials([]);
                      setSelectedShapes([]);
                      setPriceRange([0, 100]);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}