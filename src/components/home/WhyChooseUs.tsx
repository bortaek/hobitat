"use client";

import React from 'react';
import { Leaf, Heart, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const cards = [
  {
    icon: Leaf,
    title: "%100 Doğal",
    description: "Organik sertifikalı, kimyasal kullanılmayan, doğal yöntemlerle yetiştirilmiş fideler.",
    gradient: "from-green-50 to-white",
    border: "border-green-100",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    hoverBg: "group-hover:bg-green-600",
    hoverText: "group-hover:text-white",
    decorIcon: Leaf,
    decorColor: "text-green-600",
  },
  {
    icon: Heart,
    title: "Özenle Seçilmiş",
    description: "Her fide, özenle seçilir ve en iyi koşullarda yetiştirilir. Kalite bizim önceliğimiz.",
    gradient: "from-pink-50 to-white",
    border: "border-pink-100",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    hoverBg: "group-hover:bg-pink-600",
    hoverText: "group-hover:text-white",
    decorIcon: Heart,
    decorColor: "text-pink-600",
  },
  {
    icon: Zap,
    title: "Hızlı Teslimat",
    description: "24 saat içinde kargo garantisi. Fideniz taze ve canlı şekilde kapınıza gelir.",
    gradient: "from-yellow-50 to-white",
    border: "border-yellow-100",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    hoverBg: "group-hover:bg-yellow-600",
    hoverText: "group-hover:text-white",
    decorIcon: Zap,
    decorColor: "text-yellow-600",
  },
  {
    icon: Sparkles,
    title: "Uzman Desteği",
    description: "Fide bakımından hasada kadar her aşamada yanınızdayız. 7/24 ziraat danışmanlığı.",
    gradient: "from-blue-50 to-white",
    border: "border-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    hoverBg: "group-hover:bg-blue-600",
    hoverText: "group-hover:text-white",
    decorIcon: Sparkles,
    decorColor: "text-blue-600",
  },
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-green-900 mb-4">
            Neden Hobitat?
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Doğayı evinize getiren, güvenilir ve kaliteli fide çözümü
          </p>
        </motion.div>

        {/* 4 Kolonlu Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            const DecorIcon = card.decorIcon;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                style={{
                  background: `linear-gradient(to bottom right, ${card.gradient.includes('green') ? '#f0fdf4' : card.gradient.includes('pink') ? '#fdf2f8' : card.gradient.includes('yellow') ? '#fefce8' : '#eff6ff'}, white)`,
                  borderColor: card.border.includes('green') ? '#dcfce7' : card.border.includes('pink') ? '#fce7f3' : card.border.includes('yellow') ? '#fef9c3' : '#dbeafe',
                }}
              >
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition">
                  <DecorIcon size={60} className={card.decorColor} />
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center mb-6 ${card.hoverBg} transition-all duration-300`}
                >
                  <Icon className={`${card.iconColor} ${card.hoverText}`} size={32} />
                </motion.div>
                <h3 className="text-xl font-bold text-green-900 mb-3">{card.title}</h3>
                <p className="text-stone-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
