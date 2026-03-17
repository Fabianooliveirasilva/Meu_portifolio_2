"use client";

import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Code2, TestTube, Server, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── Animated counter hook ───────────────────────── */
function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return { count, ref };
}

/* ── Individual stat with counter ───────────────── */
function StatCounter({
  target,
  suffix,
  label,
  color,
}: {
  target: number;
  suffix: string;
  label: string;
  color: string;
}) {
  const { count, ref } = useCounter(target);

  return (
    <div ref={ref} className="text-center md:text-left">
      <motion.p
        className="text-3xl font-black tabular-nums"
        style={{ color, textShadow: `0 0 20px ${color}80` }}
      >
        {count}
        {suffix}
      </motion.p>
      <p className="text-xs text-slate-400 font-mono">{label}</p>
    </div>
  );
}

const FOCUS_ICONS = [
  { icon: <TestTube size={22} />, color: "#22d3ee" },
  { icon: <Code2 size={22} />, color: "#6366f1" },
  { icon: <Server size={22} />, color: "#a855f7" },
  { icon: <Cpu size={22} />, color: "#f472b6" },
];

/* 3D tilt card effect on mouse move */
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-150, 150], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  const { t } = useLanguage();
  return (
    <section
      id="about"
      className="relative py-32 section-bg"
      aria-label="Sobre mim"
    >
      {/* Background glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at left, rgba(168,85,247,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">
            ● {t.about.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t.about.heading}{" "}
            <span className="gradient-text">{t.about.heading_accent}</span>
          </h2>
        </motion.div>

        {/* Main card with tilt */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <TiltCard>
            <div
              className="glass rounded-3xl p-8 md:p-12 border border-neon-animate relative overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Inner glow top-right */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
                }}
              />

              <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center relative z-10">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="relative w-36 h-36">
                    {/* Glow ring */}
                    <div
                      className="absolute inset-0 rounded-full animate-spin-slow"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #6366f1, #22d3ee, #a855f7, #f472b6, #6366f1)",
                        padding: "2px",
                        borderRadius: "50%",
                      }}
                    />
                    {/* Avatar circle */}
                    <div className="absolute inset-[3px] rounded-full bg-[#0f172a] overflow-hidden">
                      <img
                        src="/avatar.jpg"
                        alt="Fabiano Oliveira"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <span className="text-xs font-mono text-emerald-400 glass px-3 py-1 rounded-full border border-emerald-500/30">
                    ● {t.about.open_to_work}
                  </span>
                </motion.div>

                {/* Bio */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {t.about.role}{" "}
                    <span className="gradient-text">{t.about.role_accent}</span>
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6 max-w-xl">
                    {t.about.bio}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 justify-center md:justify-start mb-6">
                    {[
                      {
                        target: 50,
                        suffix: "+",
                        label: t.about.stat_projects,
                        color: "#22d3ee",
                      },
                      {
                        target: 3,
                        suffix: "+",
                        label: t.about.stat_years,
                        color: "#6366f1",
                      },
                      {
                        target: 100,
                        suffix: "%",
                        label: t.about.stat_dedication,
                        color: "#a855f7",
                      },
                    ].map((stat) => (
                      <StatCounter
                        key={stat.label}
                        target={stat.target}
                        suffix={stat.suffix}
                        label={stat.label}
                        color={stat.color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Focus areas grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 relative z-10">
                {FOCUS_ICONS.map((area, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="glass rounded-2xl p-4 border border-white/8 cursor-default transition-shadow"
                    style={{ ["--hover-color" as string]: area.color }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{
                        background: `${area.color}22`,
                        color: area.color,
                      }}
                    >
                      {area.icon}
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">
                      {t.about.focus[i].label}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {t.about.focus[i].desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
