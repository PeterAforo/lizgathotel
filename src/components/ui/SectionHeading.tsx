"use client";

import AnimatedSection from "./AnimatedSection";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  className?: string;
  light?: boolean;
  center?: boolean;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  className,
  light = false,
  center = true,
}: SectionHeadingProps) {
  return (
    <AnimatedSection
      className={cn("mb-12", center && "text-center", className)}
    >
      {subtitle && (
        <span className="text-primary font-body text-sm font-semibold uppercase tracking-[0.2em]">
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "mt-2 text-3xl font-bold md:text-4xl lg:text-5xl",
          light ? "text-white" : "text-dark"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-2xl font-body text-lg",
            light ? "text-gray-300" : "text-gray-dark"
          )}
        >
          {description}
        </p>
      )}
      <div className="mx-auto mt-4 flex items-center justify-center gap-2">
        <div className="h-[1px] w-12 bg-primary" />
        <div className="h-2 w-2 rotate-45 bg-primary" />
        <div className="h-[1px] w-12 bg-primary" />
      </div>
    </AnimatedSection>
  );
}
