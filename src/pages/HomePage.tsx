import { CategorySlider } from "../components/Home/CategorySlider";
import DiscountBanner from "../components/Home/DiscoutnBanner";
import HeroSection from "../components/Home/HeroSection";
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
    </>
  );
};

export default HomePage;
