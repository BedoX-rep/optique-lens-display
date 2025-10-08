
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, ChevronDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Product } from "@shared/woocommerce-types";
import "../styles/brand-system.css";

const ProductPage = () => {
  const { id } = useParams(); // This is actually the slug from the URL
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  // Get all products from React Query cache (prefetched on homepage)
  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    retry: 2,
    retryDelay: 1000,
  });

  // Find the specific product by slug or ID from cached products
  const product = allProducts.find(p => 
    p.slug === id || p.id === Number(id)
  );
  const error = !isLoading && !product;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set default selected color when product loads
  useEffect(() => {
    if (product && product.attributes?.Color && product.attributes.Color.length > 0) {
      setSelectedColor(product.attributes.Color[0]);
    }
  }, [product]);

  // Format price from cents to currency display
  const formatPrice = (priceInCents: number) => {
    return `£${(priceInCents / 100).toFixed(0)}`;
  };

  // Get available colors from product attributes
  const getAvailableColors = (): string[] => {
    return product?.attributes?.Color || [];
  };

  // Get all images from variations
  const getAllImages = () => {
    if (!product) return [];
    
    // If product has images array populated, use that
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    
    // Otherwise, get images from variations
    if (product.variations && product.variations.length > 0) {
      return product.variations
        .filter(v => v.image && v.image.src)
        .map(v => v.image);
    }
    
    return [];
  };

  // Get the current image to display based on selected color
  const getCurrentImage = () => {
    if (!product) return "/placeholder.svg";
    
    // If a color is selected and we have color-specific images
    if (selectedColor && product.colorImages) {
      const colorImage = product.colorImages[selectedColor.toLowerCase()];
      if (colorImage) {
        return colorImage;
      }
    }
    
    // Get all available images
    const allImages = getAllImages();
    
    // Return current image or first available
    return allImages[currentImageIndex]?.src || "/placeholder.svg";
  };

  // Get related products (excluding current product)
  const relatedProducts = allProducts.filter(p => p.id !== product?.id).slice(0, 3);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error or product not found
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col justify-center items-center py-24">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/products")} className="bg-purple-800 hover:bg-purple-900">
            Browse All Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const images = getAllImages();
  const availableColors = getAvailableColors();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Top Banner */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] text-center text-sm text-blue-800 bg-blue-50" style={{ height: '25px', lineHeight: '25px' }}>
          Buy two pairs (or more) of prescription glasses or sunglasses and get 15% Off
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex justify-center">
      <div className="w-full max-w-[1440px] px-4">
        {/* Product Section - Responsive Layout */}
        <div className="-mx-4 px-4 pb-8 mb-12" style={{ backgroundColor: '#F6F6F6' }}>
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                data-testid="button-back"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row xl:gap-8 xl:justify-between">
          {/* Product Images */}
          <div className="flex flex-col mb-8 xl:mb-0">
            <div className="rounded-lg flex items-center justify-center" style={{ width: '930px', height: '325px', backgroundColor: '#F6F6F6' }}>
              <img 
                src={getCurrentImage()} 
                alt={`${product.name} - ${selectedColor || 'default'}`}
                className="object-contain"
                style={{ width: '650px', height: '325px' }}
                data-testid="img-product-main"
              />
            </div>
            
            {/* Image Gallery Below Main Image */}
            <div className="flex gap-4 mt-4 justify-center" style={{ width: '930px' }}>
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`rounded-md flex items-center justify-center border ${
                    index === currentImageIndex ? 'border-gray-400' : 'border-gray-200'
                  } hover:border-gray-400 transition-colors bg-white`}
                  style={{ width: '120px', height: '90px' }}
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img 
                    src={image.src}
                    alt={image.alt || `View ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col bg-white rounded-lg shadow-sm mb-4 xl:mb-0" style={{ width: '470px', height: '521px', padding: '24px' }}>
            {/* Product Name and Wishlist */}
            <div className="flex items-center justify-between mb-3">
              <h1 className="brand-font-heading text-3xl font-bold text-gray-900" data-testid="text-product-name">
                {product.name}
              </h1>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                data-testid="button-favorite"
              >
                <span className="brand-font-primary">Add to wishlist</span>
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
              </button>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="brand-font-heading text-4xl font-bold text-gray-900" data-testid="text-price">
                  {formatPrice(product.price)}
                </span>
                <span className="brand-font-primary text-sm text-gray-600">price includes:</span>
              </div>
              <div className="brand-font-primary text-sm text-gray-600 mt-1">
                ✓ Frame & microfibre cloth<br/>
                ✓ Quality 1.5 index prescription lenses
              </div>
            </div>

            {/* Color Selection */}
            {availableColors.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <span className="brand-font-primary text-sm font-semibold text-gray-900">Colour:</span>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      {availableColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-7 h-7 rounded-full border-2 ${
                            selectedColor === color ? 'border-gray-900' : 'border-gray-300'
                          }`}
                          style={{ 
                            backgroundColor: color === 'clear' || color === 'transparent' ? '#f3f4f6' : color 
                          }}
                          data-testid={`button-color-${color}`}
                        />
                      ))}
                    </div>
                    <span className="brand-font-primary text-sm text-gray-600 capitalize" data-testid="text-selected-color">
                      {selectedColor}
                    </span>
                    <span className="brand-font-primary text-sm font-semibold text-gray-900">| In Stock</span>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Option */}
            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="brand-font-primary text-sm font-semibold text-gray-900">
                  Add <span className="font-bold">Next Day Express</span> <span className="font-normal text-gray-600">+£19.00</span>
                </span>
                <Info className="w-4 h-4 text-gray-400" />
              </label>
              <div className="brand-font-primary text-xs text-blue-600 mt-1 ml-6">
                Order now delivered by <span className="font-semibold">Thursday</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-4">
              <Button 
                onClick={() => navigate(`/select-lenses/${product.id}`, { 
                  state: { product: { 
                    id: product.id, 
                    name: product.name, 
                    price: product.price, 
                    image: product.images[0]?.src, 
                    color: selectedColor 
                  } } 
                })}
                className="w-full bg-[#1a0b3a] hover:bg-[#2a1b4a] text-white py-3 rounded-full brand-font-primary font-semibold text-base"
                disabled={!product.inStock}
                data-testid="button-choose-lenses"
              >
                Choose your lenses
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              
              <button 
                className="w-full brand-font-primary text-center text-gray-700 hover:text-gray-900 underline text-sm"
                data-testid="button-frame-only"
              >
                Buy frame only
              </button>
            </div>

            {/* Standard Protection */}
            <div className="brand-font-primary text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-700">Standard Production</span> 3-7 working days. Multifocal, complex prescriptions, tints and non-stock items may take longer.
            </div>
          </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="info" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info" className="brand-font-primary" data-testid="tab-product-info">
              Product Information & Measurements
            </TabsTrigger>
            <TabsTrigger value="lenses" className="brand-font-primary" data-testid="tab-lens-options">
              Available Lens Options
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Measurements Diagram */}
              <div className="flex flex-col items-center">
                <div className="bg-gray-50 p-8 rounded-lg w-full max-w-md">
                  <img 
                    src={product.images[0]?.src || "/placeholder.svg"} 
                    alt="Frame measurements"
                    className="w-full h-auto object-contain mb-4"
                    data-testid="img-measurements"
                  />
                  <div className="text-center brand-font-primary text-sm text-gray-600">
                    <div className="mb-2">Frame measurements</div>
                    <div className="flex justify-between">
                      <span>Front</span>
                      <span>Side</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details Table */}
              <div>
                <table className="w-full brand-font-primary text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">SKU:</td>
                      <td className="py-2 text-gray-900" data-testid="text-sku">{product.sku || 'N/A'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Colour:</td>
                      <td className="py-2 text-gray-900 capitalize" data-testid="text-color">
                        {selectedColor || availableColors[0] || 'N/A'}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Material:</td>
                      <td className="py-2 text-gray-900" data-testid="text-material">
                        {product.attributes?.Material?.[0] || 'Plastic'}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Category:</td>
                      <td className="py-2 text-gray-900" data-testid="text-category">{product.category}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">Need sizing help?</td>
                      <td className="py-2">
                        <a href="#" className="text-purple-800 hover:text-purple-900 underline">
                          Use our Fit Finder
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                {product.description && (
                  <div className="mt-6 brand-font-primary text-sm text-gray-600">
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="lenses" className="mt-6">
            <div className="text-center py-8 brand-font-primary text-gray-600">
              Available lens options would be displayed here.
            </div>
          </TabsContent>
        </Tabs>

        {/* Service Badges */}
        <div className="bg-blue-50 p-6 rounded-lg mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center brand-font-primary text-sm">
            <div className="flex items-center justify-center gap-2">
              <span className="text-blue-600">📅</span>
              <span>30-Day Free Return</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-blue-600">🛡️</span>
              <span>365-Day Guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-blue-600">🇬🇧</span>
              <span>Made in the UK</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-blue-600">🔒</span>
              <span>Secure Online Ordering</span>
            </div>
          </div>
        </div>

        {/* You may also like section */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="brand-font-heading text-2xl text-center mb-2" data-testid="text-related-heading">
              You may also like...
            </h2>
            <p className="brand-font-primary text-center text-gray-600 mb-8">
              Here is a selection of glasses similar to your favourites
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div 
                  key={relatedProduct.id} 
                  className="text-center group cursor-pointer" 
                  data-testid={`card-related-${relatedProduct.id}`}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <div className="relative bg-gray-50 rounded-lg p-6 mb-4 group-hover:shadow-lg transition-shadow">
                    <img 
                      src={relatedProduct.images[0]?.src || "/placeholder.svg"} 
                      alt={relatedProduct.name}
                      className="w-full h-32 object-contain mb-4"
                    />
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="brand-font-heading font-medium text-gray-800 mb-2">{relatedProduct.name}</h3>
                  <p className="brand-font-heading text-xl font-bold text-gray-900 mb-2">
                    {formatPrice(relatedProduct.price)}
                  </p>
                  <div className="flex justify-center gap-2 mb-4">
                    {(relatedProduct.attributes?.Color || []).map((color) => (
                      <div
                        key={color}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ 
                          backgroundColor: color === 'clear' || color === 'transparent' ? '#f3f4f6' : color 
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
