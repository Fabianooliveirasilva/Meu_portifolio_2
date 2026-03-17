"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  ArrowUpRight,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

/* WhatsApp SVG icon (não existe no Lucide) */
function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── EmailJS config ───────────────────────────────────────────────────────────
// 1. Acesse https://www.emailjs.com e crie uma conta gratuita
// 2. Crie um "Email Service" (Gmail, Outlook etc.) → copie o SERVICE_ID
// 3. Crie um "Email Template" com as variáveis: {{from_name}}, {{from_email}}, {{message}}
//    → copie o TEMPLATE_ID
// 4. Em Account → API Keys → copie o PUBLIC_KEY
// 5. Substitua os valores abaixo:
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

type FormStatus = "idle" | "loading" | "success" | "error";

const CONTACTS = [
  {
    label: "LinkedIn",
    handle: "/in/fabiano-silva-oliveira",
    href: "https://www.linkedin.com/in/fabiano-silva-oliveira/",
    icon: <Linkedin size={22} />,
    color: "#0a66c2",
    bg: "rgba(10,102,194,0.12)",
    desc: "Conecte-se profissionalmente",
  },
  {
    label: "GitHub",
    handle: "@Fabianooliveirasilva",
    href: "https://github.com/Fabianooliveirasilva/",
    icon: <Github size={22} />,
    color: "#e2e8f0",
    bg: "rgba(226,232,240,0.08)",
    desc: "Veja meu código e projetos",
  },
  {
    label: "Email",
    handle: "o_fabiano@hotmail.com",
    href: "mailto:o_fabiano@hotmail.com",
    icon: <Mail size={22} />,
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.12)",
    desc: "Me envie uma mensagem",
  },
  {
    label: "WhatsApp",
    handle: "+55 (xx) xxxxx-xxxx",
    // Substitua o número abaixo pelo seu (só dígitos com DDD e DDI, ex: 5511999999999)
    href: "https://wa.me/55XXXXXXXXXXX",
    icon: <WhatsAppIcon size={22} />,
    color: "#25d366",
    bg: "rgba(37,211,102,0.12)",
    desc: "Respondo rápido por aqui!",
  },
];

/* ── Contact Form Component ─────────────────────── */
function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      formRef.current?.reset();
      // Reset to idle after 6 seconds
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg(
        "Falha ao enviar. Verifique as configurações do EmailJS e tente novamente.",
      );
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="mb-12"
    >
      <div className="glass rounded-3xl p-8 md:p-10 border border-white/8 relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-1">
            {t.contact.form_title}{" "}
            <span className="gradient-text">Mensagem</span>
          </h3>
          <p className="text-sm text-slate-400 mb-8">{t.contact.form_reply}</p>

          <AnimatePresence mode="wait">
            {/* Success state */}
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4 py-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center"
                >
                  <CheckCircle size={32} className="text-emerald-400" />
                </motion.div>
                <p className="text-lg font-bold text-white">
                  {t.contact.success_title}
                </p>
                <p className="text-sm text-slate-400">
                  {t.contact.success_msg}
                </p>
              </motion.div>
            )}

            {/* Form state (idle or error) */}
            {(status === "idle" ||
              status === "loading" ||
              status === "error") && (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 gap-5"
              >
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="from_name"
                    className="text-xs font-semibold text-slate-300 uppercase tracking-wider"
                  >
                    {t.contact.form_name}
                  </label>
                  <input
                    id="from_name"
                    name="from_name"
                    type="text"
                    required
                    placeholder={t.contact.form_name_ph}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="from_email"
                    className="text-xs font-semibold text-slate-300 uppercase tracking-wider"
                  >
                    {t.contact.form_email}
                  </label>
                  <input
                    id="from_email"
                    name="from_email"
                    type="email"
                    required
                    placeholder={t.contact.form_email_ph}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold text-slate-300 uppercase tracking-wider"
                  >
                    {t.contact.form_subject}
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder={t.contact.form_subject_ph}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold text-slate-300 uppercase tracking-wider"
                  >
                    {t.contact.form_message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t.contact.form_message_ph}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all resize-none"
                  />
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="md:col-span-2 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                    >
                      <AlertCircle size={16} className="flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    data-cursor-hover
                    className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #22d3ee)",
                      boxShadow:
                        status !== "loading"
                          ? "0 0 28px rgba(99,102,241,0.4)"
                          : "none",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        {t.contact.form_sending}
                      </>
                    ) : (
                      <>
                        <Send size={17} />
                        {t.contact.form_send}
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function ContactSection() {
  const { t } = useLanguage();
  return (
    <section
      id="contact"
      className="relative py-32 section-bg"
      aria-label="Contato"
    >
      {/* Background blobs */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-[800px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, #6366f1 0%, #22d3ee 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">
            ● {t.contact.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {t.contact.heading}{" "}
            <span className="gradient-text">{t.contact.heading_accent}</span>
          </h2>

          {/* CTA quote */}
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl font-bold gradient-text-pink max-w-2xl mx-auto"
          >
            &ldquo;{t.contact.quote}&rdquo;
          </motion.p>

          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            {t.contact.desc}
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {CONTACTS.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              data-cursor-hover
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group glass rounded-2xl p-6 border border-white/8 flex items-center gap-5 transition-all duration-300 overflow-hidden relative"
              style={{
                ["--contact-color" as string]: contact.color,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at top left, ${contact.color}15 0%, transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: contact.bg,
                  color: contact.color,
                  border: `1px solid ${contact.color}35`,
                  boxShadow: `0 0 20px ${contact.color}20`,
                }}
              >
                {contact.icon}
              </div>

              {/* Text */}
              <div className="relative z-10 flex-1 min-w-0">
                <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-0.5">
                  {contact.label}
                </p>
                <p className="text-sm font-semibold text-white truncate">
                  {contact.handle}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t.contact.contact_descs[i].desc}
                </p>
              </div>

              {/* Arrow icon */}
              <ArrowUpRight
                size={18}
                className="text-slate-500 group-hover:text-white flex-shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 relative z-10"
                style={{ color: "inherit" }}
              />
            </motion.a>
          ))}
        </div>

        {/* ── Contact Form ── */}
        <ContactForm />

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-px mx-auto max-w-xs mb-12 origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)",
          }}
        />

        {/* Footer text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-slate-500 text-sm font-mono">
            {t.contact.footer_made} <span className="text-pink-400">♥</span>{" "}
            usando <span className="text-cyan-400">Next.js</span>
            {" · "}
            <span className="text-indigo-400">React</span>
            {" · "}
            <span className="text-purple-400">Three.js</span>
            {" · "}
            <span className="text-pink-400">Framer Motion</span>
          </p>
          <p className="text-slate-600 text-xs mt-2">
            © {new Date().getFullYear()} Dev Portfolio.{" "}
            {t.contact.footer_rights}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
