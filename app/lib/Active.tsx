"use client";

import type { sectionname } from "./type";
import React, { useState, createContext, useContext } from "react";

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};
type ActiveSectionContextType = {
  ActiveSection: sectionname;
  setActiveSection: React.Dispatch<React.SetStateAction<sectionname>>;
};
export const ActiveSectionContext =
  createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [ActiveSection, setActiveSection] = useState<sectionname>("Home");
  return (
    <ActiveSectionContext.Provider
      value={{
        ActiveSection,
        setActiveSection,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}
export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);
  if (context == null) {
    throw new Error(
      "useActiveSectionContext must be used within an ActiveSectionContextProvider"
    );
  }
  return context;
}
