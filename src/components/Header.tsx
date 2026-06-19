import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Smartphone, Calendar, Footprints } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenScheduler: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenScheduler }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor window scroll to add elegant glass opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "home", label: "Início" },
    { id: "treatments", label: "Tratamentos" },
    { id: "about", label: "Sobre Nós" },
    { id: "contact", label: "Contato" },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    // Smooth scroll to top of viewport upon changing views
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-brand-green/95 backdrop-blur-md shadow-lg border-b border-brand-gold/10 py-3"
            : "bg-transparent py-5"
        }`}
        id="app-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand Logo and Title */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            {/* Elegant Circular Medical-Heart-foot emblem reference */}
            <div className="w-10 h-10 rounded-full border-1.5 border-brand-gold bg-brand-green flex items-center justify-center shadow-lg shadow-brand-green/40 transition-transform group-hover:scale-105">
              <span className="text-brand-gold font-serif font-semibold text-lg">DF</span>
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white block">
                Djully Firmo
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-brand-gold font-medium block">
                Espaço de Podologia
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link items */}
          <nav className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 cursor-pointer ${
                  activeTab === item.id
                    ? "text-brand-gold font-semibold"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Call To Action Button (Desktop Only) */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:+5547992481857" 
              className="text-white/80 hover:text-white transition-colors text-xs flex items-center gap-1 font-medium"
            >
              <Smartphone className="w-4 h-4 text-brand-gold" />
              (47) 99248-1857
            </a>
            <button
              onClick={onOpenScheduler}
              className="px-5 py-2 rounded-full border border-brand-gold bg-transparent text-brand-gold hover:bg-brand-gold hover:text-brand-green text-xs font-semibold tracking-wide transition-all duration-300 transform hover:scale-102 cursor-pointer shadow-md shadow-brand-green/10"
            >
              Agendar Consulta
            </button>
          </div>

          {/* Mobile Hamburguer button toggle */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={onOpenScheduler}
              className="px-3.5 py-1.5 bg-brand-gold text-brand-green text-[11px] font-bold rounded-full cursor-pointer hover:bg-brand-gold-soft"
              aria-label="Agendar via formulário"
            >
              Agendar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-brand-gold transition-colors p-1"
              aria-label="Abrir menu mobile"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu Layer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 md:hidden">
            {/* Mobile dark backdrop overlay click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Mobile content panel container */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 right-0 bg-brand-green pt-24 pb-8 px-6 shadow-2xl border-b border-brand-gold/20"
              id="mobile-navigation-drawer"
            >
              <div className="flex flex-col space-y-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left text-lg font-serif tracking-wide py-2 border-b border-white/5 transition-colors ${
                      activeTab === item.id
                        ? "text-brand-gold font-semibold pl-1 border-brand-gold/30"
                        : "text-white/80"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                <div className="pt-4 flex flex-col space-y-4">
                  <a
                    href="tel:+5547992481857"
                    className="flex items-center space-x-2 text-white/70 text-sm py-1.5"
                  >
                    <Smartphone className="w-4 h-4 text-brand-gold" />
                    <span>Ligue para (47) 99248-1857</span>
                  </a>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenScheduler();
                    }}
                    className="w-full py-3 bg-brand-gold text-brand-green font-bold text-center rounded-lg shadow-lg cursor-pointer hover:bg-[#FAF9F6] transition-colors flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Solicitar Horário Disponível</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
