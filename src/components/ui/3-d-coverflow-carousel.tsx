"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

// Inline Icons (Zero external dependencies)
const ChevronLeftIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export interface CarouselItem {
  id?: number | string;
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  ctaText?: string;
  ctaUrl?: string;
  rawProduct?: any;
}

export interface CoverFlowCarouselProps {
  items?: CarouselItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  onCtaClick?: (item: CarouselItem) => void;
}

export const defaultDishes: CarouselItem[] = [
  {
    tag: "#Signature",
    titleLine1: "BUTTER CHICKEN",
    titleLine2: "– DELHI HERITAGE",
    desc: "Velvety roasted tomato and fenugreek gravy with tender charred chicken",
    img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
  {
    tag: "#ChefSpecial",
    titleLine1: "TANDOORI CHOPS",
    titleLine2: "– SMOKED SPICE",
    desc: "Grass-fed lamb chops charred in live charcoal tandoor with Kashmiri spices",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
  {
    tag: "#Vegetarian",
    titleLine1: "PANEER TIKKA",
    titleLine2: "– CLAY ROASTED",
    desc: "Artisan cottage cheese marinated in spiced yogurt, bell peppers & saffron",
    img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=80",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
  {
    tag: "#CoastalCatch",
    titleLine1: "MALABAR PRAWNS",
    titleLine2: "– COCONUT GRAVY",
    desc: "Jumbo wild tiger prawns simmered in fragrant curry leaves and coconut milk",
    img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop&q=80",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
  {
    tag: "#ArtisanBake",
    titleLine1: "TRUFFLE NAAN",
    titleLine2: "– CHARCOAL OVEN",
    desc: "Crispy puffed leavened bread brushed with pure ghee and black winter truffle",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
];

export function CoverFlowCarousel({
  items = defaultDishes,
  sectionLabel = "BEST SELLERS",
  autoplay = true,
  autoplayDelay = 5000,
  className = "",
  onCtaClick,
}: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx % total);
  };

  // Viewport Observer: Autoplay only when visible in screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Autoplay handler
  useEffect(() => {
    if (!autoplay || !isInView || isHovered || total <= 1) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isInView, isHovered, nextSlide, total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView) return;
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInView, nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-[720px] flex items-center justify-center overflow-hidden py-16 select-none ${className}`}
      style={{
        backgroundColor: "#0c0a09",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Ambience - Lightweight Radial Glow (0ms GPU Paint Cost) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 40%, rgba(197, 168, 128, 0.12) 0%, rgba(12, 10, 9, 0.85) 55%, #0c0a09 100%)",
        }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-4 z-10 flex flex-col items-center">
        {/* Eyebrow */}
        {sectionLabel && (
          <div className="flex items-center gap-3 mb-8">
            <span style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, transparent, #c5a880)" }} />
            <h3
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c5a880",
                margin: 0,
              }}
            >
              {sectionLabel}
            </h3>
            <span style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #c5a880, transparent)" }} />
          </div>
        )}

        {/* 3D Coverflow Stage */}
        <div
          className="relative w-full h-[520px] flex justify-center items-center mb-8"
          style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
        >
          {items.map((item, idx) => {
            const offset = (idx - currentIndex + total) % total;

            let transform = "translateX(0px) scale(0.4) rotateY(0deg) translateZ(0)";
            let opacity = 0;
            let zIndex = 0;
            let isCenter = false;

            if (offset === 0) {
              isCenter = true;
              transform = "translateX(0px) scale(1) rotateY(0deg) translateZ(0)";
              opacity = 1;
              zIndex = 30;
            } else if (offset === 1) {
              transform = "translateX(280px) scale(0.84) rotateY(-22deg) translateZ(0)";
              opacity = 0.65;
              zIndex = 20;
            } else if (offset === 2) {
              transform = "translateX(490px) scale(0.68) rotateY(-34deg) translateZ(0)";
              opacity = 0.3;
              zIndex = 10;
            } else if (offset === total - 1) {
              transform = "translateX(-280px) scale(0.84) rotateY(22deg) translateZ(0)";
              opacity = 0.65;
              zIndex = 20;
            } else if (offset === total - 2) {
              transform = "translateX(-490px) scale(0.68) rotateY(34deg) translateZ(0)";
              opacity = 0.3;
              zIndex = 10;
            }

            return (
              <div
                key={idx}
                onClick={() => !isCenter && goToSlide(idx)}
                style={{
                  position: "absolute",
                  width: "320px",
                  height: "490px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  backgroundColor: "#171311",
                  border: isCenter ? "1px solid rgba(197, 168, 128, 0.3)" : "1px solid rgba(255, 255, 255, 0.08)",
                  transform,
                  opacity,
                  zIndex,
                  transformOrigin: "center center",
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transition: "transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 550ms ease, border-color 400ms ease",
                  boxShadow: isCenter
                    ? "0 20px 45px -10px rgba(0,0,0,0.85), 0 0 20px rgba(197,168,128,0.18)"
                    : "0 10px 25px -5px rgba(0,0,0,0.5)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                {/* Photo */}
                <img
                  src={item.img}
                  alt={item.titleLine1}
                  loading={isCenter ? "eager" : "lazy"}
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.96) 100%)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    padding: "20px 18px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                    zIndex: 20,
                    opacity: isCenter ? 1 : 0,
                    transform: isCenter ? "translateY(0px)" : "translateY(12px)",
                    transition: "opacity 400ms ease, transform 400ms ease",
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  {/* Tag */}
                  <div style={{ textAlign: "right", width: "100%", paddingRight: "4px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "3px",
                      marginTop: "auto",
                      paddingBottom: "4px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.1,
                      }}
                    >
                      {item.titleLine1}
                    </h2>

                    {item.titleLine2 && (
                      <span
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "#f3f0ea",
                          lineHeight: 1.2,
                        }}
                      >
                        {item.titleLine2}
                      </span>
                    )}

                    <div
                      style={{
                        width: "34px",
                        height: "2px",
                        backgroundColor: "#c5a880",
                        borderRadius: "2px",
                        margin: "6px auto 5px",
                      }}
                    />

                    {item.desc && (
                      <p
                        style={{
                          fontSize: "0.82rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.85)",
                          maxWidth: "270px",
                          margin: "0 0 12px",
                          lineHeight: 1.35,
                        }}
                      >
                        {item.desc}
                      </p>
                    )}

                    <a
                      href={item.ctaUrl || "#"}
                      onClick={(e) => {
                        if (onCtaClick) {
                          e.preventDefault();
                          onCtaClick(item);
                        }
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 20px",
                        borderRadius: "9999px",
                        background: "linear-gradient(135deg, #c5a880 0%, #a48256 100%)",
                        color: "#110d0c",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
                        cursor: "pointer",
                        transition: "transform 150ms ease, opacity 150ms ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <span>{item.ctaText || "View Menu"}</span>
                      <ArrowRightIcon />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows (No backdrop blur overhead) */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(23, 19, 17, 0.85)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
            zIndex: 40,
            transition: "transform 150ms ease, background-color 150ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(197, 168, 128, 0.9)";
            e.currentTarget.style.color = "#110d0c";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(23, 19, 17, 0.85)";
            e.currentTarget.style.color = "#ffffff";
          }}
        >
          <ChevronLeftIcon />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(23, 19, 17, 0.85)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
            zIndex: 40,
            transition: "transform 150ms ease, background-color 150ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(197, 168, 128, 0.9)";
            e.currentTarget.style.color = "#110d0c";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(23, 19, 17, 0.85)";
            e.currentTarget.style.color = "#ffffff";
          }}
        >
          <ChevronRightIcon />
        </button>

        {/* Pagination Dots */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", zIndex: 30 }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                height: "8px",
                width: idx === currentIndex ? "28px" : "8px",
                borderRadius: "9999px",
                backgroundColor: idx === currentIndex ? "#c5a880" : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                transition: "all 250ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const Component = CoverFlowCarousel;
export default CoverFlowCarousel;

