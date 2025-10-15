import "leaflet/dist/leaflet.css";
import { useState, Fragment } from "react";
import openLegend from "../../public/icons/open-legend.png";
import { useEffect, useMemo } from "react";
import { useLegendIsOpenContext } from "../providers/LegendIsOpenProvider";
import { useWarContext } from "../providers/WarProvider";
import { useEventsContext } from "../providers/EventsProvider";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polygon,
} from "react-leaflet";
import CustomPopup from "./CustomPopup";
import MapElements from "../mapComponents/MapElements";
import { SVGOverlay } from "react-leaflet";
import {
  ResizeHandlerProps,
  MapUpdaterProps,
} from "../interfaces/componentInterfaces";
const VITE_API_URL_UPLOADS = import.meta.env.VITE_API_URL_UPLOADS;

export function ResizeHandler({ deps }: ResizeHandlerProps) {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }, [map, ...deps]);

  return null;
}

function MapUpdater({ events }: MapUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [events]);

  return null;
}

export default function Map() {
  const legendContext = useLegendIsOpenContext();
  const warContext = useWarContext();
  const { currentWar } = warContext as { currentWar: any };
  const curWar = currentWar?.[0];

  const eventsContext = useEventsContext();

  const { events, setCurrentEvent } = eventsContext as {
    events: any;
    setCurrentEvent: (event: any) => void;
  };

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { setMarkerType } = MapElements();

  const { setIsLegendOpen } = legendContext as {
    setIsLegendOpen: () => void;
  };

  const centerPoints: [number, number] = useMemo(() => {
    if (!curWar) return [52, 21];
    return [curWar.center.data[0], curWar.center.data[1]];
  }, [events]);

  const countriesList = useMemo(() => {
    if (!curWar) return null;
    return curWar.countries.map((country: any) => {
      const coordinates = country.coordinates.data;
      const color = country.colorOnMap;
      const bounds = country.bounds.data;
      return (
        <Fragment key={country.id}>
          <Polygon
            interactive={false}
            positions={coordinates}
            fillColor={color}
            fillOpacity={0.4}
            weight={0}
          />
          <SVGOverlay bounds={bounds}>
            <image
              href={`${
                country.crest && `${VITE_API_URL_UPLOADS}${country.crest.url}`
              }`}
              x="0"
              y="0"
              width="100%"
              height="100%"
            />
          </SVGOverlay>
        </Fragment>
      );
    });
  }, [curWar]);

  const markerPoint = useMemo(() => {
    if (!events) return null;
    return events
      .filter(
        (event: any) =>
          event.positionOnMapX !== undefined &&
          event.positionOnMapY !== undefined &&
          event.markerSize
      )
      .map((event: any) => {
        return (
          <Fragment key={event.id}>
            <Marker
              position={[
                parseFloat(event.positionOnMapX),
                parseFloat(event.positionOnMapY),
              ]}
              eventHandlers={{
                click: () => {
                  if (event.isEvent) {
                    setCurrentEvent(event);
                    setIsPopupOpen(true);
                  }
                },
                mouseover: (e) => {
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  e.target.closePopup();
                },
              }}
              icon={setMarkerType(event.markerType)(
                event.isEvent ? event.eventOrder : event.title,
                event.markerSize,
                event.enemyColor
              )}>
              <Popup>
                <div className="flex flex-col">
                  <h3 className="font-bold text-bigger-base">{event.title}</h3>
                  <p className="text-base">{event.simpleDescription}</p>
                </div>
              </Popup>
            </Marker>

            {isPopupOpen && (
              <CustomPopup onClose={() => setIsPopupOpen(false)} />
            )}
          </Fragment>
        );
      });
  }, [events]);

  if (!curWar) return null;
  return (
    <main className="w-full h-full flex items-center justify-center">
      <section
        // h-[90%] xs:h-[90%]
        className="Map w-full ease-in duration-200 h-[90%] xs:h-[95%] m-2 z-10 flex flex-col justify-center items-center relative">
        <h1 className="xs:-mt-2 px-12 z-40 absolute top-0 rounded-sm text-bigger-base sm:text-extra-large lg:text-2x-large text-center font-medium text-text-primary bg-orange-dark/40 text-nowrap">
          <span>{curWar.title}</span>
          <br className="sm:hidden" /> <span>{curWar.warLength}</span>
        </h1>

        {curWar && (
          <MapContainer
            minZoom={6}
            doubleClickZoom={false}
            center={centerPoints}
            zoom={curWar.mapZoom}
            className="w-full h-full z-30 rounded-sm">
            {countriesList}
            <MapUpdater events={events} />
            <TileLayer
              attribution="Open Street Map"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            {markerPoint}
          </MapContainer>
        )}
        {isPopupOpen && <CustomPopup onClose={() => setIsPopupOpen(false)} />}
        <button
          onClick={setIsLegendOpen}
          className="z-40 absolute bottom-0 right-0 px-3 pt-4 pb-6 ease-in duration-200 bg-[#DAD7D7]/20 hover:bg-[#DAD7D7]/50 rounded-tl-sm hover:cursor-pointer">
          <img src={openLegend} alt="open legend" />
        </button>
      </section>
    </main>
  );
}
