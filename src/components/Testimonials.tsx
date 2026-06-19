import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { REVIEWS_DATA } from "../data/reviews";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === REVIEWS_DATA.length - 1 ? 0 : prev + 1));
  };

  const currentReview = REVIEWS_DATA[currentIndex];

  return (
    <section 
      className="py-20 bg-brand-green text-white relative overflow-hidden border-t border-brand-gold/10"
      id="testimonials-section"
    >
      {/* Decorative ambient blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-green/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-72 h-72 bg-brand-green/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header Title */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1 justify-center">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">
              Depoimentos de Pacientes
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            Quem Se Cuida no Nosso Espaço Aprova
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto rounded" />
        </div>

        {/* Carousel slider area */}
        <div className="relative min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3 }}
              className="bg-brand-green/35 border border-brand-gold/15 rounded-3xl p-6 sm:p-10 shadow-xl max-w-3xl mx-auto backdrop-blur-sm relative"
            >
              {/* Quote mark ornament */}
              <div className="absolute -top-5 left-8 text-brand-gold/25">
                <Quote className="w-16 h-16 transform rotate-180 scale-x-[-1]" />
              </div>

              {/* Star Score layout */}
              <div className="flex justify-center space-x-1.5 mb-6">
                {Array.from({ length: currentReview.rating }).map((_, rIdx) => (
                  <Star key={rIdx} className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold fill-brand-gold" />
                ))}
              </div>

              {/* Review Testimonial text */}
              <blockquote className="text-white/90 text-sm sm:text-base md:text-lg italic font-light leading-relaxed mb-6 select-none max-w-2xl mx-auto">
                "{currentReview.text}"
              </blockquote>

              {/* Author profiles details */}
              <div className="flex items-center justify-center space-x-3.5 pt-4 border-t border-white/5">
                <img
                  src={currentReview.image}
                  alt={currentReview.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold/50 shadow-md shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <cite className="font-serif text-sm sm:text-base font-bold text-white not-italic block">{currentReview.author}</cite>
                  <span className="text-[10px] sm:text-xs text-brand-gold/80 uppercase font-semibold tracking-wider">{currentReview.role}</span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">{currentReview.date}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Lateral Nav buttons */}
          <div className="absolute inset-y-1/2 left-0 right-0 flex justify-between px-2 sm:-px-8 pointer-events-none transform -translate-y-1/2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-brand-green hover:bg-brand-gold border border-brand-gold/40 text-white hover:text-brand-green flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-md cursor-pointer"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-brand-green hover:bg-brand-gold border border-brand-gold/40 text-white hover:text-brand-green flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-md cursor-pointer"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel indicators dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {REVIEWS_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index ? "bg-brand-gold w-6" : "bg-white/30"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
