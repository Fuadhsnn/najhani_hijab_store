import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Button from './Button';

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeItem, checkoutWhatsApp }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white/95 backdrop-blur-xl shadow-2xl z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100/50 glass-nav bg-transparent shadow-none">
          <h2 className="text-xl font-bold text-primary flex items-center">
            <ShoppingBag className="mr-2" size={20} /> Keranjang
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Keranjang belanja Anda kosong.</p>
              <Button variant="outline" onClick={onClose} className="mt-4">Mulai Belanja</Button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-20 h-24 object-cover rounded-xl"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-primary text-sm line-clamp-1">{item.product.name}</h4>
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">{item.product.tag}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-primary text-sm">{formatPrice(item.product.price)}</span>
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-primary p-1 cursor-pointer"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-primary p-1 cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Total Harga</span>
              <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
            </div>
            <Button 
              variant="cta" 
              className="w-full py-4 text-lg"
              onClick={() => checkoutWhatsApp(total)}
            >
              Checkout via WhatsApp
            </Button>
            <p className="text-xs text-center text-gray-400 mt-4">
              Anda akan diarahkan ke WhatsApp untuk konfirmasi pesanan dengan admin kami.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
