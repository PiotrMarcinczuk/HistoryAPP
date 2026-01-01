import Map from "./components/Map";
import Navigation from "./components/Navigation";
import WarProvider from "./providers/WarProvider";
import EventsProvider from "./providers/EventsProvider";
import LegendIsOpenProvider from "./providers/LegendIsOpenProvider";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "./components/ErrorMessage";
import { lazy } from "react";
const LegendBar = lazy(() => import("./components/LegendBar"));
function App() {
  return (
    <ErrorBoundary FallbackComponent={(e: any) => <ErrorMessage />}>
      <LegendIsOpenProvider value={false}>
        <WarProvider>
          <EventsProvider>
            <Navigation />
            <Map />
            <LegendBar />
          </EventsProvider>
        </WarProvider>
      </LegendIsOpenProvider>
    </ErrorBoundary>
  );
}

export default App;
