"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Fideler ne zaman teslim edilir?",
    answer: "Fideleriniz siparişinizden sonra 24 saat içinde kargoya verilir. Kargo süresi bölgenize göre 1-3 iş günü arasında değişmektedir. Özel koruyucu ambalajlarımız sayesinde fideleriniz taze ve canlı şekilde kapınıza ulaşır.",
    category: "Kargo ve Teslimat"
  },
  {
    id: 2,
    question: "Fideler nasıl paketlenir?",
    answer: "Fidelerimiz özel koruyucu ambalajlarla paketlenir. Her fide kök bölgesi nemli tutulur ve hasara karşı korunur. Ambalajlarımız sayesinde fideleriniz kırılmadan, kurumadan ve zarar görmeden size ulaşır.",
    category: "Kargo ve Teslimat"
  },
  {
    id: 3,
    question: "Ücretsiz kargo şartı nedir?",
    answer: "150 TL ve üzeri alışverişlerde ücretsiz kargo hizmeti sunuyoruz. 150 TL altındaki siparişlerde kargo ücreti 25 TL'dir. Hızlı ve güvenli teslimat garantisi ile fidelerinizi kapınıza getiriyoruz.",
    category: "Kargo ve Teslimat"
  },
  {
    id: 4,
    question: "Fideleri nasıl dikmeliyim?",
    answer: "Fidelerinizi aldıktan sonra mümkün olan en kısa sürede dikmenizi öneriyoruz. Önce toprağı hazırlayın, sonra fidenin köklerini dikkatlice yerleştirin ve toprakla örtün. İlk birkaç gün düzenli sulama yapın. Detaylı dikim talimatları her ürünle birlikte gönderilir.",
    category: "Dikim ve Bakım"
  },
  {
    id: 5,
    question: "Fideler ne kadar sürede meyve verir?",
    answer: "Fide türüne göre değişmekle birlikte, domates ve biber fideleri genellikle 60-90 gün içinde meyve vermeye başlar. Salatalık ve kabak gibi hızlı büyüyen fideler 40-60 gün içinde hasat edilebilir. Her ürün için tahmini hasat süresi ürün sayfasında belirtilmiştir.",
    category: "Dikim ve Bakım"
  },
  {
    id: 6,
    question: "Balkonda fide yetiştirebilir miyim?",
    answer: "Evet! Tüm fidelerimiz balkon ve teras yetiştiriciliğine uygundur. Saksıda yetiştirme için özel olarak seçilmiş fidelerimiz, küçük alanlarda bile yüksek verim sağlar. Balkon bahçeciliği için özel rehberlerimiz blog bölümümüzde mevcuttur.",
    category: "Dikim ve Bakım"
  },
  {
    id: 7,
    question: "Aşılı fide ne demek?",
    answer: "Aşılı fideler, iki farklı bitkinin birleştirilmesiyle oluşturulan özel üretim fidelerdir. Daha güçlü kök yapısına sahiptir, hastalıklara karşı daha dirençlidir ve klasik fidelere göre 3 kat daha fazla verim sağlar. Aşılı fideler daha erken hasat verir ve daha uzun süre ürün verir.",
    category: "Ürün Bilgisi"
  },
  {
    id: 8,
    question: "Organik sertifika var mı?",
    answer: "Evet, tüm fidelerimiz organik sertifikalıdır. Kimyasal gübre ve ilaç kullanılmadan, doğal yöntemlerle yetiştirilir. Sertifikalarımız ürünlerle birlikte gönderilir ve web sitemizden de görüntülenebilir.",
    category: "Ürün Bilgisi"
  },
  {
    id: 9,
    question: "Fide öldüyse ne yapmalıyım?",
    answer: "Fideniz teslimattan sonraki 7 gün içinde ölürse, ücretsiz yeni fide gönderiyoruz. Fotoğraf ile birlikte destek@hobitat.com adresine e-posta göndermeniz yeterlidir. Müşteri memnuniyeti bizim önceliğimizdir.",
    category: "Garanti ve İade"
  },
  {
    id: 10,
    question: "İade ve değişim yapabilir miyim?",
    answer: "Canlı ürün olduğu için standart iade politikamız geçerli değildir. Ancak fideleriniz hasarlı veya yanlış ürün gelirse, 24 saat içinde bildirirseniz ücretsiz değişim yapıyoruz. Sorun yaşamanız durumunda müşteri hizmetlerimizle iletişime geçebilirsiniz.",
    category: "Garanti ve İade"
  },
  {
    id: 11,
    question: "Ziraat danışmanlığı hizmeti var mı?",
    answer: "Evet! 7/24 ziraat danışmanlığı hizmetimiz mevcuttur. Fide dikiminden hasada kadar her aşamada yanınızdayız. WhatsApp hattımızdan (0555 123 45 67) veya e-posta ile (destek@hobitat.com) sorularınızı iletebilirsiniz. Uzman ekibimiz en kısa sürede size yardımcı olur.",
    category: "Destek"
  },
  {
    id: 12,
    question: "Hangi aylarda fide dikilir?",
    answer: "Fide dikimi için en uygun aylar Mart, Nisan ve Mayıs aylarıdır. Ancak sera veya kapalı alan koşullarında yıl boyunca dikim yapılabilir. Her fide türü için önerilen dikim zamanı ürün sayfasında belirtilmiştir. İlkbahar ve yaz ayları açık alan dikimi için idealdir.",
    category: "Dikim ve Bakım"
  },
  {
    id: 13,
    question: "Fidelerin fiyatları neden farklı?",
    answer: "Fiyat farklılıkları fide türüne, aşılama durumuna ve üretim zorluğuna bağlıdır. Aşılı fideler daha yüksek teknoloji gerektirdiği için biraz daha pahalıdır ancak çok daha yüksek verim sağlar. Standart fidelerimiz ise uygun fiyatlı ve kaliteli seçenekler sunar.",
    category: "Fiyatlandırma"
  },
  {
    id: 14,
    question: "Toplu sipariş indirimi var mı?",
    answer: "Evet! 50 adet ve üzeri toplu siparişlerde özel indirimler sunuyoruz. Toptan satış için bizimle iletişime geçebilirsiniz. Kurumsal müşterilerimiz için özel fiyatlandırma ve kargo seçenekleri mevcuttur.",
    category: "Fiyatlandırma"
  },
  {
    id: 15,
    question: "Fideler hangi bölgelerde yetişir?",
    answer: "Fidelerimiz Türkiye'nin tüm bölgelerinde yetiştirilebilir. Ancak bazı türler belirli iklim koşullarına daha uygundur. Ürün sayfalarında her fide için uygun bölge bilgisi bulunmaktadır. Şüpheniz varsa ziraat danışmanlarımıza danışabilirsiniz.",
    category: "Dikim ve Bakım"
  }
];

