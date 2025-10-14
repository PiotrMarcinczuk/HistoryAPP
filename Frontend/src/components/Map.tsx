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
import CountriesNameOnMap from "../mapComponents/CountriesNameOnMap";
import {
  ResizeHandlerProps,
  MapUpdaterProps,
} from "../interfaces/componentInterfaces";
import { useMapEvents } from "react-leaflet/hooks";

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
  // const coords = [
  //   [19.606080308588247, 49.47062165506438],
  //   [19.35621447663172, 49.30170708687348],
  //   [19.07086931521198, 49.26030759982774],
  //   [18.74323069268712, 49.52180646351391],
  //   [18.30201158889929, 49.45428897823351],
  //   [18.007729432473212, 49.38157117562082],
  //   [17.925306813744015, 49.162579815501374],
  //   [17.960625743209363, 48.931009315942504],
  //   [17.76631349380196, 48.88454678239043],
  //   [17.412936739280667, 48.83799914165158],
  //   [17.25385680824766, 48.9076979172622],
  //   [17.12427134971057, 48.764243834757735],
  //   [16.976965316054077, 48.45261624779761],
  //   [17.02404803901547, 48.201883433551785],
  //   [17.121398513303262, 47.9734394654121],
  //   [17.068378875782003, 47.82731067520959],
  //   [16.850421722977245, 47.74418479222189],
  //   [16.53223274190185, 47.71254832479198],
  //   [16.38494970399239, 47.62135892566056],
  //   [16.349530094946175, 47.446579748049714],
  //   [16.31758533582942, 47.24676646882932],
  //   [16.30583194694998, 47.038276213490064],
  //   [16.1706169195171, 46.660344507213125],
  //   [15.91160359756202, 46.33702526913771],
  //   [15.794931332529359, 45.93277656119622],
  //   [15.55187088630123, 45.73634516307871],
  //   [15.231020584157108, 45.70918459373098],
  //   [14.628313475807772, 45.6685026115955],
  //   [14.628215024208714, 45.24560119201897],
  //   [14.735123152383295, 44.9366635910057],
  //   [14.754567343516527, 44.52220830741126],
  //   [15.114319227944407, 43.97198648459403],
  //   [15.878533285336033, 43.31370229862384],
  //   [16.675806560148885, 42.973179080451246],
  //   [16.909155359329077, 42.716543476328866],
  //   [17.657409350711305, 42.68710411342187],
  //   [17.94095914723917, 42.993770309258],
  //   [17.99138152307856, 43.16701919566563],
  //   [18.5228340918259, 43.693753384447405],
  //   [18.853113376818612, 43.68855775276214],
  //   [19.090040241339466, 43.98892105056572],
  //   [18.37203621540246, 44.3238325760567],
  //   [17.668930172379675, 44.74246221736368],
  //   [18.271399161176532, 45.22356443389256],
  //   [19.146011802655835, 45.196176326093166],
  //   [20.944700937353844, 44.65470754284351],
  //   [21.469461959394067, 44.79281098705857],
  //   [21.780406951785068, 44.71001590468248],
  //   [23.345545189965833, 44.63064339190797],
  //   [24.143719217169917, 44.748802502602274],
  //   [24.515605239254796, 45.02633362995701],
  //   [25.536291390604106, 45.08801723547083],
  //   [26.32700323459369, 45.14068594959991],
  //   [26.9355218742042, 45.239974180089206],
  //   [25.79020222211446, 46.738045310310596],
  //   [24.52590684718325, 48.188131917571184],
  //   [22.29710531435498, 49.139674399706735],
  //   [21.993866734803163, 49.33670606397828],
  //   [21.616425175623107, 49.43695847287836],
  //   [21.09472049924264, 49.42313232919574],
  //   [20.937793723456224, 49.31900108842342],
  //   [20.750725838793272, 49.409393471448794],
  //   [20.354698211815332, 49.41044446164133],
  //   [20.204198718904905, 49.34578413337502],
  //   [20.081791667854247, 49.180896039840974],
  //   [19.971640259344895, 49.23563947740965],
  //   [19.771501910649874, 49.21933074951059],
  //   [19.794352487198097, 49.39864224465555],
  //   [19.657444464291245, 49.43709504878262],
  //   [19.601190476433686, 49.47229478991136],
  // ];
  // const newCoords = [];
  // coords.forEach((coord) => {
  //   newCoords.push([coord[1], coord[0]]);
  // });
  // console.log(JSON.stringify(newCoords, null, 2));

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
    if (!curWar) return [51, 22];
    return [curWar.center.data[0], curWar.center.data[1]];
  }, [events]);

  const countriesList = useMemo(() => {
    if (!curWar) return null;
    return curWar.countries.map((country: any) => {
      const coordinates = country.coordinates.data;
      const color = country.colorOnMap;
      const dElement = country.dElement;
      const fontSize = country.fontSize;
      const name = country.name;
      const bounds = country.bounds.data;
      return (
        <Fragment key={country.id}>
          <Polygon
            interactive={false}
            positions={coordinates}
            color={color}
            weight={0}
          />
          <CountriesNameOnMap
            dElement={dElement}
            fontSize={fontSize}
            text={name}
            bounds={bounds}
          />
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
    <section
      // h-[90%] xs:h-[90%]
      className="w-full ease-in duration-200 h-[90%] xs:h-[95%] m-2 z-10 flex flex-col justify-center items-center relative">
      <h1 className="xs:-mt-2 px-12 z-40 absolute top-0 rounded-sm text-bigger-base sm:text-extra-large lg:text-2x-large text-center font-medium text-text-primary bg-orange-dark/40 text-nowrap">
        {curWar.title}
        <br className="sm:hidden" /> {curWar.warLength}
      </h1>

      {curWar && (
        <MapContainer
          center={centerPoints}
          zoom={curWar.mapZoom}
          scrollWheelZoom={false}
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
  );
}
