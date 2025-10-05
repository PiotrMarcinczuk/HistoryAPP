export interface WarContextType {
  wars?: any;
  setCurrentWar?: (clickedWar: any) => void;
  currentWar?: Array<{ documentId: string; Title: string }>;
}

export interface EventsContextType {
  events: any;
  setCurrentEvent: (clickedEvent: any) => void;
  currentEvent: any;
  currentWar?: Array<{ documentId: string }>;
}

export interface LegendIsOpenProviderProps {
  children: React.ReactNode;
  value: boolean;
}

export interface NavigationIsOpenProviderProps {
  children: React.ReactNode;
  value: boolean;
}
