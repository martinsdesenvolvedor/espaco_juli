import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, Check, Sparkles, User, Mail, Phone, BookOpen } from "lucide-react";
import { TREATMENTS_DATA } from "../data/treatments";
import { AppointmentInput } from "../types";
import emailjs from '@emailjs/browser';

interface SchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatmentId?: string;
  onAppointmentCreated: (appointment: AppointmentInput) => void;
}

export default function SchedulerModal({
  isOpen,
  onClose,
  initialTreatmentId = "",
  onAppointmentCreated,
}: SchedulerModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AppointmentInput>({
    name: "",
    email: "",
    phone: "",
    treatmentId: initialTreatmentId,
    date: "",
    time: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial treatment if provided and changed
  useEffect(() => {
    if (initialTreatmentId) {
      setFormData((prev) => ({ ...prev, treatmentId: initialTreatmentId }));
    }
  }, [initialTreatmentId]);

  // Generate next 10 available days (excluding Sundays)
  const getNextAvailableDays = () => {
    const days = [];
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    
    let current = new Date();
    // Start tracking from tomorrow
    current.setDate(current.getDate() + 1);

    while (days.length < 10) {
      if (current.getDay() !== 0) { // Skip Sundays
        days.push({
          dayOfWeek: weekdays[current.getDay()],
          dayOfMonth: current.getDate(),
          month: months[current.getMonth()],
          dateString: current.toISOString().split('T')[0],
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const availableDays = getNextAvailableDays();

  const availableTimes = [
    "08:00", "09:30", "11:00", "14:00", "15:30", "17:00", "18:30"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDateSelect = (index: number, dateString: string) => {
    setSelectedDateIndex(index);
    setFormData((prev) => ({ ...prev, date: dateString }));
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: "" }));
    }
  };

  const handleTimeSelect = (timeSlot: string) => {
    setFormData((prev) => ({ ...prev, time: timeSlot }));
    if (errors.time) {
      setErrors((prev) => ({ ...prev, time: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.treatmentId) newErrors.treatmentId = "Por favor, selecione um tratamento.";
    if (!formData.date) newErrors.date = "Por favor, selecione o dia.";
    if (!formData.time) newErrors.time = "Por favor, selecione o horário.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "O nome deve conter pelo menos 3 caracteres.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Insira um endereço de e-mail válido.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone celular é obrigatório.";
    } else {
      // Basic phone format check
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.length < 10) {
        newErrors.phone = "Insira um número de telefone celular válido (DDD + número).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (step === 2 && validateStep2()) {
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID || "",
        import.meta.env.VITE_TEMPLATE_ID2 || "",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          treatment: selectedTreatmentObj?.title,
          date: getSelectedDateDisplay(formData.date),
          time: formData.time,
          notes: formData.notes,
        },
        import.meta.env.VITE_PUBLIC_KEY || ""
      );
      
      onAppointmentCreated(formData);
      setStep(3);
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Houve um erro ao enviar. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }
};

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      treatmentId: initialTreatmentId,
      date: "",
      time: "",
      notes: "",
    });
    setSelectedDateIndex(null);
    setStep(1);
    onClose();
  };

  const selectedTreatmentObj = TREATMENTS_DATA.find((t) => t.id === formData.treatmentId);

  // Formated date display e.g. "12 de Jan, Quinta-feira"
  const getSelectedDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, monthNum, dayNum] = dateStr.split("-");
    const d = new Date(parseInt(year), parseInt(monthNum) - 1, parseInt(dayNum));
    const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return `${d.getDate()} de ${months[d.getMonth()]}, ${weekdays[d.getDay()]}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop blurring click through */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#040e0c]/85 backdrop-blur-sm"
          />

          {/* Modal content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-gold/20 z-10"
            id="scheduler-modal-box"
          >
            {/* Header branding band */}
            <div className="bg-brand-green px-6 py-5 flex justify-between items-center border-b border-brand-gold/30">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full border border-brand-gold flex items-center justify-center bg-brand-green/80">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-white tracking-wide">
                    Agende sua Consulta
                  </h3>
                  <p className="text-xs text-brand-gold">Espaço Djully Firmo</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Minimizar formulário"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Steps indicator */}
            {step < 3 && (
              <div className="bg-[#fcfbf9] px-6 py-3 border-b border-gray-100 flex justify-between items-center text-xs text-gray-500">
                <span className={`font-medium ${step === 1 ? "text-brand-green font-bold" : ""}`}>
                  1. Preferências de Data & Hora
                </span>
                <div className="h-px bg-gray-200 flex-1 mx-4" />
                <span className={`font-medium ${step === 2 ? "text-brand-green font-bold" : ""}`}>
                  2. Suas Informações de Contato
                </span>
              </div>
            )}

            {/* Step 1: Selection Grid */}
            {step === 1 && (
              <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                {/* Treatment Select */}
                <div className="space-y-2">
                  <label htmlFor="treatmentId" className="block text-sm font-semibold text-brand-green">
                    Tratamento Desejado
                  </label>
                  <div className="relative">
                    <select
                      id="treatmentId"
                      name="treatmentId"
                      value={formData.treatmentId}
                      onChange={handleInputChange}
                      className="w-full pl-3 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all text-slate-800"
                    >
                      <option value="" disabled>Escolha um serviço...</option>
                      {TREATMENTS_DATA.map((treatment) => (
                        <option key={treatment.id} value={treatment.id}>
                          {treatment.title} ({treatment.duration} • {treatment.price})
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.treatmentId && (
                    <p className="text-red-600 text-xs mt-1 font-medium">{errors.treatmentId}</p>
                  )}
                </div>

                {/* Date Grid */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-semibold text-brand-green">
                      Escolha o Dia do Atendimento (Próximos Dias)
                    </label>
                    <span className="text-[11px] text-brand-green/70 font-medium">Domingos fechado</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {availableDays.map((day, dIdx) => (
                      <button
                        type="button"
                        key={dIdx}
                        onClick={() => handleDateSelect(dIdx, day.dateString)}
                        className={`py-2 px-1 rounded-lg text-center flex flex-col justify-center border transition-all duration-200 cursor-pointer ${
                          selectedDateIndex === dIdx
                            ? "bg-brand-green border-brand-gold text-white shadow-md shadow-brand-green/20"
                            : "bg-brand-cream border-gray-200 text-brand-green hover:border-brand-gold hover:bg-brand-green/5"
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-wider opacity-75">{day.dayOfWeek}</span>
                        <span className="text-sm font-bold block my-0.5">{day.dayOfMonth}</span>
                        <span className="text-[10px] uppercase font-semibold">{day.month}</span>
                      </button>
                    ))}
                  </div>
                  {errors.date && (
                    <p className="text-red-600 text-xs mt-1 font-medium">{errors.date}</p>
                  )}
                </div>

                {/* Time Slots */}
                <div className="space-y-2 pt-1">
                  <label className="block text-sm font-semibold text-brand-green">
                    Horários Disponíveis para Consulta
                  </label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {availableTimes.map((timeSlot) => (
                      <button
                        type="button"
                        key={timeSlot}
                        onClick={() => handleTimeSelect(timeSlot)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                          formData.time === timeSlot
                            ? "bg-brand-gold border-brand-gold text-white shadow-md"
                            : "bg-white border-gray-200 text-gray-700 hover:border-brand-green/50 hover:bg-brand-cream"
                        }`}
                      >
                        {timeSlot}
                      </button>
                    ))}
                  </div>
                  {errors.time && (
                    <p className="text-red-600 text-xs mt-1 font-medium">{errors.time}</p>
                  )}
                </div>

                {/* Pricing disclosure banner */}
                {selectedTreatmentObj && (
                  <div className="bg-brand-cream border-l-4 border-brand-gold p-3 rounded-r-lg mt-3">
                    <p className="text-xs text-slate-600">
                      Você selecionou: <strong className="text-slate-900">{selectedTreatmentObj.title}</strong>
                    </p>
                    <p className="text-xs font-medium text-slate-800 mt-1">
                      Tempo estimado: {selectedTreatmentObj.duration} | Valor estimado: <span className="text-brand-green font-bold">{selectedTreatmentObj.price}</span>
                    </p>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-brand-green hover:bg-brand-green/90 text-white font-medium text-sm rounded-lg transition-colors cursor-pointer shadow-md shadow-brand-green/10"
                  >
                    Continuar para Dados Pessoais
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Patient Info */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="bg-brand-cream p-4 rounded-xl mb-4 text-xs text-slate-700 border border-slate-200/60 shadow-sm flex flex-col sm:flex-row justify-between gap-2">
                  <div>
                    <span className="block font-semibold text-brand-green text-sm mb-1">Resumo da Reserva</span>
                    <strong className="text-slate-900">{selectedTreatmentObj?.title}</strong>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="flex items-center sm:justify-end font-medium">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-brand-gold" />
                      {getSelectedDateDisplay(formData.date)}
                    </p>
                    <p className="flex items-center sm:justify-end mt-1 font-medium">
                      <Clock className="w-3.5 h-3.5 mr-1 text-brand-gold" />
                      Às {formData.time} horas
                    </p>
                  </div>
                </div>

                {/* Input Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-700">
                    Seu Nome Completo *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: Cleusa Maria"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green text-slate-800"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-0.5 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Input Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700">
                    Seu Melhor E-mail *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu.email@exemplo.com"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green text-slate-800"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-0.5 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Input Phone */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-xs font-semibold text-gray-700">
                    Telefone Celular (WhatsApp) *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(47) 99999-9999"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green text-slate-800"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-0.5 font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* Input Notes */}
                <div className="space-y-1">
                  <label htmlFor="notes" className="block text-xs font-semibold text-gray-700">
                    Mensagem, Dor ou Patologias (Opcional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Ex: Sinto dores intensas no canto interno da unha do dedão ao calçar tênis."
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green text-slate-800"
                  />
                </div>

                {/* Terms assurance */}
                <p className="text-[10px] text-gray-500 text-left">
                  * Ao enviar, o consultório receberá sua solicitação de pré-agendamento e entrará em contato via WhatsApp/E-mail nas próximas horas para confirmar o horário final.
                </p>

                {/* Footer Controls */}
                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    // ... (classes do botão voltar)
                  >
                    Voltar
                  </button>

                  {/* SUBSTITUA O SEU BOTÃO ATUAL POR ESTE AQUI: */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2.5 bg-brand-green hover:bg-brand-green/90 text-white font-medium text-sm rounded-lg transition-colors cursor-pointer flex items-center space-x-1 shadow-md shadow-brand-green/15 hover:shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? "Enviando..." : (
                      <>
                        <BookOpen className="w-4 h-4 mr-1 text-brand-gold" />
                        <span>Solicitar Agendamento</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Success State */}
            {step === 3 && (
              <div className="p-8 text-center space-y-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-16 h-16 bg-green-100 border border-green-300 rounded-full flex items-center justify-center mx-auto text-green-600"
                >
                  <Check className="w-10 h-10" />
                </motion.div>

                <div className="space-y-2">
                  <h4 className="font-serif text-2xl font-bold text-brand-green">
                    Solicitação Enviada!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Prezado(a) <strong className="text-slate-900">{formData.name}</strong>, sua solicitação de pré-agendamento foi recebida com sucesso!
                  </p>
                </div>

                <div className="bg-[#faf9f6] p-4 rounded-xl border border-gray-200 max-w-sm mx-auto text-left text-xs space-y-1.5 text-slate-700">
                  <p><b className="text-slate-900">Tratamento:</b> {selectedTreatmentObj?.title}</p>
                  <p><b className="text-slate-900">Data:</b> {getSelectedDateDisplay(formData.date)}</p>
                  <p><b className="text-slate-900">Horário Solicitado:</b> {formData.time}h</p>
                  <p><b className="text-slate-900">WhatsApp de Contato:</b> {formData.phone}</p>
                </div>

                <p className="text-xs text-brand-gold font-medium leading-relaxed">
                <br />
                  A Dra. Djully Firmo entrará em contato via WhatsApp para formalizar seu encaixe!
                </p>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-8 py-2.5 bg-brand-green hover:bg-brand-green/90 text-white font-semibold text-sm rounded-lg transition-colors cursor-pointer"
                  >
                    Concluir e Voltar
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
