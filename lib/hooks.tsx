"use client";
import { useInView } from "react-intersection-observer";
import type { sectionname } from "./type";
import { ActiveSectionContext, useActiveSectionContext } from "./Active";
import { useEffect } from "react";
export function useSectionInView(sectionname: sectionname, threshold = 0.75) {
  const { ref, inView } = useInView({ threshold });
  const { setActiveSection } = useActiveSectionContext();

  useEffect(() => {
    if (inView) {
      setActiveSection(sectionname);
    }
  }, [inView, setActiveSection, sectionname]);

  return { ref };
}
