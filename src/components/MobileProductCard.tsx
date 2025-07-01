import { Heart } from "lucide-react";

interface MobileProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  colors: string[];
  isLiked?: boolean;
  onLike?: () => void;
}

const MobileProductCard = ({ name, price, image, colors, isLiked = false, onLike }: MobileProductCardProps) => {
  return (
    <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.01] rounded-xl shadow-md overflow-hidden bg-white border border-gray-200">
      <div className="relative w-full h-44 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center">
        <img 
          src={image} 
          alt={name}
          className="w-full h-auto max-h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
        />
        <button 
          onClick={onLike}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500/90 text-white shadow-lg' 
              : 'bg-white/80 text-gray-600 hover:bg-red-500/90 hover:text-white shadow-md'
          }`}
        >
          <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-900 text-base font-semibold tracking-wide line-clamp-1">{name}</h3>
          <p className="text-purple-700 text-lg font-bold">{price}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 font-medium">Colors:</span>
          <div className="flex space-x-1">
            {colors.map((color, index) => (
              <div 
                key={index}
                className={`w-4 h-4 rounded-full border-2 border-white shadow-sm cursor-pointer ${
                  color === 'brown' ? 'bg-amber-800' :
                  color === 'black' ? 'bg-gray-900' :
                  color === 'blue' ? 'bg-blue-600' :
                  color === 'purple' ? 'bg-purple-600' :
                  color === 'gray' ? 'bg-gray-500' :
                  color === 'tortoise' ? 'bg-amber-600' :
                  'bg-gray-300'
                }`}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileProductCard;
