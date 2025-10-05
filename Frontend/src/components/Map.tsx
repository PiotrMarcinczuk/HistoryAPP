import "leaflet/dist/leaflet.css";
import L, { icon } from "leaflet";
import { useState, useMemo, Fragment } from "react";
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
  Polyline,
} from "react-leaflet";
import CustomPopup from "./CustomPopup";
import MapElements from "../mapComponents/MapElements";

interface resizeHandlerDeps {
  deps: [boolean];
}

interface mapUpdater {
  zoom: number;
  center: [number, number];
  events: any;
}

export function ResizeHandler({ deps }: resizeHandlerDeps) {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }, [map, ...deps]);

  return null;
}

function MapUpdater({ zoom, center, events }: mapUpdater) {
  const map = useMap();

  useEffect(() => {
    if (zoom !== undefined && map.getZoom() !== zoom) {
      map.setZoom(zoom);
    }
  }, [zoom, map]);

  useEffect(() => {
    if (center !== undefined) {
      map.setView(center);
    }
  }, [center, map]);

  useEffect(() => {
    map.invalidateSize();
  }, [map, events]);

  return null;
}

export default function Map() {
  const navContext = useNavigationIsOpenContext();
  const legendContext = useLegendIsOpenContext();
  const warContext = useWarContext();
  const { currentWar } = warContext as { currentWar: any };
  const curWar = currentWar?.[0];

  const eventsContext = useEventsContext();

  const { events, setCurrentEvent } = eventsContext as {
    events: any;
    setCurrentEvent: (event: any) => void;
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { setMarkerType } = MapElements();
  const { isNavOpen } = navContext as { isNavOpen: boolean };

  const { setIsLegendOpen } = legendContext as {
    setIsLegendOpen: () => void;
  };

  if (!curWar) return null;

  return (
    <section
      className={`${
        isNavOpen ? "xl:w-[75%] w-full" : "w-full"
      } ease-in duration-200 h-[90%] xs:h-[90%] m-2 z-10 flex flex-col justify-center items-center relative`}>
      <h1 className="xs:-mt-2 px-12 z-40 absolute top-0 rounded-sm text-bigger-base sm:text-extra-large lg:text-2x-large text-center font-medium text-text-primary bg-orange-dark/40 text-nowrap">
        {curWar.Title}
        <br className="sm:hidden" /> {curWar.WarLength}
      </h1>
      {curWar && (
        <MapContainer
          center={[curWar.Center.lat, curWar.Center.lng]}
          zoom={curWar.MapZoom}
          zoomControl={false}
          scrollWheelZoom={false}
          className="w-full h-full z-30 rounded-sm">
          <MapUpdater
            zoom={curWar.MapZoom}
            center={[curWar.Center.lat, curWar.Center.lng]}
            events={events}
          />
          <ResizeHandler deps={[isNavOpen]} />
          <TileLayer
            attribution='"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          {events &&
            events
              .filter(
                (event: any) =>
                  event.PositionOnMapX !== undefined &&
                  event.PositionOnMapY !== undefined
              )
              .map((event: any) => {
                return (
                  <Fragment key={event.id}>
                    <Marker
                      position={[
                        parseFloat(event.PositionOnMapX),
                        parseFloat(event.PositionOnMapY),
                      ]}
                      eventHandlers={{
                        click: () => {
                          setIsPopupOpen(true);
                          setCurrentEvent(event);
                        },
                      }}
                      icon={setMarkerType(event.MarkerType)(event.EventOrder)}
                    />
                  </Fragment>
                );
              })}
          {/* {events &&
            events.map((event: any) => {
              const alreadyExists = arr.some(
                ([a, b]) =>
                  a === parseFloat(event.PositionOnMapX) &&
                  b === parseFloat(event.PositionOnMapY)
              );
              if (!alreadyExists) {
                arr.push([
                  parseFloat(event.PositionOnMapX),
                  parseFloat(event.PositionOnMapY),
                ]);
              }
            })} */}
          {/* <Marker
            position={[53.48733815530108, 20.09374477186679]} 
            icon={createTextIconPL("1")}
            eventHandlers={{ click: () => setIsPopupOpen(true) }} 
          ></Marker>{" "}
          <Marker
            position={[54.03623538101871, 19.025919513229628]}
            icon={createTextIconPLwin("2")}></Marker>
          <Marker
            position={[52.83239932456155, 19.043765385859906]}
            icon={createTextIconENEMY("3")}></Marker>
          <Marker
            position={[54.13324499637606, 19.878726302726086]}
            icon={createTextIconENEMYwin("4")}></Marker> */}
        </MapContainer>
      )}
      {isPopupOpen && <CustomPopup onClose={() => setIsPopupOpen(false)} />}
      <button
        onClick={setIsLegendOpen}
        className="z-40 absolute bottom-0 right-0 px-3 pt-4 pb-6 ease-in duration-200 bg-[#DAD7D7]/20 hover:bg-[#DAD7D7]/50 rounded-tl-sm hover:cursor-pointer">
        <img src={openLegend} alt="open legend" />
      </button>
    </section>
  );
}
