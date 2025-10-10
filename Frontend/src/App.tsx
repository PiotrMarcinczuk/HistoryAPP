import Map from "./components/Map";
import Navigation from "./components/Navigation";
import WarProvider from "./providers/WarProvider";
import EventsProvider from "./providers/EventsProvider";
import LegendIsOpenProvider from "./providers/LegendIsOpenProvider";
import LegendBar from "./components/LegendBar";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "./components/ErrorMessage";
function App() {
  return (
    <ErrorBoundary FallbackComponent={(e: any) => <ErrorMessage />}>
      <LegendIsOpenProvider value={false}>
        <WarProvider>
          <EventsProvider>
            <Navigation />
            <main className="w-full h-full flex items-center justify-center`">
              <Map />
            </main>
            <LegendBar />
          </EventsProvider>
        </WarProvider>
      </LegendIsOpenProvider>
    </ErrorBoundary>
  );
}

export default App;
