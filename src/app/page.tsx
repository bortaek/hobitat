import Header from '../components/layout/Header';
import HeroSection from '../components/home/HeroSection';
import ValueProps from '../components/home/ValueProps';
import FeaturedProducts from '../components/home/FeaturedProducts';
import FeaturedBlogs from '../components/home/FeaturedBlogs';
import ProductionProcess from '../components/home/ProductionProcess';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Announcements from '../components/home/Announcements';
import Footer from '../components/layout/Footer';
import ScrollAnimation from '../components/ui/ScrollAnimation';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-stone-800 font-sans flex flex-col">
      <Header />
      
      <HeroSection />
      
      {/* Duyurular ve Kampanyalar - Hepsiburada tarzı */}
      <ScrollAnimation>
        <Announcements />
      </ScrollAnimation>
      
      {/* 1. Önce Ürünleri Gösteriyoruz (Vitrin) - Alışveriş odaklı */}
      <ScrollAnimation delay={0.1}>
        <FeaturedProducts />
      </ScrollAnimation>
      
      {/* 2. Neden Hobitat? - Güven ve kalite vurgusu */}
      <ScrollAnimation delay={0.2}>
        <WhyChooseUs />
      </ScrollAnimation>
      
      {/* 3. Üretim Sürecimiz - Profesyonel görünüm */}
      <ScrollAnimation delay={0.1}>
        <ProductionProcess />
      </ScrollAnimation>
      
      {/* 4. Blog yazıları - Sitede tutmak ve SEO için, alışverişi engellemez */}
      <ScrollAnimation delay={0.2}>
        <FeaturedBlogs />
      </ScrollAnimation>
      
      {/* 5. Güven Kutucukları */}
      <ScrollAnimation delay={0.1}>
        <ValueProps />
      </ScrollAnimation>
      
      <Footer />
    </main>
  );
}
