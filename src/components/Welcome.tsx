import React from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck, HeartPulse, CheckCircle2 } from "lucide-react";

export default function Welcome() {
  const clinicalDifferentiators = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-gold" />,
      title: "Biossegurança Absoluta",
      description: "Todos os nossos instrumentos passam por lavagem ultrassônica e esterilização rigorosa em autoclave cirúrgico, envelopados individualmente para cada paciente.",
    },
    {
      icon: <Award className="w-6 h-6 text-brand-gold" />,
      title: "Dra. Djully Firmo",
      description: "Profissional extremamente qualificada, com formação técnica especializada e constante atualização nas melhores práticas de podologia clínica.",
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-brand-gold" />,
      title: "Atendimento Humanizado",
      description: "Não tratamos apenas patologias; oferecemos uma escuta ativa para entender sua rotina, calçados e dores, trazendo conforto imediato sem sofrimento.",
    },
  ];

  return (
    <section 
      className="py-20 bg-brand-green text-white overflow-hidden relative border-t border-brand-gold/10"
      id="welcome-section"
    >
      {/* Visual glowing layout effect */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-green/50 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold block">
                Excelência em Cuidados Podológicos
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Bem-vindo ao Espaço Djully Firmo
              </h2>
              <div className="w-16 h-1 bg-brand-gold mt-2 rounded" />
            </div>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed font-light">
              Localizado na charmosa e acolhedora cidade de <b>Penha, Santa Catarina</b>, o Espaço Djully Firmo foi planejado para ir além da estética dos pés. Nós enxergamos a podologia como um braço fundamental da saúde e da qualidade de vida humana. 
            </p>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed font-light">
              Nossos pés sustentam toda a nossa estrutura diariamente, absorvendo impactos e facilitando nossa locomoção. Quando eles sofrem de dores, calos inflamados, micoses persistentes ou unhas encravadas, nossa liberdade de movimento é severamente comprometida. Por isso, entregamos um espaço seguro, acolhedor e altamente equipado para devolver o seu sorriso a cada pisada.
            </p>

            {/* Quick check list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-white/90">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Avaliação clínica minuciosa</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Segurança em pé diabético</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Tratamento rápido sem agulhas</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Instalações modernas e relaxantes</span>
              </div>
            </div>
          </div>

          {/* Differentiators sidebar */}
          <div className="lg:col-span-5 space-y-5">
            {clinicalDifferentiators.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-brand-green/30 p-6 rounded-xl border border-brand-gold/15 hover:border-brand-gold/40 transition-all shadow-md group"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-lg bg-brand-green border border-brand-gold/30 group-hover:scale-105 transition-transform shrink-0">
                    {diff.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-brand-gold mb-1">
                      {diff.title}
                    </h4>
                    <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
