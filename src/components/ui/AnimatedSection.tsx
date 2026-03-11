"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleUp";
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function AnimatedSection({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  duration = 1,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const animations = {
      fadeUp: { y: 60, opacity: 0 },
      fadeIn: { opacity: 0 },
      fadeLeft: { x: -60, opacity: 0 },
      fadeRight: { x: 60, opacity: 0 },
      scaleUp: { scale: 0.9, opacity: 0 },
    };

    const from = animations[animation];

    gsap.from(ref.current, {
      ...from,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });
  }, [animation, delay, duration]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
