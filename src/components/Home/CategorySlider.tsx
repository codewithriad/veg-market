import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "All Types of Rice",
    slug: "rice",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: "Nuts & Seeds",
    slug: "nuts-seeds",
    image:
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    name: "Gourds & Melons",
    slug: "gourds-melons",
    image:
      "https://framerusercontent.com/images/HzEbaMjpqV2c9cHT34IFI24X2GU.jpg?height=1080&width=1920",
  },
  {
    id: "4",
    name: "Leafy Greens",
    slug: "leafy-greens",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "5",
    name: "Tubers & Roots",
    slug: "tubers-roots",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "6",
    name: "Nightshades",
    slug: "nightshades",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "7",
    name: "Pods & Raw Fruits",
    slug: "pods-fruits",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "8",
    name: "Lentils & Pulses",
    slug: "lentils-pulses",
    image:
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "9",
    name: "Native Fruits",
    slug: "native-fruits",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "10",
    name: "Spices & Herbs",
    slug: "spices-herbs",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
  },
];

export const CategorySlider: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    // Navigates to /search with category query parameter
    navigate(`/search?category=${encodeURIComponent(slug)}`);
  };

  return (
    <section className="py-6 px-4 max-w-[100rem] mx-auto relative">
      <div className="mb-4">
        <h2 className="text-2xl text-center font-medium text-gray-900 tracking-tight">
          Featured Categories
        </h2>

        <div className="flex gap-2">
          <button
            id="cat-prev"
            className="p-2 rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-emerald-600 hover:text-white transition-colors"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            id="cat-next"
            className="p-2 rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-emerald-600 hover:text-white transition-colors"
            aria-label="Next category"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={12}
        slidesPerView={3.2}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{ prevEl: "#cat-prev", nextEl: "#cat-next" }}
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
              onClick={() => handleCategoryClick(cat.slug)}
              className="w-full text-center group cursor-pointer focus:outline-none"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-emerald-600 shadow-sm group-hover:shadow-md transition-all duration-300 bg-gray-50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-gray-800 group-hover:text-emerald-700 truncate leading-tight">
                {cat.name}
              </p>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
