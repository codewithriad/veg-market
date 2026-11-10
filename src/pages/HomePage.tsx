import Footer from "../components/Footer";
import { CategorySlider } from "../components/Home/CategorySlider";
import DiscountBanner from "../components/Home/DiscoutnBanner";
import HeroSection from "../components/Home/HeroSection";
import Testimonials from "../components/Home/Testimonials";
import TopSellingProducts from "../components/Home/TopSellingProducts";
import TrustFeatures from "../components/Home/TrustFeatures";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TrustFeatures />
      <CategorySlider />

      <TopSellingProducts />

      <DiscountBanner />

      <Testimonials />

      <Footer />
    </>
  );
};

export default HomePage;