const categories = ["Tümü", "Kargo ve Teslimat", "Dikim ve Bakım", "Ürün Bilgisi", "Garanti ve İade", "Destek", "Fiyatlandırma"];

interface FAQProps {
  showAll?: boolean;
}

export default function FAQ({ showAll = false }: FAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  let filteredFAQs = selectedCategory === "Tümü" 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  // Ana sayfada sadece ilk 5 soruyu göster
  if (!showAll) {
    filteredFAQs = filteredFAQs.slice(0, 5);
  }

  // Ana sayfada ilk 2 soruyu otomatik aç
  useEffect(() => {
    if (!showAll && filteredFAQs.length >= 2) {
      const firstTwoIds = [filteredFAQs[0].id, filteredFAQs[1].id];
      setOpenItems(firstTwoIds);
    } else if (showAll) {
      // Tüm sayfada hiçbir soru otomatik açık olmasın
      setOpenItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll, selectedCategory]);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50 dark:from-stone-950 dark:to-stone-900 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-green-900 dark:text-green-400 mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz
          </p>
        </motion.div>

        {/* Kategori Filtreleri */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-green-50 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Listesi */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-green-50/50 dark:hover:bg-stone-800/50 transition-colors"
                aria-expanded={openItems.includes(faq.id)}
              >
                <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 flex-1">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.includes(faq.id) ? (
                    <ChevronUp size={24} className="text-green-600 dark:text-green-400" />
                  ) : (
                    <ChevronDown size={24} className="text-stone-400" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openItems.includes(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-stone-800">
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                        {faq.answer}
                      </p>
                      <span className="inline-block mt-3 text-xs text-stone-400 bg-stone-50 dark:bg-stone-800 px-3 py-1 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Tümünü Gör Butonu - Sadece ana sayfada göster */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Link
              href="/sss"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Tüm Soruları Gör
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        )}

        {/* İletişim CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center bg-green-50 dark:bg-stone-900 rounded-2xl p-8 border border-green-100 dark:border-stone-800"
        >
          <h3 className="text-xl font-bold text-green-900 dark:text-green-400 mb-2">
            Sorunuz mu var?
          </h3>
          <p className="text-stone-600 dark:text-stone-400 mb-4">
            Aradığınız cevabı bulamadıysanız, bizimle iletişime geçin!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+905551234567"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg"
            >
              📞 0555 123 45 67
            </a>
            <a
              href="mailto:destek@hobitat.com"
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-stone-800 text-green-700 dark:text-green-400 px-6 py-3 rounded-xl font-bold hover:bg-green-50 dark:hover:bg-stone-700 transition border-2 border-green-600 dark:border-green-500"
            >
              ✉️ destek@hobitat.com
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

