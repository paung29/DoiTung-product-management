"use client";

import { createContext, useContext, useState } from "react";

type InventoryContextType = {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
};

const InventoryContext = createContext<InventoryContextType | null>(null);

export function InventoryContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedYear, setSelectedYear] = useState("");

  return (
    <InventoryContext.Provider value={{ selectedYear, setSelectedYear }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error("useZoneForm must be used inside ZoneFormProvider");
  }

  return context;
}