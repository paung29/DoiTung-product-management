"use client";

import { createContext, useContext, useState } from "react";

type ZoneFormContextType = {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
};

const ZoneFormContext = createContext<ZoneFormContextType | null>(null);

export function ZoneFormProvider({ children }: { children: React.ReactNode }) {
  const [selectedYear, setSelectedYear] = useState("");

  return (
    <ZoneFormContext.Provider value={{ selectedYear, setSelectedYear }}>
      {children}
    </ZoneFormContext.Provider>
  );
}

export function useZoneForm() {
  const context = useContext(ZoneFormContext);

  if (!context) {
    throw new Error("useZoneForm must be used inside ZoneFormProvider");
  }

  return context;
}