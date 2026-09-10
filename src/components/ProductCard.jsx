import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';

const ProductCard = ({ product, index, onAddToCart }) => {
  const { name, price, image, badge, tag } = product;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer flex flex-col"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 bg-gray-100">
        {badge && (
          <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-primary shadow-sm">
            {badge}
          </span>
        )}
        <img 
          src={image} 
          alt={name} 
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <Button 
            variant="cta" 
            className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl px-8"
            onClick={onAddToCart}
          >
            <ShoppingBag size={18} className="mr-2" /> Tambah
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-bold text-primary mb-1">{name}</h4>
          <p className="text-sm text-gray-500 font-medium">{tag}</p>
        </div>
        <span className="text-base font-bold text-primary">{formatPrice(price)}</span>
      </div>
    </motion.div>
  );
};

export default ProductCard;
