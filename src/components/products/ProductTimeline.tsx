"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sprout, Flower, Scissors } from 'lucide-react';
import Image from 'next/image';

interface TimelineStep {
  week: number;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

interface ProductTimelineProps {
  category: string;
  productTitle: string;
}

// Ürün kategorilerine göre zaman çizelgeleri
const getTimelineForCategory = (category: string, productTitle: string): TimelineStep[] => {
  const categoryLower = category.toLowerCase();
  const titleLower = productTitle.toLowerCase();

  // Domates türleri
  if (categoryLower.includes('domates') || titleLower.includes('domates')) {
    return [
      {
        week: 1,
        title: "Fide Dikimi",
        description: "Fideniz size ulaştı ve toprağa dikildi. İlk yapraklar görünmeye başladı.",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
        icon: <Sprout className="text-green-600" size={24} />
      },
      {
        week: 4,
        title: "Çiçeklenme",
        description: "Sarı çiçekler açmaya başladı. Tozlaşma gerçekleşiyor ve meyve oluşumu başlıyor.",
        image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&w=800&q=80",
        icon: <Flower className="text-yellow-500" size={24} />
      },
      {
        week: 8,
        title: "İlk Hasat",
        description: "Kıpkırmızı, olgun domatesler hasat için hazır! İlk meyvelerinizi toplayabilirsiniz.",
        image: "https://images.unsplash.com/photo-1546470427-e26264be0b01?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-red-600" size={24} />
      },
      {
        week: 12,
        title: "Bolluk Dönemi",
        description: "Tam verim dönemi! Haftalık hasat yapabilir, taze domateslerin tadını çıkarabilirsiniz.",
        image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-green-600" size={24} />
      }
    ];
  }

  // Biber türleri
  if (categoryLower.includes('biber') || titleLower.includes('biber')) {
    return [
      {
        week: 1,
        title: "Fide Dikimi",
        description: "Fideniz toprağa dikildi. İlk yapraklar yeşermeye başladı.",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
        icon: <Sprout className="text-green-600" size={24} />
      },
      {
        week: 5,
        title: "Çiçeklenme",
        description: "Beyaz çiçekler açtı. Küçük biberler görünmeye başladı.",
        image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&w=800&q=80",
        icon: <Flower className="text-white" size={24} />
      },
      {
        week: 10,
        title: "İlk Hasat",
        description: "Yeşil biberler hasat için hazır! İstediğiniz büyüklükte toplayabilirsiniz.",
        image: "https://images.unsplash.com/photo-1604977043462-7273299949b0?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-green-600" size={24} />
      },
      {
        week: 14,
        title: "Olgunlaşma",
        description: "Biberler kırmızıya dönüyor. Hem yeşil hem kırmızı hasat yapabilirsiniz.",
        image: "https://images.unsplash.com/photo-1604977043462-7273299949b0?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-red-600" size={24} />
      }
    ];
  }

  // Salatalık/Hıyar
  if (categoryLower.includes('salatalık') || categoryLower.includes('hıyar') || titleLower.includes('salatalık') || titleLower.includes('hıyar')) {
    return [
      {
        week: 1,
        title: "Fide Dikimi",
        description: "Fideniz toprağa dikildi. İlk yapraklar büyümeye başladı.",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
        icon: <Sprout className="text-green-600" size={24} />
      },
      {
        week: 3,
        title: "Çiçeklenme",
        description: "Sarı çiçekler açtı. Salatalık meyveleri oluşmaya başladı.",
        image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&w=800&q=80",
        icon: <Flower className="text-yellow-500" size={24} />
      },
      {
        week: 6,
        title: "İlk Hasat",
        description: "İlk salatalıklar hasat için hazır! Taze ve gevrek salatalıklarınızı toplayın.",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-green-600" size={24} />
      },
      {
        week: 10,
        title: "Verimli Dönem",
        description: "Düzenli hasat dönemi! Haftada 2-3 kez salatalık toplayabilirsiniz.",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-green-600" size={24} />
      }
    ];
  }

  // Patlıcan
  if (categoryLower.includes('patlıcan') || titleLower.includes('patlıcan')) {
    return [
      {
        week: 1,
        title: "Fide Dikimi",
        description: "Fideniz toprağa dikildi. İlk yapraklar görünmeye başladı.",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
        icon: <Sprout className="text-green-600" size={24} />
      },
      {
        week: 6,
        title: "Çiçeklenme",
        description: "Mor çiçekler açtı. Küçük patlıcanlar oluşmaya başladı.",
        image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&w=800&q=80",
        icon: <Flower className="text-purple-500" size={24} />
      },
      {
        week: 12,
        title: "İlk Hasat",
        description: "İlk patlıcanlar hasat için hazır! Parlak ve pürüzsüz patlıcanlarınızı toplayın.",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-purple-600" size={24} />
      },
      {
        week: 16,
        title: "Verimli Dönem",
        description: "Düzenli hasat dönemi! Haftalık patlıcan hasadı yapabilirsiniz.",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-purple-600" size={24} />
      }
    ];
  }

  // Marul
  if (categoryLower.includes('marul') || titleLower.includes('marul')) {
    return [
      {
        week: 1,
        title: "Fide Dikimi",
        description: "Fideniz toprağa dikildi. İlk yapraklar yeşermeye başladı.",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
        icon: <Sprout className="text-green-600" size={24} />
      },
      {
        week: 3,
        title: "Büyüme",
        description: "Yapraklar genişlemeye ve rozet şeklini almaya başladı.",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?auto=format&fit=crop&w=800&q=80",
        icon: <Sprout className="text-green-600" size={24} />
      },
      {
        week: 6,
        title: "İlk Hasat",
        description: "Dış yaprakları hasat edebilirsiniz! Taze marul yaprakları hazır.",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-green-600" size={24} />
      },
      {
        week: 8,
        title: "Tam Olgunluk",
        description: "Marul tam olgunluğa ulaştı. Tüm baş hasat için hazır!",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-green-600" size={24} />
      }
    ];
  }

  // Brokoli, Lahana, Karnabahar
  if (categoryLower.includes('brokoli') || categoryLower.includes('lahana') || categoryLower.includes('karnabahar') || 
      titleLower.includes('brokoli') || titleLower.includes('lahana') || titleLower.includes('karnabahar')) {
    return [
      {
        week: 1,
        title: "Fide Dikimi",
        description: "Fideniz toprağa dikildi. İlk yapraklar büyümeye başladı.",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
        icon: <Sprout className="text-green-600" size={24} />
      },
      {
        week: 6,
        title: "Yaprak Gelişimi",
        description: "Yapraklar genişledi ve bitki güçlendi. Kök sistemi gelişiyor.",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?auto=format&fit=crop&w=800&q=80",
        icon: <Sprout className="text-green-600" size={24} />
      },
      {
        week: 12,
        title: "Baş Oluşumu",
        description: "Baş oluşmaya başladı. Bitki hasat için hazırlanıyor.",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?auto=format&fit=crop&w=800&q=80",
        icon: <Flower className="text-green-600" size={24} />
      },
      {
        week: 16,
        title: "Hasat Zamanı",
        description: "Baş tam olgunluğa ulaştı! Hasat için en uygun zaman.",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-green-600" size={24} />
      }
    ];
  }

  // Karpuz, Kavun
  if (categoryLower.includes('karpuz') || categoryLower.includes('kavun') || titleLower.includes('karpuz') || titleLower.includes('kavun')) {
    return [
      {
        week: 1,
        title: "Fide Dikimi",
        description: "Fideniz toprağa dikildi. İlk yapraklar görünmeye başladı.",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
        icon: <Sprout className="text-green-600" size={24} />
      },
      {
        week: 4,
        title: "Sürgün Gelişimi",
        description: "Bitki yayılmaya başladı. Sürgünler uzuyor ve yapraklar genişliyor.",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?auto=format&fit=crop&w=800&q=80",
        icon: <Sprout className="text-green-600" size={24} />
      },
      {
        week: 8,
        title: "Çiçeklenme",
        description: "Sarı çiçekler açtı. Meyve oluşumu başladı.",
        image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&w=800&q=80",
        icon: <Flower className="text-yellow-500" size={24} />
      },
      {
        week: 12,
        title: "İlk Hasat",
        description: "İlk meyveler olgunlaştı! Tatlı ve sulu meyvelerinizi toplayın.",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-green-600" size={24} />
      }
    ];
  }

  // Çilek
  if (categoryLower.includes('çilek') || titleLower.includes('çilek')) {
    return [
      {
        week: 1,
        title: "Fide Dikimi",
        description: "Fideniz toprağa dikildi. İlk yapraklar yeşermeye başladı.",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
        icon: <Sprout className="text-green-600" size={24} />
      },
      {
        week: 4,
        title: "Çiçeklenme",
        description: "Beyaz çiçekler açtı. Küçük çilekler görünmeye başladı.",
        image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&w=800&q=80",
        icon: <Flower className="text-white" size={24} />
      },
      {
        week: 8,
        title: "İlk Hasat",
        description: "İlk kırmızı çilekler hasat için hazır! Tatlı ve aromatik çileklerinizi toplayın.",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-red-600" size={24} />
      },
      {
        week: 12,
        title: "Verimli Dönem",
        description: "Düzenli hasat dönemi! Haftalık çilek hasadı yapabilirsiniz.",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
        icon: <Scissors className="text-red-600" size={24} />
      }
    ];
  }

  // Varsayılan (genel sebze)
  return [
    {
      week: 1,
      title: "Fide Dikimi",
      description: "Fideniz size ulaştı ve toprağa dikildi. İlk yapraklar görünmeye başladı.",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
      icon: <Sprout className="text-green-600" size={24} />
    },
    {
      week: 4,
      title: "Büyüme",
      description: "Bitki hızla büyüyor. Yapraklar genişliyor ve güçleniyor.",
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?auto=format&fit=crop&w=800&q=80",
      icon: <Sprout className="text-green-600" size={24} />
    },
    {
      week: 8,
      title: "Çiçeklenme",
      description: "Çiçekler açmaya başladı. Meyve oluşumu başlıyor.",
      image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&w=800&q=80",
      icon: <Flower className="text-yellow-500" size={24} />
    },
    {
      week: 12,
      title: "İlk Hasat",
      description: "İlk ürünler hasat için hazır! Taze ve lezzetli ürünlerinizi toplayın.",
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a9?auto=format&fit=crop&w=800&q=80",
      icon: <Scissors className="text-green-600" size={24} />
    }
  ];
};

export default function ProductTimeline({ category, productTitle }: ProductTimelineProps) {
  const timeline = getTimelineForCategory(category, productTitle);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <Calendar className="text-green-600" size={20} />
            <span className="text-sm font-bold">Büyüme Süreci</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-900 mb-3">
            Zaman Tüneli
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Bu fideyi alırken aslında {timeline[timeline.length - 1].week} hafta sonra hasat edeceğiniz ürünü satın alıyorsunuz
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Zaman Çizgisi */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-200 via-green-400 to-green-600 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {timeline.map((step, index) => (
              <motion.div
                key={step.week}
                variants={itemVariants}
                className="relative flex items-center gap-8"
              >
                {/* İkon ve Zaman Çizgisi Noktası */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-green-500">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {step.week} Hafta
                  </div>
                </div>

                {/* İçerik */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-100 hover:shadow-xl transition-shadow">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Görsel */}
                      <div className="relative h-48 md:h-full min-h-[200px] bg-stone-100">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>

                      {/* Metin */}
                      <div className="p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-green-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-stone-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alt Bilgi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-stone-700 leading-relaxed">
              <strong className="text-green-900">Not:</strong> Bu zaman çizelgesi genel bir rehberdir. 
              Gerçek büyüme süresi iklim, toprak kalitesi ve bakım koşullarına göre değişebilir. 
              Düzenli sulama ve uygun gübreleme ile daha hızlı sonuçlar alabilirsiniz.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

