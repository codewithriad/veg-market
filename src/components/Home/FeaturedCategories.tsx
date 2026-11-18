import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { CATEGORIES } from "../../data/categories";

import "swiper/css";
import "swiper/css/navigation";

const FeaturedCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    navigate(`/products?category=${encodeURIComponent(slug)}`);
  };

  const handleViewAll = () => {
    navigate("/products");
  };

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <span className="mb-2 block text-sm font-semibold uppercase tracking-widest text-green-600">
              Explore Our Collection
            </span>

            <h2 className="text-3xl font-medium text-gray-900 sm:text-4xl">
              Shop By Category
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Find your favorite fresh products easily.
            </p>
          </div>

          <button
            type="button"
            onClick={handleViewAll}
            className="hidden shrink-0 text-sm font-bold text-emerald-700 transition hover:text-emerald-900 sm:block"
          >
            View All Products →
          </button>
        </div>

        {/* Category Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={12}
            slidesPerView={3.2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: "#cat-prev",
              nextEl: "#cat-next",
            }}
            breakpoints={{
              480: { slidesPerView: 4.2, spaceBetween: 12 },
              640: { slidesPerView: 5.2, spaceBetween: 14 },
              768: { slidesPerView: 6.2, spaceBetween: 16 },
              1024: { slidesPerView: 8.2, spaceBetween: 16 },
              1280: { slidesPerView: 10, spaceBetween: 16 },
            }}
            className="w-full"
          >
            {CATEGORIES.map((cat) => (
              <SwiperSlide key={cat.id}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(cat.slug)}
                  aria-label={`Shop ${cat.name}`}
                  className="group w-full cursor-pointer text-center focus:outline-none"
                >
                  <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-gray-100 bg-gray-50 shadow-sm transition-all duration-300 group-hover:border-emerald-600 group-hover:shadow-md sm:h-24 sm:w-24">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <p className="mt-3 truncate text-xs font-semibold leading-tight text-gray-800 transition-colors group-hover:text-emerald-700 sm:text-sm">
                    {cat.name}
                  </p>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button
            id="cat-prev"
            aria-label="Previous categories"
            type="button"
            className="absolute -left-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition hover:bg-emerald-600 hover:text-white sm:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            id="cat-next"
            aria-label="Next categories"
            type="button"
            className="absolute -right-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition hover:bg-emerald-600 hover:text-white sm:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="mt-6 w-full rounded-xl border border-emerald-100 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 sm:hidden"
        >
          View All Products →
        </button>
      </div>
    </section>
  );
};

export default FeaturedCategories;
