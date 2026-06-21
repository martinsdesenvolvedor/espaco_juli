import React, { useState } from "react";
import emailjs from '@emailjs/browser'; // 1. IMPORTAÇÃO
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Check, 
  AlertCircle, 
  Navigation,
  MessageSquare
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "O preenchimento do nome é obrigatório.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Por favor, digite o seu nome completo.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "O e-mail é obrigatório para retornarmos.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Insira um endereço de e-mail válido.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Informe o seu telefone celular (WhatsApp).";
    }

    if (!formData.subject) {
      newErrors.subject = "Selecione o assunto da mensagem.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Por favor, escreva sua dúvida ou mensagem.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true); // <--- ALTERAÇÃO AQUI
      
      try {
        // <--- ALTERAÇÃO AQUI (CHAMADA DO EMAILJS)
        await emailjs.send(
          import.meta.env.VITE_SERVICE_ID || "",
          import.meta.env.VITE_TEMPLATE_ID || "",
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          },
          import.meta.env.VITE_PUBLIC_KEY || ""
        );

        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } catch (error) {
        console.error("Erro ao enviar:", error);
        alert("Ocorreu um erro ao enviar. Tente novamente.");
      } finally {
        setIsLoading(false); // <--- ALTERAÇÃO AQUI
      }
    }
  };

  return (
    <section className="py-20 bg-brand-cream/40" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-green font-bold block">
            Fale Fielmente Conosco
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-green tracking-tight">
            Canais de Atendimento & Localização
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto rounded" />
          <p className="text-slate-600 text-sm sm:text-base font-light">
            Tem alguma dúvida sobre calosidades, unhas encravadas, órteses ou orçamentos? Envie uma mensagem ou agende diretamente seu horário!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-grid-row">
          
          {/* LEFT COLUMN: CONTACT DETAILS & OPENING MAP */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick cards */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-sm space-y-6">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green">
                Informações de Contato
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Physical address */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-brand-green/5 rounded-lg border border-brand-green/5 shrink-0 text-brand-green">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-brand-green">Endereço Clínico</h4>
                    <address className="not-italic text-slate-600 font-light leading-relaxed mt-0.5">
                      Av. Eugênio Krause, 1630 - Sala 3<br />
                      Centro, Penha - SC, 88385-000
                    </address>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-brand-green/5 rounded-lg border border-brand-green/5 shrink-0 text-brand-green">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-brand-green">WhatsApp Atendimento</h4>
                    <a 
                      href="https://wa.me/5547992481857" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 font-light hover:text-brand-green hover:underline mt-0.5 block"
                    >
                      (47) 99248-1857
                    </a>
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-brand-green/5 rounded-lg border border-brand-green/5 shrink-0 text-brand-green">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-brand-green">E-mail Corporativo</h4>
                    <a 
                      href="mailto:contato@djullyfirmopodologia.com.br"
                      className="text-slate-600 font-light hover:text-brand-green hover:underline mt-0.5 block"
                    >
                      contato@djullyfirmopodologia.com.br
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-brand-green/5 rounded-lg border border-brand-green/5 shrink-0 text-brand-green">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-brand-green">Horários de Funcionamento</h4>
                    <div className="text-slate-600 font-light mt-0.5 space-y-0.5">
                      <p>Segunda a Sexta: 08:00h às 12:00h • 13:30h às 19:00h</p>
                      <p>Sábados: 08:00h às 12:00h</p>
                      <p className="text-brand-gold font-medium">Domingos: Fechado</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* MAP EMBED: Google Maps Embedded map container */}
            <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm p-2" id="map-holder">
              <div className="relative w-full h-[230px] rounded-xl overflow-hidden border border-gray-100">
                <iframe
                  title="Mapa de Localização Espaço Djully Firmo"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.85107058869!2d-48.6483582236173!3d-26.772990976730312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94df19914b4344cb%3A0xe2128a1ea52dfbb4!2sAv.%20Eug%C3%AAnio%20Krause%20-%20Penha%2C%20SC!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
              <div className="p-3 bg-brand-cream text-center flex justify-between items-center text-xs text-slate-500 rounded-b-xl border-t border-gray-50">
                <span className="flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-brand-green" />
                  Localizado no Centro de Penha / SC
                </span>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-brand-gold hover:underline"
                >
                  Abrir Rotas
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: RICH INTERACTIVE CONTACT FORM */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-sm">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green mb-1">
              Envie uma Mensagem Direta
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-light mb-6">
              Preencha o formulário abaixo para nos enviar sua dúvida. Nós responderemos por e-mail ou retornaremos uma ligação pelo WhatsApp.
            </p>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center bg-green-50 rounded-2xl border border-green-300 space-y-4"
                  id="form-success-box"
                >
                  <div className="w-12 h-12 bg-green-100 border border-green-300 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-brand-green">Mensagem Recebida com Sucesso!</h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Agradecemos seu contato. Sua mensagem foi encaminhada e a equipe do <strong>Espaço Djully Firmo</strong> responderá o mais breve possível.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-brand-green hover:underline"
                  >
                    Enviar nova dúvida
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="clinical-contact-form">
                  
                  {/* Row: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label htmlFor="form-name" className="block text-xs font-semibold text-brand-green/90">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Amanda Borges"
                        className={`w-full py-2 px-3 bg-white border rounded-lg text-sm text-brand-green focus:outline-none focus:ring-1.5 focus:ring-brand-green ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-600 text-[10px] mt-0.5 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label htmlFor="form-email" className="block text-xs font-semibold text-brand-green/90">
                        Endereço de E-mail *
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="nome@domínio.com"
                        className={`w-full py-2 px-3 bg-white border rounded-lg text-sm text-brand-green focus:outline-none focus:ring-1.5 focus:ring-brand-green ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-600 text-[10px] mt-0.5 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row: Phone and Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1">
                      <label htmlFor="form-phone" className="block text-xs font-semibold text-brand-green/90">
                        WhatsApp Atendimento *
                      </label>
                      <input
                        type="tel"
                        id="form-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(47) 99999-9999"
                        className={`w-full py-2 px-3 bg-white border rounded-lg text-sm text-brand-green focus:outline-none focus:ring-1.5 focus:ring-brand-green ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-[10px] mt-0.5 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="space-y-1">
                      <label htmlFor="form-subject" className="block text-xs font-semibold text-brand-green/90">
                        Assunto Principal *
                      </label>
                      <select
                        id="form-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full py-2 px-3 bg-white border rounded-lg text-sm text-brand-green focus:outline-none focus:ring-1.5 focus:ring-brand-green ${
                          errors.subject ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="" disabled>Escolha o assunto...</option>
                        <option value="Agendamentos">Agendamento de Consulta</option>
                        <option value="Dúvidas Tecnicas">Dúvida sobre Tratamentos</option>
                        <option value="Órteses/FPM">Perguntas sobre Órteses / Fissuras</option>
                        <option value="Outros">Outras Parcerias</option>
                      </select>
                      {errors.subject && (
                        <p className="text-red-600 text-[10px] mt-0.5 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="form-message" className="block text-xs font-semibold text-brand-green/90">
                      Sua Dúvida ou Detalhes Plantares *
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Explique-nos qual desconforto sente nos pés, qual a duração e se já fez outros tratamentos."
                      className={`w-full p-3 bg-white border rounded-lg text-sm text-brand-green focus:outline-none focus:ring-1.5 focus:ring-brand-green ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-600 text-[10px] mt-0.5 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading} // <--- Bloqueia novos cliques enquanto envia
                      className="w-full sm:w-auto px-6 py-3 bg-brand-green hover:bg-brand-green/90 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow flex items-center justify-center space-x-1.5 hover:shadow-md"
                    >
                      <Send className="w-4 h-4 text-brand-gold" />
                      <span>{isLoading ? "Enviando..." : "Enviar Mensagem"}</span>
                    </button>
                  </div>

                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
