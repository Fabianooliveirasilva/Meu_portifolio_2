"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EVENTS = [
  {
    year: "2022",
    role: "QA Engineer",
    company: "Tech Startup",
    desc: "Início da carreira profissional em qualidade de software. Testes manuais, criação de casos de teste e introdução às práticas de QA.",
    tags: ["QA Manual", "TestRail", "Jira", "Scrum"],
    color: "#22d3ee",
    side: "right",
  },
  {
    year: "2023",
    role: "Automation QA Engineer",
    company: "Software House",
    desc: "Atuação como QA Automation, desenvolvendo frameworks de testes E2E, integração com CI/CD e reduzindo o tempo de ciclo de releases em 40%.",
    tags: ["Cypress", "Playwright", "GitHub Actions", "Docker"],
    color: "#6366f1",
    side: "left",
  },
  {
    year: "2024",
    role: "Web Developer",
    company: "Digital Agency",
    desc: "Transição para desenvolvimento web full stack, criando aplicações React/Next.js de alta performance e contribuindo em projetos de múltiplos clientes.",
    tags: ["React", "Next.js", "TypeScript", "REST APIs"],
    color: "#a855f7",
    side: "right",
  },
  {
    year: "2025",
    role: "Full Stack Developer",
    company: "Freelancer & Projetos Próprios",
    desc: "Atuação como desenvolvedor full stack sênior, liderando entregas técnicas, arquitetura de sistemas e construção de produtos digitais completos.",
    tags: ["Node.js", "Next.js", "Docker", "AWS", "QA"],
    color: "#f472b6",
    side: "left",
  },
];

function TimelineNode({
  event,
  index,
}: {
  event: (typeof EVENTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = event.side === "left";

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-8 ${
        isLeft ? "flex-row-reverse" : "flex-row"
      } w-full`}
    >
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 60 : -60 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
        className="w-[calc(50%-2.5rem)] hidden md:block"
      >
        <div
          className="glass rounded-2xl p-6 border border-white/8 card-hover-glow cursor-default"
          style={{
            borderLeftColor: isLeft ? "transparent" : event.color + "60",
          }}
        >
          {/* Year badge */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
              style={{
                color: event.color,
                background: `${event.color}22`,
                border: `1px solid ${event.color}40`,
              }}
            >
              {event.year}
            </span>
            <span className="text-xs text-slate-500">{event.company}</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2">{event.role}</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            {event.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-mono text-slate-300 glass rounded-full border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Center node */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isVisible ? { scale: 1, opacity: 1 } : {}}
          transition={{
            delay: index * 0.15 + 0.2,
            duration: 0.5,
            type: "spring",
          }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{
            background: `linear-gradient(135deg, ${event.color}cc, ${event.color}66)`,
            boxShadow: `0 0 20px ${event.color}60, 0 0 40px ${event.color}25`,
            border: `2px solid ${event.color}80`,
          }}
        >
          {index + 1}
        </motion.div>
      </div>

      {/* Mobile card (full width) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.15, duration: 0.6 }}
        className="md:hidden w-full"
      >
        <div className="glass rounded-2xl p-5 border border-white/8">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-mono font-bold"
              style={{ color: event.color }}
            >
              {event.year}
            </span>
            <span className="text-xs text-slate-500">{event.company}</span>
          </div>
          <h3 className="text-base font-bold text-white mb-1">{event.role}</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            {event.desc}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-mono text-slate-400 glass rounded-full border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Spacer for the right side on desktop */}
      <div className="w-[calc(50%-2.5rem)] hidden md:block" />
    </div>
  );
}

export default function TimelineSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section
      id="timeline"
      className="relative py-32 section-bg"
      aria-label="Histórico de carreira"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">
            ● Trajetória
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Minha <span className="gradient-text">Carreira</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Uma jornada contínua de aprendizado, evolução e entrega de valor
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop only) */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              ref={lineRef}
              initial={{ height: "0%" }}
              animate={isVisible ? { height: "100%" } : {}}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="timeline-line w-full"
              style={{
                position: "relative",
                top: 0,
                left: 0,
                transform: "none",
              }}
            />
          </div>

          {/* Events */}
          <div className="flex flex-col gap-16">
            {EVENTS.map((event, i) => (
              <TimelineNode key={event.year} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
