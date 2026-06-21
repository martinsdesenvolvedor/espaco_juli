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
