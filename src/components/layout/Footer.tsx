import React from 'react';
import { Sprout, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16 font-sans border-t border-stone-800 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Marka & Slogan */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-green-700 text-white p-2 rounded-lg">
                <Sprout size={20} />
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                Hobitat
              </span>
            </div>
            <p className="mb-6 leading-relaxed text-sm">
              Doğayı evinize getiriyoruz. Sertifikalı, aşılanmış ve garantili fidelerle kendi bahçenizi kurun.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-green-500 transition hover:scale-110"><Instagram size={20} /></a>
              <a href="#" className="hover:text-green-500 transition hover:scale-110"><Facebook size={20} /></a>
              <a href="#" className="hover:text-green-500 transition hover:scale-110"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Kurumsal</h4>
            <ul className="space-y-3 text-sm">
              {/* GÜNCELLENEN LİNKLER BURADA */}
              <li><Link href="/hakkimizda" className="hover:text-green-500 transition">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="hover:text-green-500 transition">İletişim</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition">Kargo ve Teslimat</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition">İade Politikası</Link></li>
            </ul>
          </div>

          {/* Ürün Kategorileri */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Kategoriler</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/magaza" className="hover:text-green-500 transition">Sebze Fideleri</Link></li>
              <li><Link href="/magaza" className="hover:text-green-500 transition">Meyve Fideleri</Link></li>
              <li><Link href="/magaza" className="hover:text-green-500 transition">Süs Bitkileri</Link></li>
              <li><Link href="/magaza" className="hover:text-green-500 transition">Toprak & Gübre</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Bize Ulaşın</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 text-green-600 shrink-0" size={18} />
                <span>Hobitat Sera Tesisleri<br/>Kemalpaşa Mah. 123. Sk.<br/>İzmir, Türkiye</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-green-600 shrink-0" size={18} />
                <span>+90 (555) 123 45 67</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-green-600 shrink-0" size={18} />
                <span>destek@hobitat.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Çizgi & Telif */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; 2025 Hobitat Bitki Dünyası. Tüm hakları saklıdır.</p>
          <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 transition">
             {/* Temsili Ödeme İkonları */}
             <div className="bg-white px-2 py-1 rounded text-stone-900 font-bold">VISA</div>
             <div className="bg-white px-2 py-1 rounded text-stone-900 font-bold">MasterCard</div>
             <div className="bg-white px-2 py-1 rounded text-stone-900 font-bold">Iyzico</div>
          </div>
        </div>
      </div>
    </footer>
  );
}