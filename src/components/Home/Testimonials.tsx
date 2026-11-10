import { motion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  date: string;
  rating: number;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Customer Name",
    date: "Review Date",
    rating: 5,
    review:
      "Add an actual Google review here about the freshness and quality of the vegetables.",
  },
  {
    id: 2,
    name: "Customer Name",
    date: "Review Date",
    rating: 5,
    review:
      "Add an actual customer review about product quality, packaging, and delivery.",
  },
  {
    id: 3,
    name: "Customer Name",
    date: "Review Date",
    rating: 5,
    review:
      "Add an actual Google review describing the customer's shopping experience.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-green-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-lime-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-bold tracking-widest text-green-700">
            CUSTOMER REVIEWS
          </span>

          <h2 className="mt-5 text-3xl font-medium tracking-tight text-[#163D26] sm:text-4xl lg:text-5xl">
            Loved by Our <span className="text-green-600">Customers</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#607568] sm:text-base">
            Real experiences from customers who choose fresh, natural, and
            quality products from Veg Market.
          </p>

          {/* Google Rating Label */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#DCE8D9] bg-white px-5 py-3 shadow-sm">
            <FaGoogle className="text-xl text-[#4285F4]" />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={15}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#163D26]">
              Customer feedback on Google
            </span>
          </div>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              className="group relative flex h-full flex-col rounded-2xl border border-[#DCE8D9] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5"
            >
              {/* Quote Icon */}
              <div className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-600 transition-colors duration-300 group-hover:bg-green-100">
                <Quote size={21} />
              </div>

              {/* Stars */}
              <div className="mb-5 flex items-center gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={17}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="flex-1 text-sm leading-7 text-[#607568]">
                "{item.review}"
              </p>

              {/* Customer Information */}
              <div className="mt-7 flex items-center justify-between border-t border-[#E8F0E5] pt-5">
                <div>
                  <h3 className="text-sm font-bold text-[#163D26]">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#91A397]">{item.date}</p>
                </div>

                <div
                  className="flex items-center gap-1.5 rounded-full bg-[#F3F8F0] px-3 py-2"
                  title="Google review"
                >
                  <FaGoogle className="text-sm text-[#4285F4]" />
                  <span className="text-[11px] font-semibold text-[#607568]">
                    Google
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View More Reviews */}
        <div className="mt-12 text-center">
          <a
            href="YOUR_GOOGLE_REVIEWS_URL"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-green-600 bg-green-700 px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_12px_rgba(34,197,94,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]"
          >
            Read More Reviews
            <ExternalLink
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
