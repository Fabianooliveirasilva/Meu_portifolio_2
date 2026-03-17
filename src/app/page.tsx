"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/sections/Hero";

// Lazy-load below-fold sections for better performance
const AboutSection = dynamic(() => import("@/components/sections/About"));
const SkillsSection = dynamic(() => import("@/components/sections/Skills"));
const ProjectsSection = dynamic(() => import("@/components/sections/Projects"));
const TimelineSection = dynamic(() => import("@/components/sections/Timeline"));
const ContactSection = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      {/* Loading splash screen (auto-dismisses) */}
      <LoadingScreen />

      {/* Custom animated cursor */}
      <CustomCursor />

      {/* Full-page animated particle canvas */}
      <ParticleBackground />

      {/* Sticky navbar */}
      <Navbar />

      <main id="main-content" className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>
    </>
  );
}
