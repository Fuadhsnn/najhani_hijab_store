import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Baru kali ini pakai hijab seharian tanpa gerah. Bahannya benar-benar terasa beda sejak jahitan pertama.",
    author: "Amelia R.",
    location: "Bandung"
  },
  {
    quote: "Warnanya tidak pernah terasa ketinggalan zaman. Sudah tiga tahun pakai koleksi yang sama dan masih suka.",
    author: "Nur Halimah",
    location: "Surabaya"
  },
  {
    quote: "Jatuh kainnya rapi tanpa perlu banyak peniti. Ini yang bikin saya selalu balik lagi ke Najhani.",
    author: "Siti Aisyah",
    location: "Yogyakarta"
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="relative max-w-4xl mx-auto reveal reveal-delay-1 px-12">
      <div className="overflow-hidden relative min-h-[200px]">
        {testimonials.map((testi, index) => (
          <div 
            key={index}
            className={`absolute inset-0 flex flex-col items-center text-center will-change-transform transition-[opacity,transform] duration-500 ease-out ${
              index === currentIndex 
                ? 'opacity-100 translate-x-0 pointer-events-auto' 
                : index < currentIndex 
                  ? 'opacity-0 -translate-x-8 pointer-events-none' 
                  : 'opacity-0 translate-x-8 pointer-events-none'
            }`}
          >
            <p className="text-xl md:text-3xl font-medium text-primary mb-8 leading-relaxed max-w-3xl">
              "{testi.quote}"
            </p>
            <p className="text-gray-500 font-medium">
              <span className="text-primary font-bold">{testi.author}</span>, {testi.location}
            </p>
          </div>
        ))}
      </div>
      
      <button 
        onClick={prev}
        className="absolute top-1/2 -translate-y-1/2 left-0 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors cursor-pointer"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={next}
        className="absolute top-1/2 -translate-y-1/2 right-0 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors cursor-pointer"
        aria-label="Next testimonial"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex ? 'w-8 bg-cta' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
