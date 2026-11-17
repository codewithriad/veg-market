import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Healthy Foods",
    subtitle:
      "Eat fresh, live healthy. Discover nutritious food for your family.",
    image: "/hero/healthy-foods.png",
    alt: "Colorful selection of fresh fruits and vegetables",
  },
  {
    title: "Fresh Organic",
    subtitle:
      "Naturally grown goodness, carefully selected for your everyday needs.",
    image: "/hero/fresh-organic.png",
    alt: "Fresh organic vegetables displayed at a market",
  },
  {
    title: "Fresh Vegetables",
    subtitle: "Bring home farm-fresh vegetables and enjoy the taste of nature.",
    image: "/hero/fresh-vegetables.png",
    alt: "Fresh vegetables displayed at a local market",
  },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  // Automatically change slides every 6 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative isolate h-[80vh] min-h-135 max-h-250 w-full overflow-hidden bg-green-950">
      {/* Background image slider */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.img
            src={activeSlide.image}
            alt={activeSlide.alt}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.16 }}
            transition={{
              duration: 6.8,
              ease: "linear",
            }}
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -45 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm sm:text-sm">
                Freshness You Can Trust
              </span>

              <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {activeSlide.title}
              </h1>

              <p className="mb-8 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                {activeSlide.subtitle}
              </p>

              <a
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-green-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-950/30 transition-all duration-300 hover:bg-green-500 hover:shadow-green-500/30 sm:text-base"
              >
                Shop Now
                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Previous / Next controls */}
      <div className="absolute bottom-8 right-5 z-20 flex items-center gap-3 sm:right-10">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-green-800"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-green-800"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-12 left-5 z-20 flex items-center gap-2 sm:left-12">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to ${slide.title} slide`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              activeIndex === index
                ? "w-10 bg-green-400"
                : "w-5 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
