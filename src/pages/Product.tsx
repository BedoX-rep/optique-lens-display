import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Star, Shield, Truck, RotateCcw, Plus, Minus, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Product = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, fetch by id
  const product = {
    id: parseInt(id || '1'),
    name: "Classic Round Glasses",
    brand: "OptiqueLens Premium",
    price: "299 MAD",
    originalPrice: "399 MAD",
    description: "Timeless round frames that combine classic style with modern comfort. Crafted from premium acetate with spring hinges for durability.",
    images: [
      "/mockupphotos/imgi_148_1487257371233468_resize_680_340.jpg",
      "/mockupphotos/imgi_151_1687258212854351_resize_680_340.jpg",
      "/mockupphotos/imgi_61_1467033542799571_resize_680_340.webp",
      "/mockupphotos/imgi_64_1487257371233468_resize_680_340.webp"
    ],
    colors: [
      { name: 'black', label: 'Matte Black', class: 'bg-gray-900' },
      { name: 'brown', label: 'Tortoise Brown', class: 'bg-amber-800' },
      { name: 'blue', label: 'Navy Blue', class: 'bg-blue-600' },
      { name: 'clear', label: 'Crystal Clear', class: 'bg-gray-100 border-2 border-gray-300' }
    ],
    sizes: ['Small', 'Medium', 'Large'],
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isOnSale: true,
    features: [
      "Premium acetate construction",
      "Spring hinges for flexibility",
      "Anti-reflective coating included",
      "UV protection",
      "Prescription lens compatible"
    ],
    specifications: {
      "Frame Width": "135mm",
      "Lens Width": "50mm",
      "Bridge Width": "20mm",
      "Temple Length": "145mm",
      "Weight": "22g",
      "Material": "Premium Acetate"
    }
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Modern Square Frames",
      price: "349 MAD",
      image: "/mockupphotos/imgi_151_1687258212854351_resize_680_340.jpg",
      rating: 4.6
    },
    {
      id: 3,
      name: "Vintage Cat Eye",
      price: "279 MAD",
      image: "/mockupphotos/imgi_61_1467033542799571_resize_680_340.webp",
      rating: 4.9
    },
    {
      id: 4,
      name: "Sports Sunglasses",
      price: "199 MAD",
      image: "/mockupphotos/imgi_64_1487257371233468_resize_680_340.webp",
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="max-w-[1440px] mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/products" className="text-muted-foreground hover:text-primary">Products</Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNew && <Badge className="bg-success text-white">New</Badge>}
                {product.isOnSale && <Badge variant="destructive">Sale</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.brand}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-warning text-warning' 
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="ml-2 font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">{product.originalPrice}</span>
              )}
              {product.isOnSale && (
                <Badge variant="destructive" className="text-sm">
                  Save {((parseInt(product.originalPrice!) - parseInt(product.price)) / parseInt(product.originalPrice!) * 100).toFixed(0)}%
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold">Color: {product.colors.find(c => c.name === selectedColor)?.label}</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full ${color.class} border-2 transition-all ${
                      selectedColor === color.name 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold">Size</h3>
              <Select defaultValue="Medium">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-semibold">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary-light">
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Eye className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center space-y-2">
                <RotateCcw className="h-8 w-8 mx-auto text-primary" />
                <div className="text-sm">
                  <p className="font-medium">30-Day Return</p>
                  <p className="text-muted-foreground">Free returns</p>
                </div>
              </div>
              <div className="text-center space-y-2">
                <Truck className="h-8 w-8 mx-auto text-primary" />
                <div className="text-sm">
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-muted-foreground">On orders over 500 MAD</p>
                </div>
              </div>
              <div className="text-center space-y-2">
                <Shield className="h-8 w-8 mx-auto text-primary" />
                <div className="text-sm">
                  <p className="font-medium">1 Year Warranty</p>
                  <p className="text-muted-foreground">Full coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b last:border-b-0">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {/* Review summary */}
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{product.rating}</div>
                        <div className="flex justify-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) 
                                  ? 'fill-warning text-warning' 
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">{product.reviews} reviews</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-center py-8">
                      Customer reviews coming soon...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden rounded-t-lg">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">
                    <Link to={`/product/${relatedProduct.id}`} className="hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </Link>
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{relatedProduct.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="text-sm">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Product;