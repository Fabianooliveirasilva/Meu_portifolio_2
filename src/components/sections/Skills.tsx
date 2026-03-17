"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SKILLS = [
  { name: "JavaScript", level: 92, color: "#f7df1e", icon: "JS" },
  { name: "TypeScript", level: 88, color: "#3178c6", icon: "TS" },
  { name: "React", level: 90, color: "#61dafb", icon: "⚛" },
  { name: "Next.js", level: 85, color: "#ffffff", icon: "N" },
  { name: "Node.js", level: 82, color: "#68a063", icon: "🟢" },
  { name: "Python", level: 75, color: "#4b8bbe", icon: "🐍" },
  { name: "Cypress", level: 93, color: "#17202c", icon: "C" },
  { name: "Playwright", level: 88, color: "#45ba4b", icon: "P" },
  { name: "Docker", level: 78, color: "#2496ed", icon: "🐳" },
  { name: "QA Testing", level: 95, color: "#22d3ee", icon: "✓" },
];

const TOOLS = [
  "Git",
  "GitHub Actions",
  "Jest",
  "Vitest",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Vercel",
  "Figma",
  "Linux",
  "REST APIs",
  "GraphQL",
  "Tailwind CSS",
  "Prisma",
];

function SkillBar({
  skill,
  index,
}: {
  skill: (typeof SKILLS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {/* Icon badge */}
          <span
            className="w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center"
            style={{
              background: `${skill.color}22`,
              color: skill.color,
              border: `1px solid ${skill.color}40`,
            }}
          >
            {skill.icon}
          </span>
          <span className="text-sm font-semibold text-slate-200">
            {skill.name}
          </span>
        </div>
        <span
          className="text-xs font-mono font-bold"
          style={{ color: skill.color }}
        >
          {isVisible ? skill.level : 0}%
        </span>
      </div>

      {/* Progress bar track */}
      <div className="h-2 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : {}}
          transition={{
            delay: index * 0.06 + 0.2,
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})`,
            boxShadow: `0 0 12px ${skill.color}55`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-32 section-bg"
      aria-label="Habilidades técnicas"
    >
      {/* Background glow */}
      <div
        className="absolute right-0 top-1/3 w-1/3 h-2/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at right, rgba(34,211,238,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">
            ● Tecnologias
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Minhas <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Combinação de habilidades técnicas e ferramentas para construir
            produtos excepcionais
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ── Skills Bars ── */}
          <div className="glass rounded-3xl p-8 border border-white/8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Proficiência Técnica
            </h3>
            <div className="flex flex-col gap-5">
              {SKILLS.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* ── Tools Grid + Floating Cards ── */}
          <div className="flex flex-col gap-8">
            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Frontend",
                  skills: "React · Next.js · TypeScript · Tailwind",
                  color: "#6366f1",
                  emoji: "🎨",
                },
                {
                  label: "Backend",
                  skills: "Node.js · Python · REST · SQL",
                  color: "#22d3ee",
                  emoji: "⚙️",
                },
                {
                  label: "QA & Tests",
                  skills: "Cypress · Playwright · Jest · CI/CD",
                  color: "#a855f7",
                  emoji: "🧪",
                },
                {
                  label: "DevOps",
                  skills: "Docker · GitHub Actions · Vercel · AWS",
                  color: "#f472b6",
                  emoji: "🚀",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="glass rounded-2xl p-5 border border-white/8 card-hover-glow cursor-default"
                >
                  <div className="text-3xl mb-3">{card.emoji}</div>
                  <h4
                    className="text-sm font-bold mb-2"
                    style={{ color: card.color }}
                  >
                    {card.label}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono leading-relaxed">
                    {card.skills}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Tools tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-3xl p-6 border border-white/8"
            >
              <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Ferramentas &amp; Tecnologias Adicionais
              </h3>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((tool, i) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    whileHover={{ scale: 1.08 }}
                    className="px-3 py-1.5 text-xs font-mono text-slate-300 glass rounded-full border border-white/10 hover:border-indigo-500/40 hover:text-indigo-300 cursor-default transition-colors"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
