import { createContext, useContext, useState, ReactNode } from "react";
import { useWarContext } from "./WarProvider";
import fetchData from "../api/fetchData";
import { useEffect } from "react";
import { EventsContextType } from "../interfaces/prvoiderInterfaces";

export const EventsContext = createContext<EventsContextType | null>(null);

export default function EventsProvider({ children }: { children: ReactNode }) {
  const { fetchEvents } = fetchData();
  const [events, setEvents] = useState<any>(null);
  const [currentEvent, setCurrentEvent] = useState<any>(null);

  const warContext = useWarContext() as EventsContextType;
  const warId = warContext.currentWar?.[0]?.documentId;

  const onClickEvent = (clickedEvent: any) => {
    const event = events.filter((event: any) => event.id === clickedEvent.id);
    setCurrentEvent(event);
  };

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents(warId as string);
      setEvents(eventsData);
    };
    fetchData();
  }, [warId]);
  return (
    <EventsContext
      value={{ events, setCurrentEvent: onClickEvent, currentEvent }}>
      {children}
    </EventsContext>
  );
}

export function useEventsContext() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEventsContext must be used within an EventsProvider");
  }
  return context;
}
