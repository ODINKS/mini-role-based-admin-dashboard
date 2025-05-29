"use client";
import { useEffect, useState } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface BreakpointInfo {
  breakpoint: Breakpoint;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
  isXsOnly: boolean;
  isSmOnly: boolean;
  isMdOnly: boolean;
  isLgOnly: boolean;
  isXlOnly: boolean;
  is2xlOnly: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function getBreakpoint(width: number): Breakpoint {
  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 640) return "sm";
  return "xs";
}

export function useBreakpoint(): BreakpointInfo {
  const [width, setWidth] = useState<number>(0);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("xs");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setWidth(w);
      setBreakpoint(getBreakpoint(w));
    };

    update(); // initial run
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    breakpoint,

    // Tailwind-style min-width breakpoints
    isXs: width >= 0,
    isSm: width >= 640,
    isMd: width >= 768,
    isLg: width >= 1024,
    isXl: width >= 1280,
    is2xl: width >= 1536,

    // "Only" ranges
    isXsOnly: width < 640,
    isSmOnly: width >= 640 && width < 768,
    isMdOnly: width >= 768 && width < 1024,
    isLgOnly: width >= 1024 && width < 1280,
    isXlOnly: width >= 1280 && width < 1536,
    is2xlOnly: width >= 1536,

    // Convenience
    isMobile: width < 768, // xs and sm
    isTablet: width >= 768 && width < 1024, // md only
    isDesktop: width >= 1024, // lg and up
  };
}
