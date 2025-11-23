import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import { Truck, Package, Clock, Shield, MapPin, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Kargo ve Teslimat | Hobitat",
  description: "Hobitat kargo ve teslimat bilgileri. Ücretsiz kargo şartları, teslimat süreleri ve paketleme detayları.",
};

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-stone-800 font-sans flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center overflow-hidden bg-gradient-to-br from-green-700 to-emerald-800">
        <div className="container mx-auto px-6 relative z-10 text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Kargo ve Teslimat</h1>
          <p className="text-xl text-white/90">Fideleriniz güvenle kapınıza gelir</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Ücretsiz Kargo */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-12 border border-green-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
                <Truck className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-green-900">Ücretsiz Kargo</h2>
                <p className="text-stone-600">150 TL ve üzeri alışverişlerde</p>
              </div>
            </div>
            <p className="text-stone-700 leading-relaxed">
              150 TL ve üzeri tüm siparişlerinizde ücretsiz kargo hizmeti sunuyoruz. 150 TL altındaki siparişlerde 
              kargo ücreti 25 TL'dir. Hızlı ve güvenli teslimat garantisi ile fidelerinizi kapınıza getiriyoruz.
            </p>
          </div>

          {/* Teslimat Süreleri */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-green-900 mb-6 flex items-center gap-3">
              <Clock className="text-green-600" size={32} />
              Teslimat Süreleri
            </h2>
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-green-600 mt-1 shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-stone-800 mb-1">Kargoya Verilme</h3>
                    <p className="text-stone-600">Siparişinizden sonra 24 saat içinde kargoya verilir.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-green-600 mt-1 shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-stone-800 mb-1">Teslimat Süresi</h3>
                    <p className="text-stone-600">
                      İstanbul, Ankara, İzmir: 1-2 iş günü<br />
                      Diğer şehirler: 2-3 iş günü<br />
                      Köy ve kasabalar: 3-5 iş günü
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-green-600 mt-1 shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-stone-800 mb-1">Hafta Sonu</h3>
                    <p className="text-stone-600">Hafta sonları kargo firmaları çalışmadığı için teslimat hafta içi yapılır.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Paketleme */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-green-900 mb-6 flex items-center gap-3">
              <Package className="text-green-600" size={32} />
              Özel Paketleme
            </h2>
            <div className="prose prose-lg max-w-none text-stone-700 leading-relaxed space-y-4">
              <p>
                Fidelerimiz özel koruyucu ambalajlarla paketlenir. Her fide kök bölgesi nemli tutulur ve hasara karşı korunur. 
                Ambalajlarımız sayesinde fideleriniz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Kırılmadan size ulaşır</li>
                <li>Kurumadan taze kalır</li>
                <li>Zarar görmeden güvenle teslim edilir</li>
                <li>Özel kök koruma sistemi ile canlılığını korur</li>
              </ul>
            </div>
          </div>

          {/* Kargo Takibi */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-green-900 mb-6 flex items-center gap-3">
              <MapPin className="text-green-600" size={32} />
              Kargo Takibi
            </h2>
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <p className="text-stone-700 mb-4 leading-relaxed">
                Siparişiniz kargoya verildikten sonra, kargo takip numaranız e-posta ve SMS ile size iletilecektir. 
                Bu numara ile kargo firmasının web sitesinden siparişinizin konumunu takip edebilirsiniz.
              </p>
              <p className="text-stone-600 text-sm">
                Kargo takip numaranızı almadıysanız, lütfen müşteri hizmetlerimizle iletişime geçin.
              </p>
            </div>
          </div>

          {/* Garanti */}
          <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
                <Shield className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-900">Hasarsız Teslimat Garantisi</h2>
              </div>
            </div>
            <p className="text-stone-700 leading-relaxed">
              Fideleriniz hasarlı veya kurumuş şekilde gelirse, 24 saat içinde bildirirseniz ücretsiz yeni fide gönderiyoruz. 
              Özel ambalajlarımız ve dikkatli paketleme yöntemlerimiz sayesinde %99.5 başarı oranına sahibiz.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

