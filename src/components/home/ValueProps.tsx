import React from 'react';
import { Truck, ShieldCheck, Sun } from 'lucide-react';

export default function ValueProps() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          
          {/* KUTU 1 */}
          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 hover:shadow-lg transition duration-300 group">
            <div className="w-16 h-16 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-900">Aşılanmış Güçlü Kökler</h3>
            <p className="text-stone-600">Klasik fidelere göre 3 kat daha verimli ve hastalıklara dirençli özel üretim.</p>
          </div>

          {/* KUTU 2 */}
          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 hover:shadow-lg transition duration-300 group">
            <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Truck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-900">Hasarsız Kargo Garantisi</h3>
            <p className="text-stone-600">Özel koruyucu ambalajlarımızla fideniz kırılmadan, kurumadan kapınıza gelir.</p>
          </div>

          {/* KUTU 3 */}
          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 hover:shadow-lg transition duration-300 group">
            <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Sun size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-900">7/24 Ziraat Desteği</h3>
            <p className="text-stone-600">Bitkiniz büyürken aklınıza takılan her soruda uzmanlarımız yanınızda.</p>
          </div>

        </div>
      </div>
    </section>
  );
}