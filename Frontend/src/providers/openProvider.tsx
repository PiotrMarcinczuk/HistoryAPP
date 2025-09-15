import { createContext, ReactNode, useContext, useState } from "react";

interface OpenProviderProps {
  children: ReactNode;
  value: boolean;
}

export const OpenContext = createContext<{} | boolean>(true);

export default function OpenProvider({
  children,
  value = true,
}: OpenProviderProps) {
  const [isOpen, setIsOpen] = useState(value);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <OpenContext value={{ isOpen, setIsOpen: toggle }}>{children}</OpenContext>
  );
}

export function useOpenContext() {
  const context = useContext(OpenContext);
  if (context === undefined) {
    throw new Error("useOpenContext must be used within an OpenProvider");
  }
  return context;
}
