import React from "react";
import { Footprints, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenScheduler: () => void;
}

export default function Footer({ setActiveTab, onOpenScheduler }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#040e0c] text-white border-t border-brand-gold/20" id="app-footer">
      
      {/* 1. Main Directory Links block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Col 1: Brand & Mini Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick("home")}>
              <div className="w-9 h-9 rounded-full border border-brand-gold flex items-center justify-center bg-brand-green">
                <span className="text-brand-gold font-serif font-bold text-base">DF</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-tight block text-white">
                  Djully Firmo
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] text-brand-gold font-semibold block">
                  Espaço de Podologia
                </span>
              </div>
            </div>
            
            <p className="text-[#f4faf2]/75 text-xs font-light leading-relaxed max-w-sm">
              Mais de uma simples estética, unimos biossegurança de nível hospitalar com atendimento humanizado para promover uma verdadeira reabilitação motora e conforto total plantar para todos os habitantes de Penha/SC.
            </p>

            {/* Social icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-brand-gold bg-brand-green flex items-center justify-center text-white/70 hover:text-brand-gold transition-all cursor-pointer"
                aria-label="Siga o consultório no Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-brand-gold bg-brand-green flex items-center justify-center text-white/70 hover:text-brand-gold transition-all cursor-pointer"
                aria-label="Siga o consultório no Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-brand-gold uppercase">
              Acesso Rápido
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#f4faf2]/85">
              <li>
                <button 
                  onClick={() => handleNavClick("home")}
                  className="hover:text-brand-gold transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("treatments")}
                  className="hover:text-brand-gold transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Catálogo de Tratamentos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("about")}
                  className="hover:text-brand-gold transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Sobre a Dra. Djully
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("contact")}
                  className="hover:text-brand-gold transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Localização & Fale Conosco
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Address Support */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-brand-gold uppercase">
              Contato Rápido
            </h4>
            <ul className="space-y-3.5 text-xs text-[#f4faf2]/85 font-light">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-brand-gold shrink-0" />
                <span>Av. Eugênio Krause, 1630 - Sala 3, Centro - Penha/SC</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-brand-gold shrink-0" />
                <a href="tel:+5547992481857" className="hover:text-brand-gold transition-colors hover:underline">
                  (47) 99248-1857
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-brand-gold shrink-0" />
                <a href="mailto:contato@djullyfirmopodologia.com.br" className="hover:text-brand-gold transition-colors hover:underline">
                  contato@djullyfirmopodologia.com.br
                </a>
              </li>
            </ul>
            
            {/* CTA inline scheduler */}
            <div className="pt-2">
              <button
                onClick={onOpenScheduler}
                className="w-full py-2.5 bg-brand-green hover:bg-brand-green/90 border border-brand-gold/40 text-brand-gold font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer block text-center"
              >
                Reservar Consulta
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Sub bottom attribution bar */}
      <div className="border-t border-white/5 bg-[#030b0a] py-6 text-center text-[11px] text-white/50 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© {currentYear} Espaço Djully Firmo. Todos os direitos reservados.</p>
          <p className="font-light">
            CNPJ: 45.183.057/0001-34 • Responsabilidade Técnica: Dra. Djully Firmo • Penha / SC
          </p>
        </div>
      </div>

    </footer>
  );
}
