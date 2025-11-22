import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] font-sans flex flex-col">
      <Header />
      
      <div className="container mx-auto px-6 py-16 flex-grow">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
          
          {/* Üst Görsel */}
          <div className="relative h-64 md:h-80 bg-green-800">
             <Image 
               src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070"
               alt="Hobitat Hikayesi"
               fill
               className="object-cover opacity-80"
             />
             <div className="absolute inset-0 flex items-center justify-center">
               <h1 className="text-4xl md:text-5xl font-serif font-bold text-white shadow-black drop-shadow-lg">Hikayemiz</h1>
             </div>
          </div>

          <div className="p-8 md:p-12 space-y-6 text-stone-600 leading-relaxed text-lg">
            <p>
              <span className="font-bold text-green-700 text-2xl font-serif">Hobitat,</span> 2024 yılında doğaya özlem duyan şehir insanlarını toprakla buluşturmak amacıyla İzmir'de kuruldu.
            </p>
            <p>
              Beton binaların arasında sıkışıp kaldığımız bu çağda, bir saksı domatesin büyümesini izlemenin veya kendi yetiştirdiğin fesleğeni salatana koymanın verdiği hazzı herkese yaşatmak istiyoruz.
            </p>
            
            <h3 className="text-2xl font-bold text-stone-800 mt-8">Misyonumuz</h3>
            <p>
              Sadece fide satmak değil; balkonları, terasları ve salonları yaşayan birer ekosisteme dönüştürmek. Aşılanmış, hastalıklara dirençli ve yüksek verimli fidelerimizle, tarım bilgisi olmayan birinin bile başarıyla ürün almasını sağlıyoruz.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10 text-center">
              <div className="p-6 bg-stone-50 rounded-2xl">
                <div className="text-3xl mb-2">🌱</div>
                <div className="font-bold text-stone-800">Doğal Üretim</div>
              </div>
              <div className="p-6 bg-stone-50 rounded-2xl">
                <div className="text-3xl mb-2">🚚</div>
                <div className="font-bold text-stone-800">Güvenli Kargo</div>
              </div>
              <div className="p-6 bg-stone-50 rounded-2xl">
                <div className="text-3xl mb-2">💚</div>
                <div className="font-bold text-stone-800">%100 Müşteri Mutluluğu</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}