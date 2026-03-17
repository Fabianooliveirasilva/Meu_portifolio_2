"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage, Lang } from "@/contexts/LanguageContext";

const FLAGS: { lang: Lang; flag: string; label: string }[] = [
  { lang: "pt", flag: "🇧🇷", label: "Português" },
  { lang: "en", flag: "🇺🇸", label: "English" },
  { lang: "es", flag: "🇪🇸", label: "Español" },
];

function LangSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-1">
      {FLAGS.map((f) => (
        <button
          key={f.lang}
          onClick={() => setLang(f.lang)}
          aria-label={f.label}
          title={f.label}
          className={`text-lg leading-none rounded-md px-1 py-0.5 transition-all duration-200 ${
            lang === f.lang
              ? "ring-2 ring-cyan-400 scale-110"
              : "opacity-50 hover:opacity-100 hover:scale-105"
          }`}
        >
          {f.flag}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#hero");
  const { t } = useLanguage();

  const NAV_LINKS = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.timeline, href: "#timeline" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-6 flex items-center justify-between"
          role="navigation"
          aria-label="Navegação principal"
        >
          {/* Logo */}
          <a
            href="#hero"
            className="text-xl font-bold gradient-text font-mono tracking-wider"
            onClick={() => handleNavClick("#hero")}
          >
            {"<Dev />"}
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    activeLink === link.href
                      ? "text-cyan-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {activeLink === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg glass"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Right side controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <LangSwitcher />

            {/* CTA button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-indigo-500/40 text-sm font-semibold text-indigo-300 hover:text-white hover:border-indigo-400 hover:glow-indigo transition-all duration-300"
              onClick={() => handleNavClick("#contact")}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t.nav.available}
            </a>

            {/* Theme toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile: lang + theme + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher />
            <ThemeToggle />
            <button
              aria-label="Abrir menu de navegação"
              aria-expanded={menuOpen}
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-cyan-400 rounded-full origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-cyan-400 rounded-full"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                }
                className="block w-6 h-0.5 bg-cyan-400 rounded-full origin-center"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-4 right-4 z-40 glass rounded-2xl border border-white/10 p-4"
          >
            <ul className="flex flex-col gap-1" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeLink === link.href
                        ? "text-cyan-400 bg-white/5"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
