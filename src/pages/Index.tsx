
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import TrendingFrames from "@/components/TrendingFrames";
import BuyProcess from "@/components/BuyProcess";
import ServiceSections from "@/components/ServiceSections";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <main>
        <ProductCategories />
        <TrendingFrames />
        <BuyProcess />
        <ServiceSections />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
