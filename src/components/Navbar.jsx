import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

const Navbar = ({ cartCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${isScrolled ? 'glass-nav' : 'bg-transparent'}`}>
          
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold tracking-tighter text-primary">
              Najhani<span className="text-cta">.</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Beranda</a>
            <a href="#koleksi" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Koleksi</a>
            <a href="#tentang" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Tentang</a>
            <a href="#kontak" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Kontak</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-gray-700 hover:text-primary transition-colors cursor-pointer relative group"
              onClick={onCartClick}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-cta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-primary cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-4 right-4 mt-2 glass-card rounded-2xl overflow-hidden transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
          <div className="flex flex-col p-4 space-y-4">
            <a href="#" className="text-base font-medium text-gray-800 p-2 hover:bg-gray-50 rounded-lg">Beranda</a>
            <a href="#koleksi" className="text-base font-medium text-gray-800 p-2 hover:bg-gray-50 rounded-lg">Koleksi</a>
            <a href="#tentang" className="text-base font-medium text-gray-800 p-2 hover:bg-gray-50 rounded-lg">Tentang</a>
            <a href="#kontak" className="text-base font-medium text-gray-800 p-2 hover:bg-gray-50 rounded-lg">Kontak</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
