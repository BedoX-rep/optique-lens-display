import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ChevronDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../styles/brand-system.css";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("black");
  const [isLiked, setIsLiked] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Product data mapped to new test frames
  const productData = {
    1: {
      name: "Crystal Clear",
      images: ["/test-frames/test1.png"],
      availableColors: ["clear", "gold"],
      color: "Clear",
      description: "A sophisticated crystal clear frame with gold accents, perfect for professional and casual wear."
    },
    2: {
      name: "Tortoise Classic", 
      images: ["/test-frames/test2.png"],
      availableColors: ["tortoise", "brown"],
      color: "Tortoise",
      description: "Classic tortoise shell design with timeless appeal and premium craftsmanship."
    },
    3: {
      name: "Sage Green",
      images: ["/test-frames/test3.png"],
      availableColors: ["green", "gold"],
      color: "Sage Green",
      description: "Modern sage green frame with gold details, offering a unique and stylish look."
    },
    4: {
      name: "Clear Vision",
      images: ["/test-frames/test4.png"],
      availableColors: ["clear", "gold"],
      color: "Clear",
      description: "Pure clarity meets elegant design in this minimalist frame with subtle gold touches."
    }
  };

  const currentProduct = productData[parseInt(id || "1") as keyof typeof productData] || productData[1];
  
  const product = {
    id: parseInt(id || "1"),
    name: currentProduct.name,
    price: 29,
    inStock: true,
    productCode: "SOL0589",
    size: "48x19x140",
    color: currentProduct.color,
    material: "Plastic",
    frameWidth: 48,
    bridgeWidth: 19,
    templeLength: 140,
    description: currentProduct.description,
    images: currentProduct.images,
    availableColors: currentProduct.availableColors,
    category: "glasses",
    brand: "OptiqueLens",
  };

  const images = product.images;

  // Get other test frames as related products
  const allProducts = Object.entries(productData).map(([id, data]) => ({
    id: parseInt(id),
    name: data.name,
    price: 29,
    image: data.images[0],
    colors: data.availableColors
  }));
  
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Top Banner */}
      <div className="w-full bg-blue-50 py-2 text-center text-sm text-blue-800">
        Buy two pairs (or more) of prescription glasses or sunglasses and get 15% Off
      </div>

      {/* Main Content */}
      <div className="w-full flex justify-center">
      <div className="w-full max-w-[1440px] px-4 py-6">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-medium">
            NEXT DAY AVAILABLE
          </Badge>
        </div>

        {/* Product Section - Responsive Layout */}
        <div className="flex flex-col xl:grid xl:grid-cols-2 xl:gap-12 mb-12">
          {/* Product Images */}
          <div className="flex flex-col items-center mb-8 xl:mb-0">
            <div className="w-full max-w-md bg-gray-50 rounded-lg p-8 mb-4">
              <img 
                src={images[currentImageIndex]} 
                alt={product.name}
                className="w-full h-auto object-contain"
                data-testid="img-product-main"
              />
            </div>
            
            {/* Image Dots */}
            <div className="flex gap-2 mb-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImageIndex ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                  data-testid={`button-image-dot-${index}`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col xl:pl-8">
            {/* Product Name and Heart */}
            <div className="flex items-center gap-3 mb-2">
              <h1 className="brand-font-heading text-2xl text-gray-800" data-testid="text-product-name">
                {product.name}
              </h1>
              <span className="brand-font-primary text-gray-400 text-sm">Favourite</span>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`text-xl ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                data-testid="button-favorite"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Price and Stock */}
            <div className="flex items-center gap-4 mb-6">
              <span className="brand-font-heading text-3xl text-gray-900" data-testid="text-price">
                £{product.price}
              </span>
              <span className="brand-font-primary text-sm text-gray-600">price includes:</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                In Stock
              </Badge>
            </div>

            <div className="brand-font-primary text-sm text-gray-600 mb-4">
              • Frame & standard clear lenses<br/>
              • Quality 14 times prescription lenses
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex gap-2">
                  {product.availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full border-2 ${
                        selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      data-testid={`button-color-${color}`}
                    />
                  ))}
                </div>
                <span className="brand-font-primary text-sm text-gray-600 capitalize" data-testid="text-selected-color">
                  {selectedColor}
                </span>
              </div>
            </div>

            {/* Shipping Option */}
            <div className="mb-6 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="brand-font-primary text-blue-800 font-medium">📦 Next Day Express</span>
                  <span className="brand-font-primary text-blue-600">- £19.00</span>
                </div>
                <Info className="w-4 h-4 text-blue-600" />
              </div>
              <div className="brand-font-primary text-xs text-blue-600 mt-1">Order now and receive Thursday</div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <Button 
                className="w-full bg-purple-800 hover:bg-purple-900 text-white py-3 rounded-lg brand-font-primary font-medium"
                data-testid="button-choose-lenses"
              >
                Choose your lenses
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              
              <button 
                className="w-full brand-font-primary text-center text-purple-800 hover:text-purple-900 underline"
                data-testid="button-frame-only"
              >
                Buy frame only
              </button>
            </div>

            {/* Standard Protection */}
            <div className="brand-font-primary text-sm text-gray-600 mb-6">
              <strong>Standard Protection</strong> - 7 working days (Not Incl. on sales orders)
              Standard lens, tint and non-tinted frame only fees range.
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
                    src={product.images[0]} 
                    alt="Frame measurements"
                    className="w-full h-auto object-contain mb-4"
                    data-testid="img-measurements"
                  />
                  <div className="text-center brand-font-primary text-sm text-gray-600">
                    <div className="mb-2">42.5mm</div>
                    <div className="mb-2">48mm</div>
                    <div className="mb-2">122mm</div>
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
                      <td className="py-2 text-gray-600">Size:</td>
                      <td className="py-2 text-gray-900" data-testid="text-size">{product.size}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Colour:</td>
                      <td className="py-2 text-gray-900 capitalize" data-testid="text-color">{product.color}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Material:</td>
                      <td className="py-2 text-gray-900" data-testid="text-material">{product.material}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Product code:</td>
                      <td className="py-2 text-gray-900" data-testid="text-product-code">{product.productCode}</td>
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
                
                <div className="mt-6 brand-font-primary text-sm text-gray-600">
                  {product.description}
                </div>
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
        <div className="mb-12">
          <h2 className="brand-font-heading text-2xl text-center mb-2" data-testid="text-related-heading">
            You may also like...
          </h2>
          <p className="brand-font-primary text-center text-gray-600 mb-8">
            Here is a selection of glasses similar to your favourites
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="text-center group cursor-pointer" data-testid={`card-related-${relatedProduct.id}`}>
                <div className="bg-gray-50 rounded-lg p-6 mb-4 group-hover:shadow-lg transition-shadow">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    className="w-full h-32 object-contain mb-4"
                  />
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="brand-font-heading font-medium text-gray-800 mb-2">{relatedProduct.name}</h3>
                <p className="brand-font-heading text-xl font-bold text-gray-900 mb-2">£{relatedProduct.price}</p>
                <div className="flex justify-center gap-2 mb-4">
                  {relatedProduct.colors.map((color) => (
                    <div
                      key={color}
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;