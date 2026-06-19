import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Footprints, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Baby, 
  FlameKindling,
  Search, 
  CheckCircle2, 
  Clock, 
  Coins, 
  ArrowRight,
  Sparkle
} from "lucide-react";
import { TREATMENTS_DATA } from "../data/treatments";
import { Treatment } from "../types";

// Dynamic mapper to load proper Lucide icons safely based on string
export function renderTreatmentIcon(iconName: string, className = "w-6 h-6 text-brand-gold") {
  switch (iconName) {
    case "Footprints":
      return <Footprints className={className} />;
    case "FlameKindling":
      return <FlameKindling className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Heart":
      return <Heart className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    case "Baby":
      return <Baby className={className} />;
    default:
      return <Sparkle className={className} />;
  }
}

interface TreatmentsListProps {
  mode: "overview" | "full";
  onSelectTreatment: (treatmentId: string) => void;
  onOpenScheduler: (treatmentId: string) => void;
}

export default function TreatmentsList({
  mode,
  onSelectTreatment,
  onOpenScheduler,
}: TreatmentsListProps) {
  const [filter, setFilter] = useState<"all" | "clinico" | "bem-estar">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "Todos os Cuidados" },
    { id: "clinico", label: "Clínicos & Corretivos" },
    { id: "bem-estar", label: "Relaxantes & Preventivos" },
  ];

  // Logic to classify treatments internally for filtering
  const matchesCategory = (treatment: Treatment, categoryId: string) => {
    if (categoryId === "all") return true;
    if (categoryId === "clinico") {
      return ["unha-encravada", "pe-diabetico"].includes(treatment.id);
    }
    if (categoryId === "bem-estar") {
      return ["podologia-geral", "reflexologia", "podogeriatria", "podopediatria"].includes(treatment.id);
    }
    return true;
  };

  const filteredTreatments = TREATMENTS_DATA.filter(
    (treatment) =>
      matchesCategory(treatment, filter) &&
      (treatment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        treatment.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section 
      className={`py-20 ${mode === "overview" ? "bg-brand-cream" : "bg-brand-cream/40"} border-b border-gray-100 relative`}
      id={mode === "overview" ? "treatments-overview-section" : "treatments-full-section"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-green font-bold block">
            {mode === "overview" ? "Nossas Especialidades" : "Tabela Completa de Tratamentos"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-green tracking-tight">
            {mode === "overview"
              ? "Tratamentos Especializados para Você"
              : "Ampla Gama de Serviços de Podologia"}
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto rounded" />
          <p className="text-slate-600 text-sm sm:text-base font-light">
            {mode === "overview"
              ? "Cuidados profissionais desenhados especificamente para a biomecânica e reabilitação dermatológica plantar de seus pés."
              : "Explore nosso guia completo de tratamentos especializados na cidade de Penha/SC. Agende consultas focadas na sua qualidade de vida."}
          </p>
        </div>

        {/* Dynamic Filters & Search (Only shown in standalone "Full" page) */}
        {mode === "full" && (
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-150 shadow-sm max-w-4xl mx-auto">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    filter === c.id
                      ? "bg-brand-green text-white shadow-md"
                      : "bg-brand-cream text-brand-green border border-brand-green/10 hover:border-brand-green/40"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Buscar tratamento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-lg text-brand-green bg-white focus:outline-none focus:ring-1.5 focus:ring-brand-green focus:border-brand-green"
              />
            </div>
          </div>
        )}

        {/* Content Render Grid */}
        {mode === "overview" ? (
          // HOME CARDS OVERVIEW (Compact Grid with Hovers)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TREATMENTS_DATA.slice(0, 4).map((treatment, idx) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                 className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                id={`treatment-card-${treatment.id}`}
              >
                {/* Visual top design bar */}
                <div className="h-1.5 bg-brand-green block w-full group-hover:bg-brand-gold transition-colors" />
                
                <div className="p-6 sm:p-8 space-y-4 flex-1">
                  {/* Icon wrapper */}
                  <div className="w-12 h-12 rounded-xl bg-brand-green/5 flex items-center justify-center border border-brand-green/5 shadow-inner grow-0 shrink-0 group-hover:bg-brand-green group-hover:border-brand-gold/30 transition-all">
                    {renderTreatmentIcon(treatment.iconName, "w-6 h-6 text-brand-green group-hover:text-brand-gold transition-colors")}
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green tracking-tight group-hover:text-brand-gold transition-colors">
                    {treatment.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                    {treatment.shortDescription}
                  </p>
                </div>

                {/* Card controls band */}
                <div className="px-6 py-4 bg-brand-cream border-t border-gray-50 flex justify-between items-center text-xs">
                  <span className="font-semibold text-brand-green fill-none flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-brand-gold" />
                    {treatment.duration}
                  </span>
                  <button
                    onClick={() => onSelectTreatment(treatment.id)}
                    className="text-brand-gold hover:text-brand-green font-bold tracking-wide uppercase text-[10px] flex items-center space-x-1 hover:underline cursor-pointer"
                  >
                    <span>Saiba Mais</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Creative Card CTA for the missing services */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-brand-green to-brand-green/80 rounded-2xl p-6 sm:p-8 text-white border border-brand-gold/20 shadow-lg flex flex-col justify-between"
              id="cta-treatment-card"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full border border-brand-gold flex items-center justify-center bg-brand-green">
                  <Sparkles className="w-5 h-5 text-brand-gold animate-spin-slow" />
                </div>
                <h3 className="font-serif text-xl font-bold tracking-tight text-brand-gold">
                  Buscando Outro tipo de Cuidado?
                </h3>
                <p className="text-white/85 text-xs sm:text-sm font-light leading-relaxed">
                  Oferecemos também cuidados para Pé Diabético, Podopediatria, tratamento de micose ungueal e correção ortésica completa.
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onSelectTreatment("all-services")}
                  className="w-full py-3 bg-brand-gold text-brand-green text-xs font-bold uppercase tracking-wider rounded-lg shadow hover:bg-brand-gold-soft transition-colors cursor-pointer"
                >
                  Ver Todos os Serviços
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          // DETAILED STANDALONE SCREEN VIEW LISTING
          <div className="space-y-12 max-w-5xl mx-auto">
            {filteredTreatments.length > 0 ? (
              filteredTreatments.map((treatment, idx) => (
                <motion.div
                  key={treatment.id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-150 hover:border-brand-gold/40 shadow-sm hover:shadow-lg transition-all duration-300"
                  id={`treatment-detail-box-${treatment.id}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Left Column Brand / Highlight */}
                    <div className="lg:col-span-4 bg-brand-green p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
                      {/* Background decorative footprint shape */}
                      <div className="absolute -bottom-10 -right-10 opacity-10 text-white w-40 h-40">
                        {renderTreatmentIcon(treatment.iconName, "w-full h-full")}
                      </div>

                      <div className="space-y-4">
                        <div className="w-10 h-10 rounded-full bg-brand-green/80 border border-brand-gold flex items-center justify-center">
                          {renderTreatmentIcon(treatment.iconName, "w-5 h-5 text-brand-gold")}
                        </div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white">
                          {treatment.title}
                        </h3>
                        <p className="text-white/80 text-xs font-light leading-relaxed">
                          {treatment.shortDescription}
                        </p>
                      </div>

                      {/* Fee and duration indicators */}
                      <div className="pt-6 border-t border-white/10 space-y-2 mt-6">
                        <p className="flex items-center text-xs text-brand-gold">
                          <Clock className="w-4 h-4 mr-1.5 shrink-0" />
                          <span>Duração média: <b>{treatment.duration}</b></span>
                        </p>
                        <p className="flex items-center text-xs text-brand-gold">
                          <Coins className="w-4 h-4 mr-1.5 shrink-0" />
                          <span>Investimento: <b>{treatment.price}</b></span>
                        </p>
                      </div>
                    </div>

                    {/* Right Column Complete detailed descriptions */}
                    <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                          Sobre o Tratamento
                        </h4>
                        <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-normal">
                          {treatment.fullDescription}
                        </p>
                      </div>

                      {/* Benefits & Indications Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* Benefits list */}
                        <div className="space-y-2">
                          <h5 className="text-[11px] uppercase tracking-wider text-brand-green font-bold">
                            Principais Benefícios
                          </h5>
                          <ul className="space-y-2">
                            {treatment.benefits.map((bene, bIdx) => (
                              <li key={bIdx} className="flex items-start text-xs text-slate-600 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 shrink-0 mt-0.5" />
                                <span>{bene}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Indications list */}
                        <div className="space-y-2">
                          <h5 className="text-[11px] uppercase tracking-wider text-brand-green font-bold">
                            Para quem é Indicado?
                          </h5>
                          <ul className="space-y-2">
                            {treatment.indications.map((ind, iIdx) => (
                              <li key={iIdx} className="flex items-start text-xs text-slate-600 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-2 shrink-0 mt-1.5" />
                                <span>{ind}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Trigger Call to actions */}
                      <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                          onClick={() => onOpenScheduler(treatment.id)}
                          className="px-6 py-2.5 bg-brand-green hover:bg-brand-green/90 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow cursor-pointer flex items-center space-x-1.5 hover:shadow-md"
                        >
                          <span>Solicitar Cuidado</span>
                          <ArrowRight className="w-4 h-4 text-brand-gold" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-slate-500 text-sm font-medium">
                  Nenhum tratamento encontrado para os termos pesquisados.
                </p>
                <button
                  onClick={() => {
                    setFilter("all");
                    setSearchQuery("");
                  }}
                  className="mt-3 text-xs font-semibold text-[#c5a059] hover:underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
