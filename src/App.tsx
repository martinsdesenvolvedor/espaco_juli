import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Footprints, 
  Sparkles, 
  CalendarCheck, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  User, 
  X,
  MapPin,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import TreatmentsList from "./components/TreatmentsList";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SchedulerModal from "./components/SchedulerModal";
import BackToTop from "./components/BackToTop";
import { AppointmentInput, Treatment } from "./types";
import { TREATMENTS_DATA } from "./data/treatments";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState("");
  const [appointments, setAppointments] = useState<AppointmentInput[]>([]);
  const [showAppointmentsPanel, setShowAppointmentsPanel] = useState(false);

  // Load appointments from LocalStorage upon startup
  useEffect(() => {
    try {
      const cached = localStorage.getItem("djully_appointments");
      if (cached) {
        setAppointments(JSON.parse(cached));
      }
    } catch (e) {
      console.warn("Could not parse cached appointments", e);
    }
  }, []);

  const handleOpenScheduler = (treatmentId = "") => {
    setSelectedTreatmentId(treatmentId);
    setSchedulerOpen(true);
  };

  const handleAppointmentCreated = (newAppt: AppointmentInput) => {
    const updated = [newAppt, ...appointments];
    setAppointments(updated);
    try {
      localStorage.setItem("djully_appointments", JSON.stringify(updated));
    } catch (e) {
      console.error("Could not write appointments to storage", e);
    }
  };

  const handleClearAppointments = () => {
    setAppointments([]);
    try {
      localStorage.removeItem("djully_appointments");
    } catch (e) {
      console.error("Failed to empty appointments trace", e);
    }
    setShowAppointmentsPanel(false);
  };

  // Convert "2026-06-25" -> "25 de Junho"
  const getFormattedDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, monthNum, dayNum] = dateStr.split("-");
    const d = new Date(parseInt(year), parseInt(monthNum) - 1, parseInt(dayNum));
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return `${d.getDate()} de ${months[d.getMonth()]}`;
  };

  return (
    <div className="min-h-screen bg-brand-cream text-slate-800 flex flex-col font-sans selection:bg-brand-gold selection:text-brand-green">
      
      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenScheduler={() => handleOpenScheduler("")} 
      />

      {/* Main Screen Router */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero welcome and parallax banner */}
              <Hero 
                onExploreServices={() => {
                  setActiveTab("treatments");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }} 
                onOpenScheduler={() => handleOpenScheduler("")} 
              />
              
              {/* Introduction and Clinical Biosafety highlights */}
              <Welcome />
              
              {/* Micro-Overview of available care products */}
              <TreatmentsList 
                mode="overview" 
                onSelectTreatment={(id) => {
                  if (id === "all-services") {
                    setActiveTab("treatments");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    handleOpenScheduler(id);
                  }
                }} 
                onOpenScheduler={handleOpenScheduler} 
              />
              
              {/* Slide reviews from patients */}
              <Testimonials />
            </motion.div>
          )}

          {activeTab === "treatments" && (
            <motion.div
              key="treatments-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pt-16 sm:pt-20"
            >
              {/* Wide detailed list of clinic and spa services */}
              <TreatmentsList 
                mode="full" 
                onSelectTreatment={handleOpenScheduler} 
                onOpenScheduler={handleOpenScheduler} 
              />
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pt-16 sm:pt-20"
            >
              {/* Complete background story and profile details */}
              <About />
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pt-16 sm:pt-20"
            >
              {/* Interactive contact sheet validation and local Map pin */}
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer layout */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenScheduler={() => handleOpenScheduler("")} 
      />

      {/* Floating Active Booking Tracker Notification */}
      {appointments.length > 0 && (
        <div className="fixed bottom-6 left-6 z-40" id="appointments-tracker-wrapper">
          <button
            type="button"
            onClick={() => setShowAppointmentsPanel(true)}
            className="flex items-center space-x-2.5 px-4.5 py-3 bg-brand-green hover:bg-brand-green/90 border border-brand-gold text-brand-gold rounded-full shadow-2xl transition-all hover:scale-103 duration-300 cursor-pointer"
            aria-label="Abrir agendamentos"
          >
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <CalendarCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-white hidden sm:inline">
              Meu Agendamento ({appointments.length})
            </span>
          </button>
        </div>
      )}

      {/* Slide-out Panel showing active reservations */}
      <AnimatePresence>
        {showAppointmentsPanel && appointments.length > 0 && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Panel Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAppointmentsPanel(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Panel side sheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-full max-w-sm bg-white h-full shadow-2xl border-l border-gray-200 p-6 flex flex-col justify-between"
              id="active-appointments-panel-sheet"
            >
              <div className="space-y-6 overflow-y-auto flex-1 pr-1">
                {/* Panel Header */}
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-2">
                    <CalendarCheck className="w-5 h-5 text-brand-green" />
                    <h3 className="font-serif text-lg font-bold text-brand-green">Minhas Consultas</h3>
                  </div>
                  <button
                    onClick={() => setShowAppointmentsPanel(false)}
                    className="p-1 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Listing of reserved slots */}
                <div className="space-y-4">
                  <p className="text-xs text-slate-500">
                    Sua solicitação de horário está aguardando confirmação final do consultório via WhatsApp.
                  </p>
                  
                  {appointments.map((appt, i) => {
                    const treatObj = TREATMENTS_DATA.find((t) => t.id === appt.treatmentId);
                    return (
                      <div 
                        key={i}
                        className="p-4 bg-brand-cream rounded-xl border border-gray-200 space-y-3 relative"
                      >
                        {/* Status tag */}
                        <div className="absolute top-4 right-4 text-[10px] bg-yellow-100 text-yellow-800 border border-yellow-250 font-bold px-2 py-0.5 rounded-full">
                          Pendente
                        </div>

                        <div className="space-y-1 pr-14">
                          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">Tratamento</h4>
                          <span className="text-sm font-bold text-brand-green block leading-tight">
                            {treatObj ? treatObj.title : appt.treatmentId}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-gray-100">
                          <div>
                            <h5 className="font-bold text-brand-green flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                              Data
                            </h5>
                            <p className="text-slate-600 font-medium">{getFormattedDate(appt.date)}</p>
                          </div>
                          <div>
                            <h5 className="font-bold text-brand-green flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-brand-gold" />
                              Horário
                            </h5>
                            <p className="text-slate-600 font-medium">{appt.time}h</p>
                          </div>
                        </div>

                        {/* Customer coordinates proof */}
                        <div className="text-[11px] text-slate-500 pt-1.5 border-t border-gray-100 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {appt.name}
                          </span>
                          <span className="text-slate-400 font-mono">{appt.phone}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reset storage buttons in bottom */}
              <div className="pt-4 border-t border-gray-150 text-center">
                <button
                  type="button"
                  onClick={handleClearAppointments}
                  className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold uppercase rounded-lg border border-red-200 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Desejo Cancelar Minhas Pré-reservas</span>
                </button>
                <span className="text-[9px] text-slate-400 block mt-2">
                  Obs: Cancelará apenas o registro no seu navegador local.
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Core Scheduling Dialog */}
      <SchedulerModal
        isOpen={schedulerOpen}
        onClose={() => setSchedulerOpen(false)}
        initialTreatmentId={selectedTreatmentId}
        onAppointmentCreated={handleAppointmentCreated}
      />

      {/* Voltar ao Topo FAB */}
      <BackToTop />

    </div>
  );
}
