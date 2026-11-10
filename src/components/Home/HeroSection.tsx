import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    title: "Fresh Vegetables",
    subtitle: "Naturally Fresh, Always Healthy",
    description: "Bring farm-fresh goodness to your kitchen every day.",
    link: "/collections/vegetables",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    title: "Healthy Food Choices",
    subtitle: "Eat Fresh, Live Better",
    description: "Discover delicious and nutritious food for your family.",
    link: "/collections/food",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    title: "Fresh & Organic",
    subtitle: "Good Food, Good Life",
    description: "Enjoy colorful salads made with fresh ingredients.",
    link: "/collections/salad",
  },
];

const HeroSection = () => {
  return (
    <section className="bg-white py-6">
      <div className="mx-auto max-w-[100rem] px-4">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Main Slider */}
          <div className="relative lg:col-span-8">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              slidesPerView={1}
              loop={true}
              speed={800}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: ".hero-prev",
                nextEl: ".hero-next",
              }}
              pagination={{
                clickable: true,
                el: ".hero-pagination",
              }}
              className="hero-swiper overflow-hidden rounded-2xl"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <a
                    href={slide.link}
                    className="group relative block aspect-[2.1/1] overflow-hidden bg-gray-100"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center px-6 text-white sm:px-10 lg:px-12">
                      <span className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-green-300 sm:text-sm">
                        {slide.subtitle}
                      </span>

                      <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                        {slide.title}
                      </h2>

                      <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/90 sm:text-base">
                        {slide.description}
                      </p>

                      <span className="mt-6 w-fit rounded-full bg-green-600 px-7 py-3 text-sm font-semibold transition-colors hover:bg-green-700">
                        Shop Now
                      </span>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Previous Button */}
            <button
              type="button"
              aria-label="Previous slide"
              className="hero-prev absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg transition hover:bg-green-600 hover:text-white"
            >
              &#8592;
            </button>

            {/* Next Button */}
            <button
              type="button"
              aria-label="Next slide"
              className="hero-next absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg transition hover:bg-green-600 hover:text-white"
            >
              &#8594;
            </button>

            {/* Pagination */}
            <div className="hero-pagination absolute bottom-4 left-0 z-10 flex w-full justify-center gap-2" />
          </div>

          {/* Side Promotional Banner */}
          <div className="hidden lg:col-span-4 lg:block">
            <a
              href="/collections/organic-honey"
              className="group relative block h-full min-h-[220px] overflow-hidden rounded-2xl bg-gray-100"
            >
              <img
                src="https://cdn.ghorerbazar.com/banner/ZwGbr1787805653-500x410.png"
                alt="Organic food promotional banner"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
