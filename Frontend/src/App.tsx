import Map from "./components/Map";
import Navigation from "./components/Navigation";
import NavigationIsOpenProvider from "./providers/NavigationIsOpenProvider";
import LegendIsOpenProvider from "./providers/LegendIsOpenProvider";
import LegendBar from "./components/LegendBar";

function App() {
  return (
    <NavigationIsOpenProvider value={true}>
      <LegendIsOpenProvider value={false}>
        <Navigation />
        <main className="w-full h-full flex items-center xl:items-end xl:justify-end">
          <Map />
        </main>
        <LegendBar />
      </LegendIsOpenProvider>
    </NavigationIsOpenProvider>
  );
}

export default App;
