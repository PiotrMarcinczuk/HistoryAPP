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

  const onClickWar = (war: any) => {
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
    <WarsContext value={{ wars, onClickWar, currentWar }}>
      {children}
    </WarsContext>
  );
}

export function useWarsContext() {
  const context = useContext(WarsContext);
  if (context === undefined) {
    throw new Error("useWarsContext must be used within an WarsContext");
  }
  return context;
}
