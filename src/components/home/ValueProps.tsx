"use client";

import React from 'react';
import { Truck, ShieldCheck, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const valueProps = [
  {
    icon: ShieldCheck,
    title: "Aşılanmış Güçlü Kökler",
    description: "Klasik fidelere göre 3 kat daha verimli ve hastalıklara dirençli özel üretim.",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: Truck,
    title: "Hasarsız Kargo Garantisi",
    description: "Özel koruyucu ambalajlarımızla fideniz kırılmadan, kurumadan kapınıza gelir.",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Sun,
    title: "7/24 Ziraat Desteği",
    description: "Bitkiniz büyürken aklınıza takılan her soruda uzmanlarımız yanınızda.",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

export default function ValueProps() {
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
    hidden: { opacity: 0, y: 40, scale: 0.9 },
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-2xl bg-stone-50 border border-stone-100 hover:shadow-lg transition duration-300 group"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className={`w-16 h-16 mx-auto ${prop.bgColor} ${prop.iconColor} rounded-full flex items-center justify-center mb-4 transition`}
                >
                  <Icon size={32} />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-green-900">{prop.title}</h3>
                <p className="text-stone-600">{prop.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
