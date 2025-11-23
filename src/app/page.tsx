import dynamic from 'next/dynamic';
import Header from '../components/layout/Header';
import HeroSection from '../components/home/HeroSection';
import Footer from '../components/layout/Footer';

// Lazy load animasyonlu component'ler (JavaScript bundle'ı küçültür)
const ScrollAnimation = dynamic(() => import('../components/ui/ScrollAnimation'), {
  ssr: true,
});

const Announcements = dynamic(() => import('../components/home/Announcements'), {
  ssr: true,
  loading: () => <div className="h-32 bg-green-50 animate-pulse" />,
});

const FeaturedProducts = dynamic(() => import('../components/home/FeaturedProducts'), {
  ssr: true,
});

const WhyChooseUs = dynamic(() => import('../components/home/WhyChooseUs'), {
  ssr: true,
});

const ProductionProcess = dynamic(() => import('../components/home/ProductionProcess'), {
  ssr: true,
});

const FeaturedBlogs = dynamic(() => import('../components/home/FeaturedBlogs'), {
  ssr: true,
});

const ValueProps = dynamic(() => import('../components/home/ValueProps'), {
  ssr: true,
});

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
