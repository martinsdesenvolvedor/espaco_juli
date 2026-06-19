import React from "react";
import { motion } from "motion/react";
import { Award, GraduationCap, Heart, CheckCircle, ShieldCheck, Footprints, Sparkles } from "lucide-react";
import { IMAGES } from "../data/images";

export default function About() {
  const credentials = [
    {
      icon: <GraduationCap className="w-5 h-5 text-brand-gold" />,
      text: "Formada em Podologia Técnica Avançada, especializada em doenças de lâminas ungueais.",
    },
    {
      icon: <Award className="w-5 h-5 text-brand-gold" />,
      text: "Especialista em Reeducação de Unha Encravada por Órteses Corretivas e Cantoplastia Clínica preventiva.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-gold" />,
      text: "Certificação em Podogeriatria e Cuidados de Prevenção a Úlceras em Pacientes Diabéticos.",
    },
    {
      icon: <Heart className="w-5 h-5 text-brand-gold" />,
      text: "Vencedora de Destaques de Atendimento Humanizado e Biossegurança Clínica na Região de Penha/SC.",
    }
  ];

  return (
    <div id="about-page-wrapper">
      {/* 1. HERO BIO: About the professional */}
      <section className="py-20 bg-brand-cream" id="about-professional-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Dr. Djully Photograph - Elevated Portrait */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              {/* Decorative Frame */}
              <div className="absolute inset-4 border-2 border-brand-gold rounded-2xl transform rotate-2 pointer-events-none" />
              <img
                src={IMAGES.profile}
                alt="Dra. Djully Firmo - Podologia e Estética"
                className="w-full h-auto aspect-square object-cover rounded-2xl shadow-xl border border-gray-100 relative z-10"
                referrerPolicy="no-referrer"
              />
              
              {/* Slogan pill under photo */}
              <div className="absolute -bottom-5 right-6 z-20 bg-brand-green py-3.5 px-5 rounded-2xl border border-brand-gold shadow-lg max-w-xs text-xs">
                <p className="text-brand-gold font-serif font-bold italic">
                  "Seu caminhar sem dores e com total conforto é o meu compromisso diário."
                </p>
                <span className="text-[10px] text-white/70 block mt-1.5">— Djully Firmo</span>
              </div>
            </motion.div>

            {/* Dr. Djully bio description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-brand-green font-bold block">
                  A Profissional por Trás de Tudo
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-green tracking-tight">
                  Djully Firmo
                </h2>
                <div className="w-16 h-1 bg-brand-gold rounded" />
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-light">
                Olá, eu sou a <strong>Djully Firmo</strong>. Minha paixão pelo estudo da podologia surgiu a partir do desejo profundo de aliviar o sofrimento que problemas simples, porém incapacitantes, causam no cotidiano das pessoas. Ver um paciente entrar no consultório caminhando com dor e sair sorrindo, pisando com firmeza e leveza, é a minha maior realização.
              </p>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-light">
                Com anos de experiência clínica, montei o meu espaço em Penha/SC fundamentada em três pilares fundamentais: <b>Biossegurança clínica irredutível</b>, <b>atendimento de alto afeto</b> e <b>tratamento científico avançado</b>. Busco sempre associar técnicas fisiológicas, controle de infecções rigoroso e cosmecêuticos específicos para trazer uma verdadeira regeneração tecidual ungueal à planta e derme dos pés de meus pacientes.
              </p>

              {/* Bullet list of diplomas */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-wider text-brand-green font-bold mb-3 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                  Qualificações & Filosofia de Atendimento
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {credentials.map((cred, cIdx) => (
                    <div key={cIdx} className="bg-white p-3 rounded-lg border border-gray-150 flex items-start space-x-2.5">
                      <div className="p-1.5 bg-brand-green/5 rounded border border-brand-green/5 shrink-0">
                        {cred.icon}
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed font-normal">
                        {cred.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. HISTORY: Clinic mission and Penha community ties */}
      <section className="py-20 bg-brand-green text-white relative overflow-hidden" id="about-history-section">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-brand-green/60 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Story narrative block */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold block">
                  Nossa Trajetória
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  O Nascimento do Espaço Djully Firmo
                </h3>
                <div className="w-16 h-1 bg-brand-gold rounded" />
              </div>

              <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-light">
                O "Espaço Djully Firmo" nasceu de um sonho focado no cuidado. No início, em atendimentos ambulatoriais domiciliares, percebemos que o público de Penha, Santa Catarina — desde os pescadores artesanais locais, atletas amadores, surfistas, até a melhor idade de aposentados — precisava de um refúgio centralizado e de alta confiança técnica para dores plantares.
              </p>

              <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-light">
                Inauguramos o nosso atual consultório físico equipado com o que há de mais moderno em maquinários dermatológicos ungueais — cadeiras ergonômicas eletromecânicas que trazem conforto ao se acomodar, fresas de alta velocidade e autoclave calibrado profissionalmente. Nossa missão é ser o porto seguro de alívio e bem-estar, onde a inovação tecnológica se une à gentileza do cafezinho quente e das toalhas limpas.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
                <div>
                  <span className="block text-brand-gold font-serif text-2xl sm:text-3xl font-bold">100%</span>
                  <span className="text-[10px] text-white/70 uppercase">Esterilizado</span>
                </div>
                <div>
                  <span className="block text-brand-gold font-serif text-2xl sm:text-3xl font-bold">4.9★</span>
                  <span className="text-[10px] text-white/70 uppercase">Google</span>
                </div>
                <div>
                  <span className="block text-brand-gold font-serif text-2xl sm:text-3xl font-bold">1.5k+</span>
                  <span className="text-[10px] text-white/70 uppercase">Pés Atendidos</span>
                </div>
              </div>
            </div>

            {/* Clinic Environment Image Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/20"
              id="about-clinic-room-visual"
            >
              <img
                src={IMAGES.clinic}
                alt="Ambiente do Consultório Djully Firmo"
                className="w-full h-auto object-cover object-center filter hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-brand-gold flex items-center gap-1.5">
                    <Footprints className="w-5 h-5" />
                    Tecnologia e Máximo Conforto
                  </h4>
                  <p className="text-[11px] text-white/80">Sala de atendimento climatizada, desinfetada sistematicamente e equipada ergonomicamente.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
