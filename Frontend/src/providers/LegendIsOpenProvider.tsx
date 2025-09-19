import { createContext, ReactNode, useContext, useState } from "react";

interface LegendIsOpenProviderProps {
  children: ReactNode;
  value: boolean;
}

export const LegendIsOpenContext = createContext<{} | boolean>(true);

export default function LegendIsOpenProvider({
  children,
  value = true,
}: LegendIsOpenProviderProps) {
  const [isLegendOpen, setIsLegendOpen] = useState(value);
  const toggle = () => setIsLegendOpen(!isLegendOpen);
  return (
    <LegendIsOpenContext value={{ isLegendOpen, setIsLegendOpen: toggle }}>
      {children}
    </LegendIsOpenContext>
  );
}

export function useLegendIsOpenContext() {
  const context = useContext(LegendIsOpenContext);
  if (context === undefined) {
    throw new Error(
      "useLegendIsOpenContext must be used within an LegendIsOpenContext"
    );
  }
  return context;
}
