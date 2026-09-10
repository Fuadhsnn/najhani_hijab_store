import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Button from './components/Button';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import TestimonialSlider from './components/TestimonialSlider';
import { CoverFlowCarousel } from '@/components/ui/3-d-coverflow-carousel';
import { products } from './data';
import { ArrowRight, Mail } from 'lucide-react';

function App() {
  const observerRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Constants
  const WHATSAPP_NUMBER = "6285179674249"; // Ganti dengan nomor asli

  // Cart Functions
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const checkoutWhatsApp = (total) => {
    let text = "Halo Najhani, saya ingin memesan:\n\n";
    cart.forEach(item => {
      text += `- ${item.product.name} (${item.quantity}x)\n`;
    });
    const formatPrice = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    text += `\nTotal: ${formatPrice(total)}\n\nTerima kasih.`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // GSAP Parallax for Hero Image (Hardware Accelerated)
    const parallaxTween = gsap.to(".hero-parallax", {
      y: 120,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 0.4
      }
    });

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observerRef.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      parallaxTween.kill();
    };
  }, []);

  const formatPrice = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  const carouselItems = products.map((item) => ({
    id: item.id,
    tag: item.tag || `#${item.badge}`,
    titleLine1: item.titleLine1 || item.name.split(' - ')[0].toUpperCase(),
    titleLine2: `${item.titleLine2 || ''} • ${formatPrice(item.price)}`,
    desc: item.desc || 'Koleksi hijab premium dengan material terbaik dan kelembutan alami.',
    img: item.image,
    ctaText: "Beli / + Keranjang",
    ctaUrl: "#",
    rawProduct: item
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        checkoutWhatsApp={checkoutWhatsApp}
      />

      <main>
        {/* Hero Section */}
        <section className="hero-section relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="max-w-2xl">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/5 text-primary text-sm font-bold mb-6 reveal">
                  Najhani Hijab — Sejak 2019
                </span>
                <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 reveal reveal-delay-1 text-primary">
                  Anggun dalam <br />
                  <span className="italic font-normal">Setiap</span> Lipatan.
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-10 reveal reveal-delay-2 max-w-lg leading-relaxed">
                  Hijab premium dengan bahan pilihan dan jatuh kain yang sempurna — dirancang untuk perempuan yang menghargai keanggunan tanpa perlu berlebihan.
                </p>
                <div className="flex flex-wrap gap-4 reveal reveal-delay-3">
                  <Button variant="primary" href="#koleksi">
                    Jelajahi Koleksi <ArrowRight size={18} className="ml-2" />
                  </Button>
                  <Button variant="ghost" href="#tentang">Kisah Kami</Button>
                </div>
              </div>

              <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden reveal reveal-delay-2 group">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1585728748176-455ac5eed962?w=800&q=80&auto=format&fit=crop"
                  alt="Model mengenakan hijab Najhani"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="hero-parallax w-full h-[120%] -mt-[10%] object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
                />

                {/* Floating Glass Card */}
                <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 z-20 glass-card rounded-2xl p-4 flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1640154852340-9de73a0643a8?w=120&q=80&auto=format&fit=crop"
                    alt="Customer"
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center text-cta mb-1">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-sm font-medium text-primary">
                      <strong>4.9/5</strong> dari 12.000+ perempuan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="bg-primary py-4 overflow-hidden flex whitespace-nowrap">
          <div className="animate-[marquee_20s_linear_infinite] flex items-center space-x-8 text-white/90 font-medium tracking-widest text-sm md:text-base">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <span>SUTRA PREMIUM</span><span className="text-cta">•</span>
                <span>CERUTY BABYDOLL</span><span className="text-cta">•</span>
                <span>VOAL LARISSA</span><span className="text-cta">•</span>
                <span>BELLA SQUARE</span><span className="text-cta">•</span>
                <span>PASHMINA INSTAN</span><span className="text-cta">•</span>
                <span>JAHITAN TANGAN</span><span className="text-cta">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Features / Tentang Section */}
        <section className="py-24 md:py-32 bg-white" id="tentang">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-20 reveal">
              <span className="text-cta font-bold text-sm tracking-wider uppercase mb-4 block">Kenapa Najhani</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Kelembutan yang Bisa Dirasakan, Bukan Hanya Dilihat</h2>
              <p className="text-lg text-gray-600">Tiga prinsip yang kami pegang di setiap potongan kain, jauh sebelum sampai ke tangan Anda.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  num: "01",
                  title: "Bahan Pilihan",
                  desc: "Kami hanya menggunakan kain premium yang adem dan tidak mudah kusut, dipilih langsung dari penenun terpercaya."
                },
                {
                  num: "02",
                  title: "Jatuh Kain Sempurna",
                  desc: "Setiap pola diuji berulang kali agar hijab jatuh dengan anggun secara alami, tanpa banyak pengaturan ulang."
                },
                {
                  num: "03",
                  title: "Warna yang Abadi",
                  desc: "Palet warna dirancang untuk tetap relevan musim demi musim — dipilih untuk bertahan lama, bukan tren sesaat."
                }
              ].map((feat, i) => (
                <div key={i} className={`p-8 rounded-3xl bg-background border border-gray-100 hover:shadow-xl transition-shadow duration-300 reveal reveal-delay-${i + 1}`}>
                  <span className="text-6xl font-bold text-gray-200 block mb-6">{feat.num}</span>
                  <h3 className="text-2xl font-bold text-primary mb-4">{feat.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collection Section - 3D Coverflow Carousel */}
        <section className="bg-[#0c0a09] relative overflow-hidden" id="koleksi">
          <CoverFlowCarousel
            items={carouselItems}
            sectionLabel="KOLEKSI PILIHAN — BEST SELLERS"
            autoplay={true}
            autoplayDelay={4500}
            onCtaClick={(item) => {
              const product = item.rawProduct || products.find(p => p.id === item.id);
              if (product) {
                addToCart(product);
              }
            }}
          />
        </section>

        {/* Testimonials */}
        <section className="py-24 md:py-32 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 reveal">
              <span className="text-cta font-bold text-sm tracking-wider uppercase mb-4 block">Testimoni</span>
              <h2 className="text-4xl font-bold text-primary">Cerita dari Perempuan Najhani</h2>
            </div>

            <TestimonialSlider />
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24 md:py-32 bg-primary text-white text-center px-4">
          <div className="container mx-auto max-w-3xl reveal">
            <span className="text-cta font-bold text-sm tracking-wider uppercase mb-4 block">Tetap Terhubung</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Jadi Bagian dari Najhani</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Dapatkan kabar koleksi terbaru, cerita di balik kain, dan penawaran khusus untuk pelanggan setia — langsung ke email Anda.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <input
                type="email"
                placeholder="Alamat email Anda"
                required
                disabled={subscribed}
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cta disabled:opacity-70"
              />
              <Button variant="cta" className="py-4" disabled={subscribed}>
                {subscribed ? 'Terima Kasih ✓' : <><span className="mr-2">Berlangganan</span> <Mail size={18} /></>}
              </Button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-100" id="kontak">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <a href="#" className="text-2xl font-bold tracking-tighter text-primary block mb-6">
                Najhani<span className="text-cta">.</span>
              </a>
              <p className="text-gray-500 text-sm leading-relaxed">
                Hijab premium dengan bahan pilihan dan jatuh kain yang sempurna — dirancang untuk perempuan yang menghargai keanggunan tanpa berlebihan.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-primary mb-6">Belanja</h4>
              <ul className="space-y-4">
                <li><a href="#koleksi" className="text-gray-500 hover:text-primary transition-colors text-sm">Koleksi Terbaru</a></li>
                <li><a href="#koleksi" className="text-gray-500 hover:text-primary transition-colors text-sm">Sutra Premium</a></li>
                <li><a href="#koleksi" className="text-gray-500 hover:text-primary transition-colors text-sm">Bella Square</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-primary mb-6">Tentang</h4>
              <ul className="space-y-4">
                <li><a href="#tentang" className="text-gray-500 hover:text-primary transition-colors text-sm">Kisah Kami</a></li>
                <li><a href="#tentang" className="text-gray-500 hover:text-primary transition-colors text-sm">Kelebihan</a></li>
                <li><a href="#testimoni" className="text-gray-500 hover:text-primary transition-colors text-sm">Testimoni</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-primary mb-6">Hubungi</h4>
              <ul className="space-y-4">
                <li><a href="#kontak" className="text-gray-500 hover:text-primary transition-colors text-sm">Hubungi Kami</a></li>
                <li><a href="https://instagram.com/najhani.hijab" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors text-sm">Instagram @najhani.hijab</a></li>
                <li><a href="mailto:hello@najhani.id" className="text-gray-500 hover:text-primary transition-colors text-sm">hello@najhani.id</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-sm text-gray-400">
            <p>© 2026 Najhani Hijab. Seluruh hak cipta dilindungi.</p>
            <p className="mt-2 md:mt-0">Dibuat dengan hati, di Indonesia.</p>
          </div>
        </div>
      </footer>

      {/* Tailwind marquee animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}

export default App;
