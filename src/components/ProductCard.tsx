
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  colors: string[];
  isLiked?: boolean;
  onLike?: () => void;
}

const ProductCard = ({ name, price, image, colors, isLiked = false, onLike }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          onClick={onLike}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-gray-600 text-sm mb-2 font-medium">{name}</h3>
        <p className="text-black text-lg font-semibold mb-3">{price}</p>
        
        {/* Color Options */}
        <div className="flex justify-center space-x-2">
          {colors.map((color, index) => (
            <div 
              key={index}
              className={`w-4 h-4 rounded-full border-2 border-gray-200 cursor-pointer hover:scale-110 transition-transform ${
                color === 'brown' ? 'bg-amber-800' :
                color === 'black' ? 'bg-black' :
                color === 'blue' ? 'bg-blue-600' :
                color === 'purple' ? 'bg-purple-600' :
                color === 'gray' ? 'bg-gray-500' :
                color === 'tortoise' ? 'bg-amber-600' :
                'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
