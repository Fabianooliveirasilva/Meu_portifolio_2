"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "pt" | "en" | "es";

interface FocusArea {
  label: string;
  desc: string;
}

interface TimelineEvent {
  role: string;
  company: string;
  desc: string;
}

interface SkillCategory {
  label: string;
  skills: string;
}

interface ContactDesc {
  desc: string;
}

export interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    timeline: string;
    contact: string;
    available: string;
  };
  hero: {
    available: string;
    hello: string;
    tagline: string;
    cta_projects: string;
    scroll: string;
  };
  about: {
    subtitle: string;
    heading: string;
    heading_accent: string;
    open_to_work: string;
    role: string;
    role_accent: string;
    bio: string;
    stat_projects: string;
    stat_years: string;
    stat_dedication: string;
    focus: FocusArea[];
  };
  skills: {
    subtitle: string;
    heading: string;
    heading_accent: string;
    desc: string;
    proficiency: string;
    tools_title: string;
    categories: SkillCategory[];
  };
  projects: {
    subtitle: string;
    heading: string;
    heading_accent: string;
    desc: string;
    featured: string;
    demo: string;
    prev: string;
    next: string;
    page: string;
    of: string;
  };
  timeline: {
    subtitle: string;
    heading: string;
    heading_accent: string;
    desc: string;
    events: TimelineEvent[];
  };
  contact: {
    subtitle: string;
    heading: string;
    heading_accent: string;
    desc: string;
    quote: string;
    contact_descs: ContactDesc[];
    form_title: string;
    form_reply: string;
    form_name: string;
    form_name_ph: string;
    form_email: string;
    form_email_ph: string;
    form_subject: string;
    form_subject_ph: string;
    form_message: string;
    form_message_ph: string;
    form_send: string;
    form_sending: string;
    success_title: string;
    success_msg: string;
    footer_made: string;
    footer_rights: string;
  };
}

