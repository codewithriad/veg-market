import { motion } from "framer-motion";

const DiscountBanner = () => {
  return (
    <section className="w-full overflow-hidden py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8"
      >
        <img
          src="/Banner/veg-banner.png"
          alt="Veg Market discount banner - Get 20% OFF"
          className="block h-auto w-full object-contain rounded-xl md:rounded-2xl"
        />
      </motion.div>
    </section>
  );
};

export default DiscountBanner;
