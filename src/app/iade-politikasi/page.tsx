import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import { RotateCcw, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: "İade Politikası | Hobitat",
  description: "Hobitat iade ve değişim politikası. Canlı ürün iade koşulları ve garantiler.",
};

export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-stone-800 font-sans flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center overflow-hidden bg-gradient-to-br from-green-700 to-emerald-800">
        <div className="container mx-auto px-6 relative z-10 text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">İade Politikası</h1>
          <p className="text-xl text-white/90">Müşteri memnuniyeti bizim önceliğimizdir</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Önemli Uyarı */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <AlertCircle className="text-yellow-600 shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-yellow-900 mb-2">Önemli Bilgi</h3>
                <p className="text-stone-700 leading-relaxed">
                  Fideler canlı ürünler olduğu için standart iade politikası geçerli değildir. Ancak hasarlı, 
                  yanlış ürün veya ölü fide gelmesi durumunda garantilerimiz devreye girer.
                </p>
              </div>
            </div>
          </div>

          {/* İade Koşulları */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-green-900 mb-6 flex items-center gap-3">
              <RotateCcw className="text-green-600" size={32} />
              İade ve Değişim Koşulları
            </h2>
            
            <div className="space-y-6">
              {/* Hasarlı Ürün */}
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <h3 className="text-xl font-bold text-green-900">Hasarlı Ürün</h3>
                </div>
                <p className="text-stone-700 leading-relaxed mb-3">
                  Fideleriniz kargo sırasında hasar görürse, teslimattan sonraki <strong>24 saat içinde</strong> 
                  fotoğraf ile birlikte bildirmeniz yeterlidir. Ücretsiz yeni fide gönderiyoruz.
                </p>
                <ul className="list-disc list-inside space-y-1 text-stone-600 ml-4">
                  <li>Fotoğraf çekin (hasar görünür olmalı)</li>
                  <li>destek@hobitat.com adresine e-posta gönderin</li>
                  <li>Veya WhatsApp hattımızdan (0555 123 45 67) bildirin</li>
                </ul>
              </div>

              {/* Yanlış Ürün */}
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <h3 className="text-xl font-bold text-green-900">Yanlış Ürün</h3>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Yanlış ürün gönderilmesi durumunda, <strong>24 saat içinde</strong> bildirirseniz doğru ürünü 
                  ücretsiz gönderiyoruz. Yanlış gönderilen ürünü geri göndermenize gerek yoktur.
                </p>
              </div>

              {/* Ölü Fide */}
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <h3 className="text-xl font-bold text-green-900">Ölü Fide Garantisi</h3>
                </div>
                <p className="text-stone-700 leading-relaxed mb-3">
                  Fideniz teslimattan sonraki <strong>7 gün içinde</strong> ölürse, ücretsiz yeni fide gönderiyoruz. 
                  Fotoğraf ile birlikte destek@hobitat.com adresine e-posta göndermeniz yeterlidir.
                </p>
                <p className="text-sm text-stone-600">
                  Not: Dikim sonrası bakım hatalarından kaynaklanan ölümler garanti kapsamında değildir.
                </p>
              </div>

              {/* İade Edilmeyen Durumlar */}
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <div className="flex items-center gap-3 mb-3">
                  <XCircle className="text-red-600" size={24} />
                  <h3 className="text-xl font-bold text-red-900">İade Edilmeyen Durumlar</h3>
                </div>
                <ul className="list-disc list-inside space-y-2 text-stone-700 ml-4">
                  <li>Dikim sonrası bakım hatalarından kaynaklanan ölümler</li>
                  <li>24 saatten sonra bildirilen hasarlar</li>
                  <li>Müşteri hatasından kaynaklanan yanlış siparişler</li>
                  <li>Fide beğenilmemesi (canlı ürün olduğu için)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* İade Süreci */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-green-900 mb-6 flex items-center gap-3">
              <Clock className="text-green-600" size={32} />
              İade Süreci
            </h2>
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-stone-700">
                  <strong>Bildirim:</strong> Sorunu 24 saat içinde fotoğraf ile birlikte bildirin
                </li>
                <li className="text-stone-700">
                  <strong>İnceleme:</strong> Müşteri hizmetlerimiz durumu inceler (en geç 24 saat)
                </li>
                <li className="text-stone-700">
                  <strong>Onay:</strong> Uygun görülürse yeni fide hazırlanır
                </li>
                <li className="text-stone-700">
                  <strong>Gönderim:</strong> Yeni fide 24 saat içinde kargoya verilir
                </li>
                <li className="text-stone-700">
                  <strong>Teslimat:</strong> Fide kapınıza ulaşır
                </li>
              </ol>
            </div>
          </div>

          {/* İletişim */}
          <div className="bg-green-50 rounded-2xl p-8 border border-green-100 text-center">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Sorularınız mı var?</h3>
            <p className="text-stone-700 mb-6">
              İade ve değişim konusunda sorularınız için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+905551234567"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition"
              >
                📞 0555 123 45 67
              </a>
              <a
                href="mailto:destek@hobitat.com"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition border-2 border-green-600"
              >
                ✉️ destek@hobitat.com
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

