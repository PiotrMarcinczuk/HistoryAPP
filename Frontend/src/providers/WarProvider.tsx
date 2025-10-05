import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import fetchData from "../api/fetchData";
import { WarContextType } from "../interfaces/prvoiderInterfaces";
export const WarsContext = createContext<WarContextType | any>(null);

export default function WarProvider({ children }: { children: ReactNode }) {
  const { fetchWars } = fetchData();
  const [wars, setWars] = useState<any[]>([]);
  const [currentWar, setCurrentWar] = useState<any>(null);

  const onClickWar = (clickedWar: HTMLButtonElement) => {
    const war = wars.filter((war: any) => war.Title === clickedWar.innerText);
    setCurrentWar(war);
  };

  useEffect(() => {
    const fetchData = async () => {
      const warsData = await fetchWars();
      if (warsData) {
        setWars(warsData);
        setCurrentWar([warsData[0]]);
      }
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
