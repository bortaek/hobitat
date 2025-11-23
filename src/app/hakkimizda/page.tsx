import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import { Sprout, Award, Users, Heart, Target, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Hakkımızda | Hobitat",
  description: "Hobitat'ın hikayesi, misyonu ve değerleri. Organik ve sertifikalı fidelerle doğayı evinize getiriyoruz.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-stone-800 font-sans flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center overflow-hidden bg-gradient-to-br from-green-700 to-emerald-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2070&q=80"
            alt="Bahçe"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Hakkımızda</h1>
          <p className="text-xl text-white/90 max-w-2xl">Doğayı evinize getiren, güvenilir ve kaliteli fide çözümü</p>
        </div>
      </section>

      {/* Hikayemiz */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-green-900 mb-4">Hikayemiz</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto"></div>
          </div>
          
          <div className="prose prose-lg max-w-none text-stone-700 leading-relaxed space-y-6">
            <p>
              Hobitat, 2020 yılında İzmir'de kuruldu. Amacımız, şehir hayatında yaşayan insanların balkonlarını ve bahçelerini 
              yeşil cennetlere dönüştürmek. Organik tarım ve sürdürülebilir yaşam prensiplerini benimseyerek, herkesin 
              kendi sebze ve meyvesini yetiştirebilmesi için kaliteli fideler sunuyoruz.
            </p>
            <p>
              Modern aşılama teknikleri kullanarak ürettiğimiz fideler, klasik fidelere göre 3 kat daha fazla verim sağlar. 
              Tüm fidelerimiz organik sertifikalıdır ve kimyasal gübre veya ilaç kullanılmadan yetiştirilir.
            </p>
            <p>
              Bugün, Türkiye genelinde 10.000'den fazla mutlu müşteriye hizmet veriyoruz. Her gün daha fazla insanın 
              doğal yaşamla buluşmasına vesile olmak, en büyük motivasyonumuz.
            </p>
          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-green-900 mb-4">Değerlerimiz</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Hobitat olarak benimsediğimiz temel değerler
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-3">Doğa Sevgisi</h3>
              <p className="text-stone-600">
                Doğaya saygılı, sürdürülebilir tarım yöntemleriyle üretim yapıyoruz. Gelecek nesillere daha yeşil bir dünya bırakmak için çalışıyoruz.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-3">Kalite</h3>
              <p className="text-stone-600">
                Her fide, uzman ekibimiz tarafından özenle seçilir ve kalite kontrolünden geçer. Sadece en sağlıklı fideler size ulaşır.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-3">Müşteri Memnuniyeti</h3>
              <p className="text-stone-600">
                Müşterilerimizin mutluluğu bizim önceliğimizdir. 7/24 destek hizmetimizle her zaman yanınızdayız.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misyon ve Vizyon */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <Target className="text-green-600" size={32} />
                <h3 className="text-2xl font-bold text-green-900">Misyonumuz</h3>
              </div>
              <p className="text-stone-700 leading-relaxed">
                Şehir hayatında yaşayan herkesin, balkonunda veya bahçesinde kendi sebze ve meyvesini yetiştirebilmesini sağlamak. 
                Organik, sertifikalı ve garantili fidelerle doğal yaşamı evlere taşımak.
              </p>
            </div>

            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="text-emerald-600" size={32} />
                <h3 className="text-2xl font-bold text-emerald-900">Vizyonumuz</h3>
              </div>
              <p className="text-stone-700 leading-relaxed">
                Türkiye'nin en güvenilir ve kaliteli fide üreticisi olmak. Her evde bir bahçe, her balkonda yeşil bir dünya yaratmak. 
                Sürdürülebilir tarım ve organik yaşam kültürünü yaygınlaştırmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-700 mb-2">10K+</div>
              <div className="text-stone-600 font-medium">Mutlu Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-700 mb-2">50+</div>
              <div className="text-stone-600 font-medium">Fide Çeşidi</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-700 mb-2">98%</div>
              <div className="text-stone-600 font-medium">Başarı Oranı</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-700 mb-2">24/7</div>
              <div className="text-stone-600 font-medium">Destek Hizmeti</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