export const translations: Record<Lang, Translations> = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      skills: "Skills",
      projects: "Projetos",
      timeline: "Carreira",
      contact: "Contato",
      available: "Disponível",
    },
    hero: {
      available: "Disponível para projetos",
      hello: "Olá, eu sou",
      tagline:
        "Criando experiências digitais de alto impacto com código limpo, performance e automação de qualidade.",
      cta_projects: "Ver Projetos",
      scroll: "Scroll",
    },
    about: {
      subtitle: "Quem sou",
      heading: "Sobre",
      heading_accent: "Mim",
      open_to_work: "Open to work",
      role: "Developer",
      role_accent: "& QA Engineer",
      bio: "Desenvolvedor apaixonado por criar soluções digitais completas — da interface ao backend, entregando qualidade por meio de automação de testes e boas práticas de engenharia. Comprometido com código limpo, performance e experiências de usuário memoráveis.",
      stat_projects: "Projetos",
      stat_years: "Anos de exp.",
      stat_dedication: "Dedicação",
      focus: [
        { label: "QA Automation", desc: "Cypress, Playwright, testes E2E, CI/CD" },
        { label: "Web Development", desc: "React, Next.js, TypeScript, UI modernas" },
        { label: "Scalable Systems", desc: "Node.js, Docker, microserviços, APIs REST" },
        { label: "Performance", desc: "Otimização, métricas, Web Vitals, profiling" },
      ],
    },
    skills: {
      subtitle: "Tecnologias",
      heading: "Minhas",
      heading_accent: "Skills",
      desc: "Combinação de habilidades técnicas e ferramentas para construir produtos excepcionais",
      proficiency: "Proficiência Técnica",
      tools_title: "Ferramentas & Tecnologias Adicionais",
      categories: [
        { label: "Frontend", skills: "React · Next.js · TypeScript · Tailwind" },
        { label: "Backend", skills: "Node.js · Python · REST · SQL" },
        { label: "QA & Tests", skills: "Cypress · Playwright · Jest · CI/CD" },
        { label: "DevOps", skills: "Docker · GitHub Actions · Vercel · AWS" },
      ],
    },
    projects: {
      subtitle: "Portfólio",
      heading: "Meus",
      heading_accent: "Projetos",
      desc: "Projetos reais do GitHub — clique em GitHub para ver o código fonte",
      featured: "★ Destaque",
      demo: "Demo",
      prev: "Anterior",
      next: "Próximos",
      page: "Página",
      of: "de",
    },
    timeline: {
      subtitle: "Trajetória",
      heading: "Minha",
      heading_accent: "Carreira",
      desc: "Uma jornada contínua de aprendizado, evolução e entrega de valor",
      events: [
        {
          role: "QA Engineer",
          company: "Tech Startup",
          desc: "Início da carreira profissional em qualidade de software. Testes manuais, criação de casos de teste e introdução às práticas de QA.",
        },
        {
          role: "Automation QA Engineer",
          company: "Software House",
          desc: "Atuação como QA Automation, desenvolvendo frameworks de testes E2E, integração com CI/CD e reduzindo o tempo de ciclo de releases em 40%.",
        },
        {
          role: "Web Developer",
          company: "Digital Agency",
          desc: "Transição para desenvolvimento web full stack, criando aplicações React/Next.js de alta performance e contribuindo em projetos de múltiplos clientes.",
        },
        {
          role: "Full Stack Developer",
          company: "Freelancer & Projetos Próprios",
          desc: "Atuação como desenvolvedor full stack sênior, liderando entregas técnicas, arquitetura de sistemas e construção de produtos digitais completos.",
        },
      ],
    },
    contact: {
      subtitle: "Vamos conversar",
      heading: "Entre em",
      heading_accent: "Contato",
      desc: "Estou disponível para projetos freelance, posições full-time e colaborações. Escolha o canal que preferir!",
      quote: "Vamos construir algo incrível juntos.",
      contact_descs: [
        { desc: "Conecte-se profissionalmente" },
        { desc: "Veja meu código e projetos" },
        { desc: "Me envie uma mensagem" },
        { desc: "Respondo rápido por aqui!" },
      ],
      form_title: "Envie uma",
      form_reply: "Responderei em até 24 horas.",
      form_name: "Nome",
      form_name_ph: "Seu nome",
      form_email: "Email",
      form_email_ph: "seu@email.com",
      form_subject: "Assunto",
      form_subject_ph: "Do que se trata?",
      form_message: "Mensagem",
      form_message_ph: "Conte sobre o seu projeto ou oportunidade...",
      form_send: "Enviar Mensagem",
      form_sending: "Enviando...",
      success_title: "Mensagem enviada!",
      success_msg: "Obrigado pelo contato. Responderei em breve.",
      footer_made: "Feito com",
      footer_rights: "Todos os direitos reservados.",
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      timeline: "Career",
      contact: "Contact",
      available: "Available",
    },
    hero: {
      available: "Available for projects",
      hello: "Hi, I'm",
      tagline:
        "Building high-impact digital experiences with clean code, performance, and quality automation.",
      cta_projects: "See Projects",
      scroll: "Scroll",
    },
    about: {
      subtitle: "About me",
      heading: "About",
      heading_accent: "Me",
      open_to_work: "Open to work",
      role: "Developer",
      role_accent: "& QA Engineer",
      bio: "Developer passionate about building complete digital solutions — from UI to backend, delivering quality through test automation and software engineering best practices. Committed to clean code, performance, and memorable user experiences.",
      stat_projects: "Projects",
      stat_years: "Years of exp.",
      stat_dedication: "Dedication",
      focus: [
        { label: "QA Automation", desc: "Cypress, Playwright, E2E tests, CI/CD" },
        { label: "Web Development", desc: "React, Next.js, TypeScript, modern UIs" },
        { label: "Scalable Systems", desc: "Node.js, Docker, microservices, REST APIs" },
        { label: "Performance", desc: "Optimization, metrics, Web Vitals, profiling" },
      ],
    },
    skills: {
      subtitle: "Technologies",
      heading: "My",
      heading_accent: "Skills",
      desc: "A combination of technical skills and tools to build exceptional products",
      proficiency: "Technical Proficiency",
      tools_title: "Additional Tools & Technologies",
      categories: [
        { label: "Frontend", skills: "React · Next.js · TypeScript · Tailwind" },
        { label: "Backend", skills: "Node.js · Python · REST · SQL" },
        { label: "QA & Tests", skills: "Cypress · Playwright · Jest · CI/CD" },
        { label: "DevOps", skills: "Docker · GitHub Actions · Vercel · AWS" },
      ],
    },
    projects: {
      subtitle: "Portfolio",
      heading: "My",
      heading_accent: "Projects",
      desc: "Real GitHub projects — click GitHub to see the source code",
      featured: "★ Featured",
      demo: "Demo",
      prev: "Previous",
      next: "Next",
      page: "Page",
      of: "of",
    },
    timeline: {
      subtitle: "Journey",
      heading: "My",
      heading_accent: "Career",
      desc: "A continuous journey of learning, growth, and delivering value",
      events: [
        {
          role: "QA Engineer",
          company: "Tech Startup",
          desc: "Started professional career in software quality. Manual testing, test case creation, and introduction to QA practices.",
        },
        {
          role: "Automation QA Engineer",
          company: "Software House",
          desc: "Worked as QA Automation engineer, building E2E test frameworks, integrating CI/CD pipelines, and reducing release cycle time by 40%.",
        },
        {
          role: "Web Developer",
          company: "Digital Agency",
          desc: "Transitioned to full stack web development, building high-performance React/Next.js applications and contributing to multi-client projects.",
        },
        {
          role: "Full Stack Developer",
          company: "Freelancer & Personal Projects",
          desc: "Acting as senior full stack developer, leading technical deliveries, system architecture, and building complete digital products.",
        },
      ],
    },
    contact: {
      subtitle: "Let's talk",
      heading: "Get in",
      heading_accent: "Touch",
      desc: "Available for freelance projects, full-time positions, and collaborations. Pick any channel below!",
      quote: "Let's build something amazing together.",
      contact_descs: [
        { desc: "Connect professionally" },
        { desc: "See my code and projects" },
        { desc: "Send me a message" },
        { desc: "I reply fast here!" },
      ],
      form_title: "Send a",
      form_reply: "I'll reply within 24 hours.",
      form_name: "Name",
      form_name_ph: "Your name",
      form_email: "Email",
      form_email_ph: "your@email.com",
      form_subject: "Subject",
      form_subject_ph: "What is it about?",
      form_message: "Message",
      form_message_ph: "Tell me about your project or opportunity...",
      form_send: "Send Message",
      form_sending: "Sending...",
      success_title: "Message sent!",
      success_msg: "Thank you for reaching out. I'll get back to you soon.",
      footer_made: "Made with",
      footer_rights: "All rights reserved.",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      skills: "Skills",
      projects: "Proyectos",
      timeline: "Carrera",
      contact: "Contacto",
      available: "Disponible",
    },
    hero: {
      available: "Disponible para proyectos",
      hello: "Hola, soy",
      tagline:
        "Creando experiencias digitales de alto impacto con código limpio, performance y automatización de calidad.",
      cta_projects: "Ver Proyectos",
      scroll: "Scroll",
    },
    about: {
      subtitle: "Quién soy",
      heading: "Sobre",
      heading_accent: "Mí",
      open_to_work: "Open to work",
      role: "Developer",
      role_accent: "& QA Engineer",
      bio: "Desarrollador apasionado por crear soluciones digitales completas — desde la interfaz hasta el backend, entregando calidad a través de la automatización de pruebas y buenas prácticas de ingeniería. Comprometido con código limpio, performance y experiencias de usuario memorables.",
      stat_projects: "Proyectos",
      stat_years: "Años de exp.",
      stat_dedication: "Dedicación",
      focus: [
        { label: "QA Automation", desc: "Cypress, Playwright, pruebas E2E, CI/CD" },
        { label: "Web Development", desc: "React, Next.js, TypeScript, UIs modernas" },
        { label: "Scalable Systems", desc: "Node.js, Docker, microservicios, APIs REST" },
        { label: "Performance", desc: "Optimización, métricas, Web Vitals, profiling" },
      ],
    },
    skills: {
      subtitle: "Tecnologías",
      heading: "Mis",
      heading_accent: "Skills",
      desc: "Combinación de habilidades técnicas y herramientas para construir productos excepcionales",
      proficiency: "Proficiencia Técnica",
      tools_title: "Herramientas y Tecnologías Adicionales",
      categories: [
        { label: "Frontend", skills: "React · Next.js · TypeScript · Tailwind" },
        { label: "Backend", skills: "Node.js · Python · REST · SQL" },
        { label: "QA & Tests", skills: "Cypress · Playwright · Jest · CI/CD" },
        { label: "DevOps", skills: "Docker · GitHub Actions · Vercel · AWS" },
      ],
    },
    projects: {
      subtitle: "Portafolio",
      heading: "Mis",
      heading_accent: "Proyectos",
      desc: "Proyectos reales de GitHub — haz clic en GitHub para ver el código fuente",
      featured: "★ Destacado",
      demo: "Demo",
      prev: "Anterior",
      next: "Siguientes",
      page: "Página",
      of: "de",
    },
    timeline: {
      subtitle: "Trayectoria",
      heading: "Mi",
      heading_accent: "Carrera",
      desc: "Un viaje continuo de aprendizaje, evolución y entrega de valor",
      events: [
        {
          role: "QA Engineer",
          company: "Tech Startup",
          desc: "Inicio de carrera profesional en calidad de software. Pruebas manuales, creación de casos de prueba e introducción a las prácticas de QA.",
        },
        {
          role: "Automation QA Engineer",
          company: "Software House",
          desc: "Trabajo como QA Automation, desarrollando frameworks de pruebas E2E, integración con CI/CD y reduciendo el tiempo del ciclo de releases en un 40%.",
        },
        {
          role: "Web Developer",
          company: "Digital Agency",
          desc: "Transición al desarrollo web full stack, creando aplicaciones React/Next.js de alta performance y contribuyendo en proyectos de múltiples clientes.",
        },
        {
          role: "Full Stack Developer",
          company: "Freelancer & Proyectos Propios",
          desc: "Actuando como desarrollador full stack senior, liderando entregas técnicas, arquitectura de sistemas y construcción de productos digitales completos.",
        },
      ],
    },
    contact: {
      subtitle: "Hablemos",
      heading: "Ponte en",
      heading_accent: "Contacto",
      desc: "Disponible para proyectos freelance, posiciones full-time y colaboraciones. ¡Elige el canal que prefieras!",
      quote: "Construyamos algo increíble juntos.",
      contact_descs: [
        { desc: "Conéctate profesionalmente" },
        { desc: "Ve mi código y proyectos" },
        { desc: "Envíame un mensaje" },
        { desc: "¡Respondo rápido aquí!" },
      ],
      form_title: "Envía un",
      form_reply: "Responderé en menos de 24 horas.",
      form_name: "Nombre",
      form_name_ph: "Tu nombre",
      form_email: "Email",
      form_email_ph: "tu@email.com",
      form_subject: "Asunto",
      form_subject_ph: "¿De qué se trata?",
      form_message: "Mensaje",
      form_message_ph: "Cuéntame sobre tu proyecto u oportunidad...",
      form_send: "Enviar Mensaje",
      form_sending: "Enviando...",
      success_title: "¡Mensaje enviado!",
      success_msg: "Gracias por escribirme. Te responderé pronto.",
      footer_made: "Hecho con",
      footer_rights: "Todos los derechos reservados.",
    },
  },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
