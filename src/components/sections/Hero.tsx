"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Github, Eye, ChevronDown } from "lucide-react";

// Dynamic import to avoid SSR issues with Three.js
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-t-cyan-400 border-indigo-500/20 animate-spin" />
    </div>
  ),
});

/* Animated text that cycles through titles */
const TITLES = [
  "Full Stack Developer",
  "QA Automation Engineer",
  "React & Next.js Specialist",
  "Scalable Systems Builder",
];

function AnimatedTitle() {
  return (
    <motion.div className="flex flex-wrap justify-center md:justify-start gap-2 items-center">
      {TITLES[0].split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.04, duration: 0.4 }}
          className="text-xl md:text-2xl font-mono font-medium text-cyan-400"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden animated-bg grid-bg"
      aria-label="Seção inicial - apresentação"
    >
      {/* Background glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[85vh]">
          {/* ── Left: Text Content ── */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center md:justify-start gap-2"
            >
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-emerald-500/30 text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Disponível para projetos
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-slate-400 text-lg mb-2 font-mono">
                Olá, eu sou
              </p>
              <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight">
                <span className="gradient-text">Fabiano</span>
                <br />
                <span className="text-white">Oliveira</span>
              </h1>
            </motion.div>

            {/* Animated title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <AnimatedTitle />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="text-slate-400 text-lg max-w-md mx-auto md:mx-0 leading-relaxed"
            >
              Criando experiências digitais de alto impacto com código limpo,
              performance e automação de qualidade.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a
                href="#projects"
                data-cursor-hover
                className="group relative flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #22d3ee)",
                  boxShadow: "0 0 30px rgba(99,102,241,0.4)",
                }}
              >
                {/* Shimmer overlay */}
                <span className="absolute inset-0 animate-shimmer opacity-50 rounded-full" />
                <Eye size={18} className="relative z-10" />
                <span className="relative z-10">Ver Projetos</span>
              </a>

              <a
                href="https://github.com/Fabianooliveirasilva/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-slate-200 glass border border-white/15 hover:border-indigo-500/60 hover:text-white transition-all duration-300 hover:scale-105 hover:glow-indigo"
              >
                <Github size={18} />
                GitHub
              </a>
            </motion.div>

            {/* Tech stack badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.6 }}
              className="flex flex-wrap gap-2 justify-center md:justify-start"
            >
              {["Next.js", "React", "TypeScript", "Node.js", "Cypress"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono text-slate-300 rounded-full glass border border-white/10"
                  >
                    {tech}
                  </span>
                ),
              )}
            </motion.div>
          </div>

          {/* ── Right: 3D Scene ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="relative h-[400px] md:h-[580px] w-full"
          >
            {/* Glowing backdrop for the 3D scene */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20 animate-pulse-glow"
              style={{
                background:
                  "radial-gradient(circle, #6366f1 0%, #22d3ee 50%, transparent 70%)",
              }}
            />
            <HeroScene />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs font-mono tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} className="text-cyan-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
