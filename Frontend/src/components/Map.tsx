import "leaflet/dist/leaflet.css";
import { useState, Fragment } from "react";
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
  Polygon,
} from "react-leaflet";
import CustomPopup from "./CustomPopup";
import MapElements from "../mapComponents/MapElements";
import CountriesNameOnMap from "../mapComponents/CountriesNameOnMap";

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
      // h-[90%] xs:h-[90%]
      className={`${
        isNavOpen ? "xl:w-[75%] w-full" : "w-full"
      } ease-in duration-200 h-[90%] xs:h-[95%] m-2 z-10 flex flex-col justify-center items-center relative`}>
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
          {curWar.countries.map((country: any) => {
            const coordinates = country.coordinates.data;
            const color = country.colorOnMap;
            const dElement = country.dElement;
            const fontSize = country.fontSize;
            const name = country.name;
            const bounds = country.bounds.data;
            return (
              <Fragment key={country.id}>
                <Polygon positions={coordinates} color={color} weight={0} />
                <CountriesNameOnMap
                  dElement={dElement}
                  fontSize={fontSize}
                  text={name}
                  bounds={bounds}
                />
              </Fragment>
            );
          })}
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
                        mouseover: (e) => {
                          e.target.openPopup();
                        },
                        mouseout: (e) => {
                          e.target.closePopup();
                        },
                      }}
                      icon={setMarkerType(event.MarkerType)(
                        event.IsEvent ? event.EventOrder : event.Title
                      )}>
                      <Popup>
                        <div className="flex flex-col">
                          <h3 className="font-bold text-bigger-base">
                            {event.Title}
                          </h3>
                          <p className="break-all">{event.SimpleDescription}</p>
                        </div>
                      </Popup>
                    </Marker>

                    {isPopupOpen && (
                      <CustomPopup onClose={() => setIsPopupOpen(false)} />
                    )}
                  </Fragment>
                );
              })}
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
