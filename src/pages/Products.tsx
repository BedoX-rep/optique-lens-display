import { useState } from "react";
import { Search, Filter, Grid, List, Heart, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Classic Round Glasses",
      brand: "OptiqueLens",
      price: "299 MAD",
      originalPrice: "399 MAD",
      image: "/mockupphotos/imgi_148_1487257371233468_resize_680_340.jpg",
      colors: ['black', 'brown', 'blue'],
      rating: 4.8,
      reviews: 124,
      isNew: true,
      isOnSale: true,
      category: "Glasses"
    },
    {
      id: 2,
      name: "Modern Square Frames",
      brand: "OptiqueLens Pro",
      price: "349 MAD",
      originalPrice: null,
      image: "/mockupphotos/imgi_151_1687258212854351_resize_680_340.jpg",
      colors: ['black', 'gray', 'tortoise'],
      rating: 4.6,
      reviews: 89,
      isNew: false,
      isOnSale: false,
      category: "Glasses"
    },
    {
      id: 3,
      name: "Vintage Cat Eye",
      brand: "OptiqueLens Vintage",
      price: "279 MAD",
      originalPrice: "329 MAD",
      image: "/mockupphotos/imgi_61_1467033542799571_resize_680_340.webp",
      colors: ['brown', 'black', 'purple'],
      rating: 4.9,
      reviews: 156,
      isNew: false,
      isOnSale: true,
      category: "Glasses"
    },
    {
      id: 4,
      name: "Sports Sunglasses",
      brand: "OptiqueLens Sport",
      price: "199 MAD",
      originalPrice: "249 MAD",
      image: "/mockupphotos/imgi_64_1487257371233468_resize_680_340.webp",
      colors: ['black', 'blue', 'gray'],
      rating: 4.7,
      reviews: 93,
      isNew: true,
      isOnSale: true,
      category: "Sunglasses"
    },
    {
      id: 5,
      name: "Designer Aviator",
      brand: "OptiqueLens Luxury",
      price: "449 MAD",
      originalPrice: null,
      image: "/mockupphotos/imgi_65_1686908083580558_resize_680_340.webp",
      colors: ['gold', 'silver', 'black'],
      rating: 5.0,
      reviews: 67,
      isNew: false,
      isOnSale: false,
      category: "Sunglasses"
    },
    {
      id: 6,
      name: "Retro Round Sunglasses",
      brand: "OptiqueLens Retro",
      price: "229 MAD",
      originalPrice: "299 MAD",
      image: "/mockupphotos/imgi_67_1687258212854351_resize_680_340.webp",
      colors: ['brown', 'black', 'tortoise'],
      rating: 4.5,
      reviews: 78,
      isNew: false,
      isOnSale: true,
      category: "Sunglasses"
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseInt(a.price) - parseInt(b.price);
      case 'price-high':
        return parseInt(b.price) - parseInt(a.price);
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return a.isNew ? -1 : 1;
      default:
        return b.reviews - a.reviews;
    }
  });

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-card overflow-hidden">
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <Badge className="bg-success text-white">New</Badge>}
          {product.isOnSale && <Badge variant="destructive">Sale</Badge>}
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white shadow-md"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            <Link to={`/product/${product.id}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
        </div>
        <div className="flex items-center gap-1">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                color === 'black' ? 'bg-gray-900' :
                color === 'brown' ? 'bg-amber-800' :
                color === 'blue' ? 'bg-blue-600' :
                color === 'gray' ? 'bg-gray-500' :
                color === 'purple' ? 'bg-purple-600' :
                color === 'gold' ? 'bg-yellow-500' :
                color === 'silver' ? 'bg-gray-400' :
                color === 'tortoise' ? 'bg-amber-600' :
                'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
            )}
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary-light">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Our Products</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover our collection of premium eyewear crafted for style and comfort
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="border-b bg-white sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 min-w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-[1440px] mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>
        
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product) => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Products;