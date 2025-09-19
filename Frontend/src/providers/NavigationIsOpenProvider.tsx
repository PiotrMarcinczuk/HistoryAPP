import { createContext, ReactNode, useContext, useState } from "react";

interface NavigationIsOpenProviderProps {
  children: ReactNode;
  value: boolean;
}

export const NavigationIsOpenContext = createContext<{} | boolean>(true);

export default function NavigationIsOpenProvider({
  children,
  value = true,
}: NavigationIsOpenProviderProps) {
  const [isNavOpen, setIsNavOpen] = useState(value);
  const toggle = () => setIsNavOpen(!isNavOpen);
  return (
    <NavigationIsOpenContext value={{ isNavOpen, setIsNavOpen: toggle }}>
      {children}
    </NavigationIsOpenContext>
  );
}

export function useNavigationIsOpenContext() {
  const context = useContext(NavigationIsOpenContext);
  if (context === undefined) {
    throw new Error(
      "useOpenContext must be used within an NavigationIsOpenContext"
    );
  }
  return context;
}
