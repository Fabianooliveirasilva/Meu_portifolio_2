"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame for smooth cursor movement
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows cursor instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      // Ring lerps toward cursor for smooth lag effect
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      if (ringRef.current) {
        const offset = isHovering ? 28 : 18;
        ringRef.current.style.transform = `translate(${ringX - offset}px, ${ringY - offset}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    // Detect interactive elements for hover state
    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-cursor-hover]") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        setIsHovering(true);
      }
    };
    const onMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseEnter);
    document.addEventListener("mouseout", onMouseLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseEnter);
      document.removeEventListener("mouseout", onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, [isHovering]);

  return (
    <>
      {/* Inner dot */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />

      {/* Outer ring */}
      <motion.div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? "hover" : ""}`}
        aria-hidden="true"
        animate={{
          scale: isHovering ? 1 : 1,
          borderColor: isHovering
            ? "rgba(99,102,241,0.8)"
            : "rgba(34,211,238,0.55)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
