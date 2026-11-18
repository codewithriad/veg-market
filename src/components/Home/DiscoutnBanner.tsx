import { motion } from "framer-motion";
import { ArrowRight, Leaf, Truck, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const DiscountBanner = () => {
  return (
    <section className="relative w-full overflow-hidden py-8 sm:py-10">
      {/* Full-width Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Banner/veg-background.png')",
        }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#064A19] via-[#064A19]/90 to-transparent" />

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8"
      >
        <div className="relative flex min-h-107.5 items-center py-10 sm:min-h-120 lg:py-16">
          {/* LEFT CONTENT */}
          <div className="max-w-2xl">
            {/* Brand Logo */}
            <div className="mb-8 flex items-center gap-3">
              <div>
                <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
                  Veg<span className="text-lime-400">Market</span>
                </h3>
                <p className="text-xs tracking-[0.2em] text-white/90">
                  Fresh • Healthy • Local
                </p>
              </div>
            </div>

            {/* Discount Text */}
            <p className="text-3xl font-black italic text-white sm:text-5xl lg:text-6xl">
              Our Veg Market
            </p>

            <h2 className="mt-2 flex flex-wrap gap-3 text-6xl font-black leading-none sm:text-7xl lg:text-8xl">
              <span className="text-yellow-300">20%</span>
              <span className="text-white">OFF</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm font-medium leading-relaxed text-white/90 sm:text-lg lg:text-xl">
              Enjoy farm-fresh vegetables at amazing prices. Freshness, quality
              and savings delivered to your doorstep.
            </p>

            {/* CTA + Features */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-yellow-300 px-7 py-4 font-extrabold text-green-950 shadow-lg transition hover:-translate-y-1 hover:bg-yellow-200"
              >
                Shop Now
                <ArrowRight
                  size={22}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <div className="flex flex-wrap items-center gap-5 text-white">
                <div className="flex items-center gap-2">
                  <Leaf size={32} />
                  <span className="text-xs font-semibold sm:text-sm">
                    100%
                    <br />
                    Natural
                  </span>
                </div>

                <div className="hidden h-12 w-px bg-white/40 sm:block" />

                <div className="flex items-center gap-2">
                  <Truck size={34} />
                  <span className="text-xs font-semibold sm:text-sm">
                    Fast
                    <br />
                    Delivery
                  </span>
                </div>

                <div className="hidden h-12 w-px bg-white/40 sm:block" />

                <div className="flex items-center gap-2">
                  <ShieldCheck size={34} />
                  <span className="text-xs font-semibold sm:text-sm">
                    Trusted
                    <br />
                    Quality
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DiscountBanner;
