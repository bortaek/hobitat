import Header from '../components/layout/Header';
import HeroSection from '../components/home/HeroSection';
import ValueProps from '../components/home/ValueProps';
import FeaturedProducts from '../components/home/FeaturedProducts';
import FeaturedBlogs from '../components/home/FeaturedBlogs';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-stone-800 font-sans flex flex-col">
      <Header />
      
      <HeroSection />
      
      {/* 1. Önce Ürünleri Gösteriyoruz (Vitrin) - Alışveriş odaklı */}
      <FeaturedProducts />
      
      {/* 2. Blog yazıları - Sitede tutmak ve SEO için, alışverişi engellemez */}
      <FeaturedBlogs />
      
      {/* 3. Güven Kutucukları */}
      <ValueProps />
      
      <Footer />
    </main>
  );
}