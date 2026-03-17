"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Project {
  id: number;
  title: string;
  description: string;
  longDesc: string;
  tags: string[];
  color: string;
  emoji: string;
  live?: string;
  repo?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Plataforma SaaS de Gestão de Tarefas",
    description:
      "App web estilo Jira/ClickUp com controle de times, projetos e tarefas.",
    longDesc:
      "Centraliza times, projetos e tarefas em único painel. Usa React + TypeScript + Vite, TanStack Query para cache/optimistic updates, Zustand, React Hook Form + Zod e Supabase para auth, DB e RLS.",
    tags: [
      "React",
      "TypeScript",
      "Supabase",
      "TanStack Query",
      "Zod",
      "Tailwind",
    ],
    color: "#6366f1",
    emoji: "🗂️",
    repo: "https://github.com/Fabianooliveirasilva/Plataforma-SaaS-de-Gest-o-de-Tarefas-com-Times",
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio NEON 3D",
    description:
      "Portfolio interativo com elementos 3D, animações fluidas e design neon.",
    longDesc:
      "Este mesmo portfolio! Construído com Next.js 16, React Three Fiber, Framer Motion 12 e TailwindCSS v4. Conta com cena 3D holográfica, cursor customizado, tema claro/escuro e formulário de contato funcional.",
    tags: [
      "Next.js",
      "Three.js",
      "Framer Motion",
      "TypeScript",
      "TailwindCSS v4",
    ],
    color: "#a855f7",
    emoji: "✨",
    repo: "https://github.com/Fabianooliveirasilva/Meu_portifolio_2",
    featured: true,
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    description:
      "Dashboard moderno com gráficos interativos, lazy loading e tema claro/escuro.",
    longDesc:
      "Interface administrativa com visualizações ricas em dados, lazy load de gráficos para performance, tokens de design para tema claro/escuro e deploy automatizado via GitHub Actions Pages.",
    tags: ["React", "TypeScript", "Vite", "CSS", "GitHub Actions"],
    color: "#22d3ee",
    emoji: "📊",
    repo: "https://github.com/Fabianooliveirasilva/dash-board",
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio TypeScript",
    description: "Primeiro portfolio profissional desenvolvido em TypeScript.",
    longDesc:
      "Portfolio anterior desenvolvido com TypeScript, apresentando projetos, habilidades e informações de contato com design responsivo e moderno.",
    tags: ["TypeScript", "React", "CSS"],
    color: "#f472b6",
    emoji: "🧑‍💻",
    repo: "https://github.com/Fabianooliveirasilva/Meu_Portifolio",
    featured: false,
  },
  {
    id: 5,
    title: "Landing Page — LED Insulfilm",
    description:
      "Landing page profissional para empresa de LED e insulfilm automotivo.",
    longDesc:
      "Página de vendas responsiva com seções de serviços, galeria, depoimentos e CTA. Desenvolvida com HTML semântico e CSS moderno para conversão de leads.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "#f59e0b",
    emoji: "💡",
    repo: "https://github.com/Fabianooliveirasilva/Landing_Page_Led_insufilm",
    featured: false,
  },
  {
    id: 6,
    title: "Landing Page — Pet Shop",
    description:
      "Landing page moderna para pet shop com design atrativo e responsivo.",
    longDesc:
      "Página institucional para pet shop com apresentação dos serviços, galeria de atendimentos, área de agendamento e design pensado para um público que ama animais.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "#10b981",
    emoji: "🐾",
    repo: "https://github.com/Fabianooliveirasilva/Landing_Page_pet_Shop",
    featured: false,
  },
  {
    id: 7,
    title: "Login UI/UX",
    description:
      "Interface de login com foco em UI/UX, acessibilidade e experiência do usuário.",
    longDesc:
      "Projeto de estudo focado em design de interfaces de autenticação. Inclui telas de login, cadastro e recuperação de senha com atenção à hierarquia visual e micro-interações.",
    tags: ["CSS", "HTML", "UI/UX"],
    color: "#6366f1",
    emoji: "🔐",
    repo: "https://github.com/Fabianooliveirasilva/Login_UI.UX",
    featured: false,
  },
  {
    id: 8,
    title: "Testes QA Automatizados",
    description:
      "Suite de automação de testes para garantia de qualidade de software.",
    longDesc:
      "Projeto de automação de testes em JavaScript cobrindo casos de uso críticos. Implementa boas práticas de QA com scripts de validação e relatórios de execução.",
    tags: ["JavaScript", "QA", "Automação"],
    color: "#22d3ee",
    emoji: "🧪",
    repo: "https://github.com/Fabianooliveirasilva/teste_QA",
    featured: false,
  },
  {
    id: 9,
    title: "Calculadora Vue",
    description:
      "Calculadora funcional construída com Vue.js, com interface limpa.",
    longDesc:
      "Calculadora completa desenvolvida com Vue.js explorando reatividade, computed properties e event handling do framework. Interface responsiva com operações aritméticas básicas.",
    tags: ["Vue.js", "JavaScript", "CSS"],
    color: "#a855f7",
    emoji: "🧮",
    repo: "https://github.com/Fabianooliveirasilva/calculadora",
    featured: false,
  },
  {
    id: 10,
    title: "Landing Page Empresarial",
    description:
      "Landing page institucional com design moderno e seções completas.",
    longDesc:
      "Página institucional responsiva com hero section, seção de serviços, depoimentos e rodapé. Desenvolvida com HTML e CSS puros para máxima compatibilidade.",
    tags: ["HTML", "CSS"],
    color: "#f472b6",
    emoji: "🌐",
    repo: "https://github.com/Fabianooliveirasilva/LandingPage",
    featured: false,
  },
  {
    id: 11,
    title: "Validador de Cartão",
    description:
      "Ferramenta Python para validação de números de cartão de crédito.",
    longDesc:
      "Script Python que implementa o algoritmo de Luhn para validar números de cartão de crédito. Projeto de estudo em Python com foco em lógica de validação e tratamento de dados.",
    tags: ["Python", "Algoritmo de Luhn"],
    color: "#10b981",
    emoji: "💳",
    repo: "https://github.com/Fabianooliveirasilva/validador-de-cart-o",
    featured: false,
  },
  {
    id: 12,
    title: "Audiobook Player",
    description:
      "Player de audiobook com interface HTML para reprodução de áudio.",
    longDesc:
      "Aplicação web para reprodução de audiobooks com controles de áudio, navegação entre capítulos e interface intuitiva desenvolvida com HTML e CSS.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "#f59e0b",
    emoji: "🎧",
    repo: "https://github.com/Fabianooliveirasilva/audiobook",
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative glass rounded-3xl overflow-hidden border border-white/8 transition-all duration-400 card-hover-glow"
      style={{
        boxShadow: hovered
          ? `0 0 40px ${project.color}30, 0 20px 60px rgba(0,0,0,0.4)`
          : "none",
      }}
      aria-label={`Projeto: ${project.title}`}
    >
      {/* Card top banner */}
      <div
        className="relative h-40 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}0a 100%)`,
        }}
      >
        {/* Animated background shimmer on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="shimmer"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(circle at center, ${project.color}30 0%, transparent 70%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Featured badge */}
        {project.featured && (
          <span
            className="absolute top-3 right-3 px-2 py-0.5 text-xs font-bold rounded-full"
            style={{
              background: `${project.color}33`,
              color: project.color,
              border: `1px solid ${project.color}50`,
            }}
          >
            {t.projects.featured}
          </span>
        )}

        {/* Project emoji / icon */}
        <motion.span
          className="text-6xl"
          animate={{ scale: hovered ? 1.15 : 1, rotate: hovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {project.emoji}
        </motion.span>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[rgba(15,23,42,0.8)] to-transparent" />
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:gradient-text transition-colors">
          {project.title}
        </h3>

        {/* Description with expand on hover */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {hovered ? project.longDesc : project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-mono rounded-full"
              style={{
                background: `${project.color}18`,
                color: project.color,
                border: `1px solid ${project.color}35`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${project.color}cc, ${project.color})`,
                boxShadow: `0 0 14px ${project.color}40`,
              }}
            >
              <ExternalLink size={13} />
              {t.projects.demo}
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 glass border border-white/10 hover:border-white/25 hover:text-white transition-all duration-200"
            >
              <Github size={13} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [page, setPage] = useState(0);
  const { t } = useLanguage();
  const COLS = 3;
  const totalPages = Math.ceil(PROJECTS.length / COLS);
  const currentProjects = PROJECTS.slice(page * COLS, page * COLS + COLS);

  return (
    <section
      id="projects"
      className="relative py-32 section-bg"
      aria-label="Projetos"
    >
      {/* Grid pattern accent */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">
            ● {t.projects.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t.projects.heading}{" "}
            <span className="gradient-text">{t.projects.heading_accent}</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            {t.projects.desc}
          </p>
        </motion.div>

        {/* Projects grid with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          >
            {currentProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label={t.projects.prev}
            className="p-2 rounded-xl glass border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Ir para página ${i + 1}`}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  background: i === page ? "#6366f1" : "rgba(255,255,255,0.2)",
                  boxShadow: i === page ? "0 0 10px #6366f1" : "none",
                  transform: i === page ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label={t.projects.next}
            className="p-2 rounded-xl glass border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
