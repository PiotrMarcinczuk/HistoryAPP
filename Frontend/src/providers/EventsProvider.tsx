import { createContext, useContext, useState } from "react";
import { useWarContext } from "./WarProvider";
import { fetchEvents } from "../api/fetchData";
import { useEffect } from "react";

export const EventsConext = createContext<{} | null>(null);

export default function EventsProvider({ children, value }) {
  const [events, setEvents] = useState<any>(null);
  const warContext = useWarContext();
  const warId = warContext.currentWar?.[0]?.documentId;
  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents(warId);
      if (eventsData.length > 0) setEvents(eventsData);
    };
    fetchData();
  }, [warId]);
  return <EventsConext value={{ events }}>{children}</EventsConext>;
}

export function useEventsContext() {
  const context = useContext(EventsConext);
  if (context === undefined) {
    throw new Error("useEventsContext must be used within an EventsProvider");
  }
  return context;
}
