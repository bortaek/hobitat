import Header from '../components/layout/Header';
import HeroSection from '../components/home/HeroSection';
import ValueProps from '../components/home/ValueProps';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-stone-800 font-sans flex flex-col">
      <Header />
      
      <HeroSection />
      
      {/* 1. Önce Ürünleri Gösteriyoruz (Vitrin) */}
      <FeaturedProducts />
      
      {/* 2. Sonra Güven Kutucuklarını Gösteriyoruz */}
      <ValueProps />
      
      <Footer />
    </main>
  );
}