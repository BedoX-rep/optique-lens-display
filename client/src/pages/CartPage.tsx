import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Edit3, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../styles/brand-system.css";

interface CartItem {
  id: number;
  frame: {
    id: number;
    name: string;
    price: number;
    image: string;
    color: string;
  };
  lenses: {
    usage: {
      id: string;
      title: string;
      price: number;
    };
    type: {
      id: string;
      title: string;
      price: number;
    };
    material: {
      id: string;
      title: string;
      price: number;
    };
  };
  totalPrice: number;
  quantity?: number;
}

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart items from localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const items = JSON.parse(savedCart).map((item: CartItem) => ({
            ...item,
            quantity: item.quantity || 1,
          }));
          setCartItems(items);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
    window.scrollTo(0, 0);
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      // Dispatch custom event to update header cart count
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  }, [cartItems, isLoading]);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const editItem = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      navigate(`/select-lenses/${item.frame.id}`, {
        state: { product: item.frame }
      });
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.totalPrice * (item.quantity || 1)), 0);
  };

  const calculateShipping = () => {
    // Free shipping over £50, otherwise £5
    const subtotal = calculateSubtotal();
    return subtotal >= 50 ? 0 : 5;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800 mx-auto mb-4"></div>
            <p className="brand-font-primary text-gray-600">Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Top Banner */}
      <div className="w-full bg-blue-50 py-2 text-center text-sm text-blue-800">
        Buy two pairs (or more) of prescription glasses or sunglasses and get 15% Off
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1440px] mx-auto px-4 py-6">
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
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="brand-font-heading text-3xl text-gray-900 mb-2" data-testid="text-cart-title">
            Shopping Cart
          </h1>
          <p className="brand-font-primary text-gray-600">
            {cartItems.length === 0 
              ? "Your cart is empty" 
              : `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`
            }
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-4xl text-gray-400">🛍️</div>
              </div>
              <h2 className="brand-font-heading text-2xl text-gray-800 mb-4">Your cart is empty</h2>
              <p className="brand-font-primary text-gray-600 mb-8 max-w-md mx-auto">
                Start shopping to add items to your cart. Browse our collection of premium eyewear.
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate('/products')}
                  className="bg-purple-800 hover:bg-purple-900 text-white px-8 py-3"
                  data-testid="button-browse-products"
                >
                  Browse Products
                </Button>
                <br />
                <button 
                  onClick={() => navigate('/')}
                  className="brand-font-primary text-purple-800 hover:text-purple-900 underline"
                  data-testid="button-go-home"
                >
                  Go to Homepage
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="border border-gray-200" data-testid={`cart-item-${item.id}`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 bg-gray-50 rounded-lg p-4">
                          <img 
                            src={item.frame.image} 
                            alt={item.frame.name}
                            className="w-full h-full object-contain"
                            data-testid={`img-frame-${item.id}`}
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="brand-font-heading text-xl text-gray-900 mb-1" data-testid={`text-frame-name-${item.id}`}>
                              {item.frame.name}
                            </h3>
                            <p className="brand-font-primary text-gray-600 mb-2" data-testid={`text-frame-color-${item.id}`}>
                              {item.frame.color}
                            </p>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              In Stock
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="brand-font-heading text-2xl font-bold text-gray-900" data-testid={`text-price-${item.id}`}>
                              £{(item.totalPrice * (item.quantity || 1)).toFixed(2)}
                            </p>
                            {(item.quantity || 1) > 1 && (
                              <p className="brand-font-primary text-sm text-gray-600">
                                £{item.totalPrice.toFixed(2)} each
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Lens Details */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="brand-font-primary font-medium text-gray-800 mb-3">Selected Lenses:</h4>
                          <div className="space-y-2 brand-font-primary text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Usage:</span>
                              <span className="text-gray-900" data-testid={`text-lens-usage-${item.id}`}>
                                {item.lenses.usage.title} 
                                {item.lenses.usage.price > 0 && ` (+£${item.lenses.usage.price})`}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="text-gray-900" data-testid={`text-lens-type-${item.id}`}>
                                {item.lenses.type.title}
                                {item.lenses.type.price > 0 && ` (+£${item.lenses.type.price})`}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Material:</span>
                              <span className="text-gray-900" data-testid={`text-lens-material-${item.id}`}>
                                {item.lenses.material.title}
                                {item.lenses.material.price > 0 && ` (+£${item.lenses.material.price})`}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                                disabled={(item.quantity || 1) <= 1}
                                data-testid={`button-decrease-${item.id}`}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center" data-testid={`text-quantity-${item.id}`}>
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                className="p-2 text-gray-600 hover:text-gray-800"
                                data-testid={`button-increase-${item.id}`}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => editItem(item.id)}
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 brand-font-primary text-sm"
                              data-testid={`button-edit-${item.id}`}
                            >
                              <Edit3 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center gap-2 text-red-600 hover:text-red-800 brand-font-primary text-sm"
                              data-testid={`button-remove-${item.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border border-gray-200 sticky top-4">
                <CardContent className="p-6">
                  <h3 className="brand-font-heading text-xl text-gray-900 mb-6" data-testid="text-order-summary">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between brand-font-primary">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-900" data-testid="text-subtotal">
                        £{calculateSubtotal().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between brand-font-primary">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="text-gray-900" data-testid="text-shipping">
                        {calculateShipping() === 0 ? 'FREE' : `£${calculateShipping().toFixed(2)}`}
                      </span>
                    </div>
                    {calculateSubtotal() >= 50 && calculateShipping() === 0 && (
                      <div className="text-green-600 brand-font-primary text-sm">
                        🎉 You've qualified for free shipping!
                      </div>
                    )}
                    <hr className="border-gray-200" />
                    <div className="flex justify-between brand-font-heading text-lg font-bold">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-gray-900" data-testid="text-total">
                        £{calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-purple-800 hover:bg-purple-900 text-white py-3 mb-4"
                    data-testid="button-checkout"
                  >
                    Proceed to Checkout
                  </Button>

                  <div className="space-y-2 brand-font-primary text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>🛡️</span>
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📦</span>
                      <span>Free returns within 30 days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>💎</span>
                      <span>365-day quality guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Continue Shopping */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate('/products')}
                  className="brand-font-primary text-purple-800 hover:text-purple-900 underline"
                  data-testid="button-continue-shopping"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;