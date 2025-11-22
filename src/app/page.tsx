import Header from '../components/layout/Header';
import HeroSection from '../components/home/HeroSection';
import ValueProps from '../components/home/ValueProps';
import FeaturedProducts from '../components/home/FeaturedProducts'; // <--- YENİ OYUNCU
export const dynamic = 'force-dynamic'; // <--- BU SATIRI EKLE
export const revalidate = 0;            // <--- BUNU DA EKLE


// ... diğer importlar aynı kalsın
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-stone-800 font-sans">
      <Header />
      <HeroSection />
      <ValueProps />
      <FeaturedProducts /> {/* <--- SAHNEYE ÇIKTI */}
    </main>
  );
}