import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { getCloudinaryUrl } from "@shared/image-mappings";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const updateCart = () => {
            try {
                const items = JSON.parse(localStorage.getItem('cart') || '[]');
                setCartItems(items);
                const sum = items.reduce((acc: number, item: any) => acc + (item.price * (item.quantity || 1)), 0);
                setTotal(sum);
            } catch (e) {
                console.error("Error parsing cart", e);
            }
        };

        if (isOpen) {
            updateCart();
        }

        window.addEventListener('storage', updateCart);
        window.addEventListener('cartUpdated', updateCart);

        return () => {
            window.removeEventListener('storage', updateCart);
            window.removeEventListener('cartUpdated', updateCart);
        };
    }, [isOpen]);

    const updateQuantity = (index: number, delta: number) => {
        const newItems = [...cartItems];
        newItems[index].quantity = (newItems[index].quantity || 1) + delta;

        if (newItems[index].quantity < 1) {
            newItems[index].quantity = 1;
        }

        setCartItems(newItems);
        localStorage.setItem('cart', JSON.stringify(newItems));
        window.dispatchEvent(new Event('cartUpdated'));

        const sum = newItems.reduce((acc: number, item: any) => acc + (item.price * (item.quantity || 1)), 0);
        setTotal(sum);
    };

    const removeItem = (index: number) => {
        const newItems = cartItems.filter((_, i) => i !== index);
        setCartItems(newItems);
        localStorage.setItem('cart', JSON.stringify(newItems));
        window.dispatchEvent(new Event('cartUpdated'));

        const sum = newItems.reduce((acc: number, item: any) => acc + (item.price * (item.quantity || 1)), 0);
        setTotal(sum);
    };

    const formatPrice = (price: number) => {
        return `£${(price / 100).toFixed(0)}`;
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-gray-900" />
                            <h2 className="text-lg font-bold text-gray-900">Shopping Cart ({cartItems.length})</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                    <ShoppingBag className="w-8 h-8 text-gray-300" />
                                </div>
                                <div>
                                    <p className="text-gray-900 font-medium mb-1">Your cart is empty</p>
                                    <p className="text-gray-500 text-sm">Looks like you haven't added anything yet.</p>
                                </div>
                                <Button
                                    onClick={onClose}
                                    className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-6"
                                >
                                    Start Shopping
                                </Button>
                            </div>
                        ) : (
                            cartItems.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                        <img
                                            src={item.image || getCloudinaryUrl("/placeholder.svg")}
                                            alt={item.name}
                                            className="w-full h-full object-contain p-2"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                                                <p className="text-sm font-bold text-gray-900">{formatPrice(item.price * (item.quantity || 1))}</p>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 capitalize">{item.color}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border border-gray-200 rounded-full">
                                                <button
                                                    onClick={() => updateQuantity(index, -1)}
                                                    className="p-1 hover:text-gray-900 text-gray-500"
                                                    disabled={(item.quantity || 1) <= 1}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-xs font-medium w-6 text-center">{item.quantity || 1}</span>
                                                <button
                                                    onClick={() => updateQuantity(index, 1)}
                                                    className="p-1 hover:text-gray-900 text-gray-500"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(index)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-xl font-bold text-gray-900">{formatPrice(total)}</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-6 text-center">
                                Shipping and taxes calculated at checkout.
                            </p>
                            <Link href="/cart">
                                <a onClick={onClose}>
                                    <Button className="w-full bg-gray-900 hover:bg-black text-white h-12 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all">
                                        Checkout
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
