import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: "İletişim | Hobitat",
  description: "Hobitat ile iletişime geçin. Sorularınız, önerileriniz ve destek talepleriniz için bize ulaşın.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-stone-800 font-sans flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center overflow-hidden bg-gradient-to-br from-green-700 to-emerald-800">
        <div className="container mx-auto px-6 relative z-10 text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">İletişim</h1>
          <p className="text-xl text-white/90">Sorularınız için buradayız</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Sol: İletişim Bilgileri */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-green-900 mb-6">Bize Ulaşın</h2>
                <p className="text-stone-600 mb-8 leading-relaxed">
                  Sorularınız, önerileriniz veya destek talepleriniz için bizimle iletişime geçebilirsiniz. 
                  Müşteri hizmetlerimiz 7/24 hizmetinizdedir.
                </p>
              </div>

              <div className="space-y-6">
                {/* Adres */}
                <div className="flex gap-4 p-6 bg-green-50 rounded-2xl border border-green-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900 mb-2">Adres</h3>
                    <p className="text-stone-700 leading-relaxed">
                      Hobitat Sera Tesisleri<br />
                      Kemalpaşa Mah. 123. Sk.<br />
                      İzmir, Türkiye
                    </p>
                  </div>
                </div>

                {/* Telefon */}
                <div className="flex gap-4 p-6 bg-green-50 rounded-2xl border border-green-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900 mb-2">Telefon</h3>
                    <a href="tel:+905551234567" className="text-stone-700 hover:text-green-700 transition font-medium">
                      +90 (555) 123 45 67
                    </a>
                    <p className="text-sm text-stone-500 mt-1">7/24 Destek Hattı</p>
                  </div>
                </div>

                {/* E-posta */}
                <div className="flex gap-4 p-6 bg-green-50 rounded-2xl border border-green-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900 mb-2">E-posta</h3>
                    <a href="mailto:destek@hobitat.com" className="text-stone-700 hover:text-green-700 transition font-medium">
                      destek@hobitat.com
                    </a>
                    <p className="text-sm text-stone-500 mt-1">En geç 24 saat içinde yanıtlanır</p>
                  </div>
                </div>

                {/* Çalışma Saatleri */}
                <div className="flex gap-4 p-6 bg-green-50 rounded-2xl border border-green-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900 mb-2">Çalışma Saatleri</h3>
                    <p className="text-stone-700">
                      Pazartesi - Cuma: 09:00 - 18:00<br />
                      Cumartesi: 10:00 - 16:00<br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="mt-8 p-6 bg-green-600 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle size={24} />
                  <h3 className="font-bold text-lg">WhatsApp Destek</h3>
                </div>
                <p className="text-white/90 mb-4 text-sm">
                  Hızlı yanıt için WhatsApp üzerinden bize ulaşabilirsiniz.
                </p>
                <a
                  href="https://wa.me/905551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition"
                >
                  WhatsApp'tan Yaz
                </a>
              </div>
            </div>

            {/* Sağ: İletişim Formu */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-green-900 mb-6">Mesaj Gönderin</h2>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Harita Bölümü */}
      <section className="py-12 bg-stone-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-white rounded-2xl p-8 border border-stone-200">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Konumumuz</h3>
            <div className="w-full h-96 bg-stone-200 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.1234567890123!2d27.142826!3d38.423734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDI1JzI1LjQiTiAyN8KwMDgnMzQuMiJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
