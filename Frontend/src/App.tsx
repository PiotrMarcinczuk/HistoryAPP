import axios from "axios";
import Map from "./components/Map";
import Navigation from "./components/Navigation";
import OpenProvider from "./providers/openProvider";

function App() {
  return (
    <OpenProvider value={true}>
      <Navigation />
      <main className="w-full h-screen flex justify-end items-end">
        <Map />
      </main>
    </OpenProvider>
  );
}

export default App;
