import { useState } from 'react';
import { ChevronLeft, ChevronRight, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

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
  const [isFilterOpen, setIsFilterOpen] = useState(true);
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="brand-font-heading text-2xl text-gray-800" data-testid="text-page-title">
              Eyewear Collection
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
              data-testid="button-toggle-filter"
            >
              {isFilterOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          {isFilterOpen && (
            <div className="w-80 flex-shrink-0" data-testid="sidebar-filters">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
                <h2 className="brand-font-heading text-lg text-gray-800 mb-6">Filters</h2>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="brand-font-primary font-semibold text-gray-700 mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleFilter(selectedCategories, setSelectedCategories, category)}
                          data-testid={`checkbox-category-${category}`}
                        />
                        <label 
                          htmlFor={`category-${category}`}
                          className="brand-font-primary text-sm text-gray-600 capitalize cursor-pointer"
                        >
                          {category === 'prescription' ? 'Prescription Glasses' : 'Sunglasses'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="mb-6">
                  <h3 className="brand-font-primary font-semibold text-gray-700 mb-3">Color</h3>
                  <div className="space-y-2">
                    {colors.map(color => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => toggleFilter(selectedColors, setSelectedColors, color)}
                          data-testid={`checkbox-color-${color}`}
                        />
                        <label 
                          htmlFor={`color-${color}`}
                          className="brand-font-primary text-sm text-gray-600 capitalize cursor-pointer"
                        >
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Material Filter */}
                <div className="mb-6">
                  <h3 className="brand-font-primary font-semibold text-gray-700 mb-3">Material</h3>
                  <div className="space-y-2">
                    {materials.map(material => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={`material-${material}`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => toggleFilter(selectedMaterials, setSelectedMaterials, material)}
                          data-testid={`checkbox-material-${material}`}
                        />
                        <label 
                          htmlFor={`material-${material}`}
                          className="brand-font-primary text-sm text-gray-600 capitalize cursor-pointer"
                        >
                          {material}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shape Filter */}
                <div className="mb-6">
                  <h3 className="brand-font-primary font-semibold text-gray-700 mb-3">Shape</h3>
                  <div className="space-y-2">
                    {shapes.map(shape => (
                      <div key={shape} className="flex items-center space-x-2">
                        <Checkbox
                          id={`shape-${shape}`}
                          checked={selectedShapes.includes(shape)}
                          onCheckedChange={() => toggleFilter(selectedShapes, setSelectedShapes, shape)}
                          data-testid={`checkbox-shape-${shape}`}
                        />
                        <label 
                          htmlFor={`shape-${shape}`}
                          className="brand-font-primary text-sm text-gray-600 capitalize cursor-pointer"
                        >
                          {shape}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="brand-font-primary font-semibold text-gray-700 mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100}
                      min={0}
                      step={5}
                      className="mb-3"
                      data-testid="slider-price-range"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>£{priceRange[0]}</span>
                      <span>£{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedColors([]);
                    setSelectedMaterials([]);
                    setSelectedShapes([]);
                    setPriceRange([0, 100]);
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="brand-font-primary text-gray-600" data-testid="text-results-count">
                {filteredProducts.length} products found
              </p>
            </div>
            
            <div className={`grid gap-6 ${
              isFilterOpen 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`} data-testid="grid-products">
              {filteredProducts.map(product => (
                <div key={product.id} className="group cursor-pointer" data-testid={`card-product-${product.id}`}>
                  <div className="bg-gray-100 rounded-lg p-6 mb-3 aspect-square flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain max-w-[200px] max-h-[200px]"
                      data-testid={`img-product-${product.id}`}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="brand-font-primary font-medium text-gray-800 mb-1" data-testid={`text-name-${product.id}`}>
                      {product.name}
                    </h3>
                    <p className="brand-font-primary text-lg font-semibold text-gray-900" data-testid={`text-price-${product.id}`}>
                      £{product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12" data-testid="message-no-results">
                <p className="brand-font-primary text-gray-500 text-lg">No products match your current filters.</p>
                <Button
                  variant="outline"
                  className="mt-4"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}