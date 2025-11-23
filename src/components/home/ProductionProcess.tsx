"use client";

import React from 'react';
import { Sprout, CheckCircle, Award, Users } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Sprout,
    title: "Aşılanmış Fideler",
    description: "Modern aşılama teknikleriyle üretilen fidelerimiz, daha güçlü kök yapısına sahiptir ve hastalıklara karşı dirençlidir.",
  },
  {
    icon: CheckCircle,
    title: "Kalite Kontrolü",
    description: "Her fide, gönderilmeden önce uzman ekibimiz tarafından kontrol edilir. Sadece en sağlıklı fideler size ulaşır.",
  },
  {
    icon: Award,
    title: "Sertifikalı Üretim",
    description: "Organik ve sürdürülebilir tarım standartlarına uygun olarak üretilen fidelerimiz, sertifikalı ve garantilidir.",
  },
];

const stats = [
  { value: "10K+", label: "Mutlu Müşteri" },
  { value: "98%", label: "Başarı Oranı" },
  { value: "24/7", label: "Destek" },
];

export default function ProductionProcess() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
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
            Profesyonel Üretim Sürecimiz
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Her fide, uzman ellerde özenle yetiştirilir ve kalite kontrolünden geçer
          </p>
        </motion.div>

        {/* İki Kolonlu Düzen */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Sol: Görsel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80"
              alt="Profesyonel Fide Üretimi"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
          </motion.div>

          {/* Sağ: İçerik */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-all duration-300"
                  >
                    <Icon className="text-green-600 group-hover:text-white" size={24} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">{feature.title}</h3>
                    <p className="text-stone-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* İstatistikler */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-stone-200"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statVariants}
                  className="text-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="text-3xl font-bold text-green-700 mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-stone-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
