import Footer from "../components/Footer";
import FeaturedCategories from "../components/Home/FeaturedCategories";
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
      <FeaturedCategories />

      <TopSellingProducts />

      <DiscountBanner />

      <Testimonials />

      <Footer />
    </>
  );
};

export default HomePage;
