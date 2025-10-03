
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import TrendingFrames from "@/components/TrendingFrames";
import BuyProcess from "@/components/BuyProcess";
import ServiceSections from "@/components/ServiceSections";
// import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import type { Product } from "@shared/woocommerce-types";

const Index = () => {
  // Prefetch all products on homepage to cache them in React Query
  useQuery<Product[]>({
    queryKey: ['/api/products'],
    retry: 2,
    retryDelay: 1000,
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <BuyProcess />
      <main>
        <ProductCategories />
        <TrendingFrames />
        <ServiceSections />
        {/* <Newsletter /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
