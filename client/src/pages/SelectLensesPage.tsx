import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../styles/brand-system.css";

interface LensSelection {
  usage: string | null;
  type: string | null;
  material: string | null;
  usagePrice: number;
  typePrice: number;
  materialPrice: number;
}

const SelectLensesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [lensSelection, setLensSelection] = useState<LensSelection>({
    usage: null,
    type: null,
    material: null,
    usagePrice: 0,
    typePrice: 0,
    materialPrice: 0,
  });

  // Get product data from navigation state or use default
  const product = location.state?.product || {
    id: parseInt(id || "1"),
    name: "Crystal Clear",
    price: 29,
    image: "/test-frames/test1.png",
    color: "Clear",
  };

  const framePrice = product.price;
  const totalPrice = framePrice + lensSelection.usagePrice + lensSelection.typePrice + lensSelection.materialPrice;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lensUsageOptions = [
    {
      id: "single-distance",
      title: "Single Vision (Distance)",
      description: "Only one lenses for seeing far away",
      price: 0,
    },
    {
      id: "single-reading",
      title: "Single Vision (Reading)",
      description: "For close up activities like reading and writing",
      price: 0,
    },
    {
      id: "progressive",
      title: "Progressive (Distance + Reading)",
      description: "Lenses for seeing things both close up and far away",
      price: 45,
      badge: "From £45.00",
    },
    {
      id: "protection",
      title: "Protection Glasses",
      description: "Visible line separating distance and reading",
      price: 35,
      badge: "£35.00",
    },
  ];

  const lensTypeOptions = [
    {
      id: "classic-white",
      title: "Classic White",
      description: "Standard clear lenses with basic protection",
      price: 0,
    },
    {
      id: "anti-reflet",
      title: "Anti Reflet Green",
      description: "Reduces glare and reflections for clearer vision",
      price: 15,
    },
    {
      id: "blue-light",
      title: "Blue Light Filtering",
      description: "Protects against harmful blue light from screens",
      price: 25,
    },
  ];

  const lensMaterialOptions = [
    {
      id: "regular",
      title: "Regular (1.56)",
      description: "for -3.00 to +3.00",
      price: 0,
    },
    {
      id: "thin",
      title: "Thin (1.6)",
      description: "for -4.50 to +4.50",
      price: 20,
    },
    {
      id: "extra-thin",
      title: "Extra Thin (1.67)",
      description: "for -6 to +6",
      price: 40,
    },
    {
      id: "thinnest",
      title: "Thinnest (1.74)",
      description: "for highest prescriptions",
      price: 65,
    },
  ];

  const handleUsageSelect = (option: any) => {
    setLensSelection({
      ...lensSelection,
      usage: option.id,
      usagePrice: option.price,
    });
  };

  const handleTypeSelect = (option: any) => {
    setLensSelection({
      ...lensSelection,
      type: option.id,
      typePrice: option.price,
    });
  };

  const handleMaterialSelect = (option: any) => {
    setLensSelection({
      ...lensSelection,
      material: option.id,
      materialPrice: option.price,
    });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleAddToCart = () => {
    // Store the complete order in localStorage for the cart
    const cartItem = {
      id: Date.now(),
      frame: product,
      lenses: {
        usage: lensUsageOptions.find(opt => opt.id === lensSelection.usage),
        type: lensTypeOptions.find(opt => opt.id === lensSelection.type),
        material: lensMaterialOptions.find(opt => opt.id === lensSelection.material),
      },
      totalPrice: totalPrice,
    };
    
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    navigate('/cart');
  };

  const canProceed = () => {
    if (currentStep === 1) return lensSelection.usage !== null;
    if (currentStep === 2) return lensSelection.type !== null;
    if (currentStep === 3) return lensSelection.material !== null;
    return false;
  };

  const getStepTitle = () => {
    if (currentStep === 1) return "Select your lens usage";
    if (currentStep === 2) return "Select lens type";
    if (currentStep === 3) return "Select lens material";
    return "";
  };

  const getStepDescription = () => {
    if (currentStep === 1) return "What is the difference between lens usages?";
    if (currentStep === 2) return "Choose the type of lens coating and protection";
    if (currentStep === 3) return "Select the thickness and material for your lenses";
    return "";
  };

  const getCurrentOptions = () => {
    if (currentStep === 1) return lensUsageOptions;
    if (currentStep === 2) return lensTypeOptions;
    if (currentStep === 3) return lensMaterialOptions;
    return [];
  };

  const getSelectedValue = () => {
    if (currentStep === 1) return lensSelection.usage;
    if (currentStep === 2) return lensSelection.type;
    if (currentStep === 3) return lensSelection.material;
    return null;
  };

  const handleOptionSelect = (option: any) => {
    if (currentStep === 1) handleUsageSelect(option);
    if (currentStep === 2) handleTypeSelect(option);
    if (currentStep === 3) handleMaterialSelect(option);
  };

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
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button 
            onClick={() => navigate('/products')}
            className="text-gray-600 hover:text-gray-800"
            data-testid="button-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  step === currentStep
                    ? 'bg-blue-600'
                    : step < currentStep
                    ? 'bg-blue-400'
                    : 'bg-gray-300'
                }`}
                data-testid={`step-indicator-${step}`}
              />
            ))}
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1440px]">
          {/* Left Side - Product Image */}
          <div className="lg:max-w-[720px] flex justify-center">
            <div className="w-full max-w-lg bg-gray-50 rounded-lg p-8">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto object-contain"
                style={{ minHeight: '300px', maxHeight: '400px' }}
                data-testid="img-product"
              />
              <div className="text-center mt-4">
                <h3 className="brand-font-heading text-xl text-gray-800" data-testid="text-product-name">
                  {product.name}
                </h3>
                <p className="brand-font-primary text-gray-600" data-testid="text-product-color">
                  {product.color}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Lens Selection */}
          <div className="lg:max-w-[720px]">
            <div className="mb-6">
              <h1 className="brand-font-heading text-2xl text-gray-900 mb-2" data-testid="text-step-title">
                {getStepTitle()}
              </h1>
              <div className="flex items-center gap-2">
                <p className="brand-font-primary text-gray-600" data-testid="text-step-description">
                  {getStepDescription()}
                </p>
                <Info className="w-4 h-4 text-gray-400" />
                <button className="brand-font-primary text-sm text-blue-600 hover:text-blue-800 underline">
                  More info
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {getCurrentOptions().map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    getSelectedValue() === option.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleOptionSelect(option)}
                  data-testid={`option-${option.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="brand-font-heading font-medium text-gray-900 mb-1">
                          {option.title}
                        </h3>
                        <p className="brand-font-primary text-sm text-gray-600">
                          {option.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {option.price > 0 && (
                          <span className="brand-font-primary text-sm font-medium text-gray-900">
                            +£{option.price}
                          </span>
                        )}
                        {(option as any).badge && (
                          <Badge variant="outline" className="text-blue-700 border-blue-300">
                            {(option as any).badge}
                          </Badge>
                        )}
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          getSelectedValue() === option.id 
                            ? 'border-blue-600 bg-blue-600' 
                            : 'border-gray-300'
                        }`}>
                          {getSelectedValue() === option.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Watch Video Link */}
            <div className="mb-8">
              <button className="flex items-center gap-2 brand-font-primary text-sm text-blue-600 hover:text-blue-800">
                Watch our helpful video 
                <span className="text-xs">📹</span>
              </button>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="brand-font-primary font-medium text-gray-700">Subtotal:</span>
                <span className="brand-font-heading text-xl font-bold text-gray-900" data-testid="text-subtotal">
                  £{totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="brand-font-primary text-xs text-gray-600 mt-1">
                Frame (£{framePrice}) + Lenses (£{(lensSelection.usagePrice + lensSelection.typePrice + lensSelection.materialPrice).toFixed(2)})
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {currentStep < 3 ? (
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  disabled={!canProceed()}
                  onClick={handleNext}
                  data-testid="button-next"
                >
                  Continue to {currentStep === 1 ? 'Lens Type' : 'Lens Material'}
                </Button>
              ) : (
                <Button 
                  className="w-full bg-purple-800 hover:bg-purple-900 text-white py-3"
                  disabled={!canProceed()}
                  onClick={handleAddToCart}
                  data-testid="button-add-to-cart"
                >
                  Add to Basket - £{totalPrice.toFixed(2)}
                </Button>
              )}
              
              <button 
                className="w-full brand-font-primary text-center text-gray-600 hover:text-gray-800 underline py-2"
                onClick={() => navigate(`/product/${product.id}`)}
                data-testid="button-back-to-product"
              >
                Back to product details
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SelectLensesPage;