import { Heart } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  colors: string[];
  isLiked?: boolean;
  onLike?: () => void;
  selectedColor?: string;
  onColorChange?: (color: string) => void;
  colorImages?: Record<string, string>;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  colors, 
  isLiked = false, 
  onLike, 
  selectedColor, 
  onColorChange,
  colorImages 
}: ProductCardProps) => {

  // Get the current image to display
  const getCurrentImage = () => {
    if (selectedColor && colorImages && colorImages[selectedColor.toLowerCase()]) {
      return colorImages[selectedColor.toLowerCase()];
    }
    return image;
  };

  return (
    <div className="group cursor-pointer transition-all duration-300 hover:scale-105 rounded-2xl shadow-lg overflow-hidden" style={{ backgroundColor: '#f8f8f8' }}>
      {/* Product Image with 680x340 aspect ratio (2:1) */}
      <div className="relative w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden p-4 flex items-center justify-center">
        <img 
          src={getCurrentImage()} 
          alt={`${name} - ${selectedColor || 'default'}`} 
          className="w-full h-auto max-h-full object-contain object-center group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button 
          onClick={onLike}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500/90 text-white shadow-lg' 
              : 'bg-white/80 text-gray-600 hover:bg-red-500/90 hover:text-white shadow-md'
          }`}
        >
          <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Integrated Product Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-900 text-lg font-semibold tracking-wide">{name}</h3>
          <p className="text-purple-700 text-xl font-bold">{price}</p>
        </div>

        {/* Color Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 font-medium">Colors:</span>
          <div className="flex space-x-2">
            {colors.map((color, index) => (
              <button 
                key={index}
                className={`w-5 h-5 rounded-full border-2 shadow-sm cursor-pointer hover:scale-110 transition-transform duration-200 ${
                  selectedColor === color ? 'border-gray-800 ring-2 ring-offset-1 ring-gray-800' : 'border-white'
                }`}
                style={{ 
                  backgroundColor: color === 'clear' || color === 'transparent' ? '#f3f4f6' : 
                  color === 'brown' ? '#8B4513' :
                  color === 'black' ? '#000000' :
                  color === 'blue' ? '#0000FF' :
                  color === 'purple' ? '#800080' :
                  color === 'gray' ? '#808080' :
                  color === 'tortoise' ? '#A0522D' :
                  color === 'gold' ? '#FFD700' :
                  color === 'green' ? '#008000' :
                  '#cccccc' // Default fallback
                }}
                title={color}
                onClick={(e) => {
                  e.stopPropagation();
                  onColorChange?.(color);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;