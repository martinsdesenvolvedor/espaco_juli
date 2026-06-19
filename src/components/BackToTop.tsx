import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show when page is scrolled down past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 15, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          type="button"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-brand-green hover:bg-brand-green/95 border border-brand-gold text-brand-gold hover:text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
          aria-label="Voltar para o topo"
          id="back-to-top-fab"
        >
          <ArrowUp className="w-5 h-5 animate-bounce-slow" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
