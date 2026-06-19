import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, ArrowRight, Heart, CalendarRange } from "lucide-react";
import { IMAGES } from "../data/images";

interface HeroProps {
  onExploreServices: () => void;
  onOpenScheduler: () => void;
}

export default function Hero({ onExploreServices, onOpenScheduler }: HeroProps) {
  // Parallax hook
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#040e0c]"
      id="hero-section"
    >
      {/* Background with Parallax effect */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
      >
        <img
          src={IMAGES.hero}
          alt="Clínica de Podologia Relaxante"
          className="w-full h-[120%] object-cover object-center filter brightness-50"
          referrerPolicy="no-referrer"
        />
        {/* Soft, rich clinical green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/40 to-black/60" />
      </motion.div>

      {/* Floating Spark particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-brand-gold blur-[1px] animate-pulse" />
        <div className="absolute top-1/2 left-2/3 w-3 h-3 rounded-full bg-brand-gold blur-[2px] animate-ping duration-3000" />
        <div className="absolute top-2/3 left-1/5 w-1.5 h-1.5 rounded-full bg-brand-gold blur-[1px] animate-pulse" />
      </div>

      {/* Hero Core Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-12 sm:mt-16">
        <motion.div
          style={{ opacity: opacityText }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-green/90 border border-brand-gold/40 backdrop-blur-md shadow-md mx-auto">
            <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
              Saúde & Bem-Estar Plena para os Seus Pés
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight select-none">
            Espaço <span className="text-brand-gold block sm:inline">Djully Firmo</span>
          </h1>

          {/* Slogan */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
            Sua saúde começa pela base. Cuidados podológicos avançados, esterilização rigorosa e atendimento humanizado em Penha/SC.
          </p>

          {/* Quick Metrics (Clinical attributes) */}
          <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 pt-3 text-xs text-brand-gold font-medium tracking-wide">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              100% de Instrumentos Autoclavados
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Ambiente Climatizado e Seguro
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Especialista em Onicocriptose
            </span>
          </div>

          {/* Calls To Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button
              onClick={onOpenScheduler}
              className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-brand-green font-bold text-sm tracking-widest uppercase rounded-full shadow-xl shadow-[#040e0c]/50 hover:bg-brand-gold-soft transition-all transform hover:scale-103 duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <CalendarRange className="w-4 h-4 text-brand-green" />
              <span>Agendar Avaliação</span>
            </button>
            <button
              onClick={onExploreServices}
              className="w-full sm:w-auto px-8 py-4 bg-brand-green/75 hover:bg-brand-green text-white border border-white/20 font-bold text-sm tracking-widest uppercase rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Conhecer Serviços</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Wave border below section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-green to-transparent z-10" />
    </section>
  );
}
