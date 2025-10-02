import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import openLegend from "../../public/icons/open-legend.png";
import { useEffect } from "react";
import { useNavigationIsOpenContext } from "../providers/NavigationIsOpenProvider";
import { useLegendIsOpenContext } from "../providers/LegendIsOpenProvider";
import { useWarContext } from "../providers/WarProvider";
import { useEventsContext } from "../providers/EventsProvider";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import CustomPopup from "./CustomPopup";
import MapElements from "../mapComponents/MapElements";

export function ResizeHandler({ deps }: { deps: any[] }) {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }, [map, ...deps]);

  return null;
}

function MapUpdater({ zoom, center }) {
  const map = useMap();

  useEffect(() => {
    if (zoom !== undefined && map.getZoom() !== zoom) map.setZoom(zoom);
  }, [zoom, map]);

  useEffect(() => {
    if (center !== undefined) map.setView(center);
  }, [center, map]);

  useEffect(() => {
    map.invalidateSize(); // refresh map layout if container changed
  });

  return null;
}

export default function Map() {
  const navContext = useNavigationIsOpenContext();
  const legendContext = useLegendIsOpenContext();
  const warContext = useWarContext();
  const eventsContext = useEventsContext();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [currentWar, setCurrentWar] = useState<any>(null);
  useEffect(() => {
    setCurrentWar(warContext?.currentWar?.[0]);
  }, [warContext]);

  const {
    createTextIconPL,
    createTextIconPLwin,
    createTextIconENEMY,
    createTextIconENEMYwin,
  } = MapElements();

  const { isNavOpen } = navContext as { isNavOpen: boolean };

  const { setIsLegendOpen } = legendContext as {
    setIsLegendOpen: () => void;
  };

  return (
    <section
      className={`${
        isNavOpen ? "xl:w-[75%] w-full" : "w-full"
      } ease-in duration-200 h-[90%] xs:h-[90%] m-2 z-10 flex flex-col justify-center items-center relative`}>
      <h1 className="xs:-mt-2 px-12 z-40 absolute top-0 rounded-sm text-bigger-base sm:text-extra-large lg:text-2x-large text-center font-medium text-text-primary bg-orange-dark/40 text-nowrap">
        {currentWar?.Title}
        <br className="sm:hidden" /> {currentWar?.WarLength}
      </h1>

      <MapContainer
        center={[53.5948, 19.568]} /* API */
        zoom={currentWar?.MapZoom}
        zoomControl={false}
        scrollWheelZoom={false}
        className="w-full h-full z-30 rounded-sm">
        <MapUpdater
          zoom={currentWar?.MapZoom}
          center={currentWar && [53.5948, 19.568]}
        />
        <ResizeHandler deps={[isNavOpen]} />
        <TileLayer
          attribution='"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <Marker
          position={[53.48733815530108, 20.09374477186679]} /* API */
          icon={createTextIconPL("1")}
          eventHandlers={{ click: () => setIsPopupOpen(true) }} // API
        ></Marker>{" "}
        {/* API */}
        <Marker
          position={[54.03623538101871, 19.025919513229628]}
          icon={createTextIconPLwin("2")}></Marker>
        <Marker
          position={[52.83239932456155, 19.043765385859906]}
          icon={createTextIconENEMY("3")}></Marker>
        <Marker
          position={[54.13324499637606, 19.878726302726086]}
          icon={createTextIconENEMYwin("4")}></Marker>
      </MapContainer>
      {isPopupOpen && <CustomPopup onClose={() => setIsPopupOpen(false)} />}
      <button
        onClick={setIsLegendOpen}
        className="z-40 absolute bottom-0 right-0 px-3 pt-4 pb-6 ease-in duration-200 bg-[#DAD7D7]/20 hover:bg-[#DAD7D7]/50 rounded-tl-sm hover:cursor-pointer">
        <img src={openLegend} alt="open legend" />
      </button>
    </section>
  );
}
