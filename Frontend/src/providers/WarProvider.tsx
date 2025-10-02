import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchWars } from "../api/fetchData";
export const WarsContext = createContext<{} | []>([]);

export default function WarProvider({ children, value }) {
  const [wars, setWars] = useState<any>([]);
  const [currentWar, setCurrentWar] = useState<any>(null);

  const onClickWar = (clickedWar: any) => {
    const war = wars.data.filter((war) => war.Title === clickedWar.innerText);
    setCurrentWar(war);
  };

  useEffect(() => {
    const fetchData = async () => {
      const warsData = await fetchWars();
      if (warsData.data) setWars(warsData);
    };
    fetchData();
  }, []);

  return (
    <WarsContext value={{ wars, setCurrentWar: onClickWar, currentWar }}>
      {children}
    </WarsContext>
  );
}

export function useWarContext() {
  const context = useContext(WarsContext);
  if (context === undefined) {
    throw new Error("useWarContext must be used within an WarContext");
  }
  return context;
}
