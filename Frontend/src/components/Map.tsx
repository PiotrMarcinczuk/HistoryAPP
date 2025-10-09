import "leaflet/dist/leaflet.css";
import L, { icon } from "leaflet";
import T from "../../public/images/T.gif";
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
  Polygon,
} from "react-leaflet";
import CustomPopup from "./CustomPopup";
import MapElements from "../mapComponents/MapElements";
import StateNameOnMap from "../mapComponents/StateNameOnMap";

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
  const coordinates = [
    [54.600284964231236, 18.816058572016715],
    [54.6376400483374, 18.812986415258848],
    [54.6962716288063, 18.702388771974483],
    [54.82212432201163, 18.34601249369973],
    [54.834472197660205, 18.140161123135556],
    [54.82384169921852, 17.857543560768306],
    [54.79377580606209, 17.694727948007568],
    [54.749248185238514, 17.442113468899464],
    [54.71041080981391, 17.496647564055934],
    [54.65891495154642, 17.551184506632637],
    [54.61364712533407, 17.598458436904764],
    [54.53463349934833, 17.654800151751175],
    [54.46180117336175, 17.59484480065578],
    [54.43327628847021, 17.587594304887944],
    [54.41002847528597, 17.640282240269357],
    [54.374073601394656, 17.643914384781652],
    [54.34550385490925, 17.623938325585243],
    [54.331733835898575, 17.56763179418627],
    [54.315825332192986, 17.449537535361316],
    [54.29038597755081, 17.407756003706965],
    [54.2354694120219, 17.42778003816744],
    [54.21105463564885, 17.482273833783836],
    [54.18343248920206, 17.45140025196372],
    [54.138826620382844, 17.416940577139854],
    [54.121847169379436, 17.375217398558362],
    [54.1207151638435, 17.286171501644304],
    [54.101627557065115, 17.2154484188178],
    [54.07293390656565, 17.081036462332094],
    [54.01016102929103, 17.097187706674248],
    [53.96626884141651, 17.159680364854324],
    [53.91399649843862, 17.222165237887964],
    [53.89736054298473, 17.173752332164753],
    [53.82242883373132, 17.08670900167914],
    [53.773924821633216, 17.12404478041765],
    [53.6452072197975, 17.55199217406826],
    [53.53478033040301, 17.83519645205601],
    [53.438815277602316, 18.05442915951309],
    [53.22879813171801, 18.25936893951223],
    [53.0581206412638, 18.37073579440542],
    [52.958580655703344, 18.56088629449647],
    [52.93989371448228, 18.709811434409716],
    [53.00960736388532, 19.296709651879667],
    [52.995933877842276, 19.780305327721948],
    [53.02826627146379, 19.984913334533957],
    [53.144554856764216, 20.47704748111545],
    [53.23774167670783, 20.619831399896384],
    [53.35964717095746, 20.841722675694683],
    [53.446296521086936, 20.828938902396658],
    [53.481206551616935, 20.887561953373392],
    [53.46299651973837, 21.1221551647794],
    [53.470594707401915, 21.46393201675147],
    [53.53732331826967, 21.611797823404032],
    [53.56807565465175, 22.180050427114992],
    [53.68297111103661, 22.394391850881135],
    [53.77950055906189, 22.45053424195794],
    [53.893832128582204, 22.687438821486694],
    [54.252161282922316, 23.741134156333487],
    [54.40698202035179, 23.64712152532789],
    [54.570060016444614, 22.695816041797826],
    [54.80898271603883, 22.703701113440843],
    [55.260364641480095, 22.001848844574084],
    [55.70670194902311, 21.144030634423558],
    [55.06437796464817, 20.730708022885807],
    [54.9391333265456, 20.005433028463358],
    [54.65590961911724, 18.78104161184379],
    [54.59700888405945, 18.816820123275505],
    [54.60034629129538, 18.81612532010314],
    [54.59028554713282, 18.968919462413538],
  ];

  const secondCor = [
    [53.81160070530501, 17.127506025166156],
    [53.43649915887386, 15.921369316750855],
    [52.78209697189169, 16.385764746151324],
    [51.960716870787394, 16.990350756486578],
    [51.8168373540116, 18.596151417002886],
    [51.223837409147734, 19.201187716495724],
    [50.60630244418368, 20.873034338748965],
    [50.130985776518344, 22.426367533705076],
    [49.49483687657727, 23.723021741534723],
    [49.01948273757725, 25.750193611505722],
    [49.805745037866075, 25.942125968151487],
    [51.41672674600835, 25.445606185325403],
    [52.04790861782308, 25.10007607591143],
    [52.27522015812261, 26.384348425635096],
    [53.3358701166639, 26.28162258487731],
    [54.06912825944161, 27.167251623323068],
    [54.81144319685487, 27.003297275971562],
    [55.200528100654, 26.018580813221092],
    [54.82511326747567, 22.85325142374157],
    [54.80024872230419, 22.697065856162652],
    [54.579106910912316, 22.68936875104049],
    [54.41023965930532, 23.668664975991163],
    [54.263033813722075, 23.722209221018005],
    [53.76854611746404, 22.406245975957717],
    [53.66894248868019, 22.390944868889477],
    [53.600888885697486, 22.107822585234032],
    [53.560013017541564, 21.878322470986006],
    [53.467836958634905, 21.28121343648914],
    [53.4723905762321, 20.8757096692253],
    [53.42226817194836, 20.83745649772942],
    [53.335553425910774, 20.829808920228658],
    [53.23492472422194, 20.60791486649518],
    [53.046758029053734, 20.072360002485226],
    [53.00994478140808, 19.659203969562697],
    [53.02375113867933, 19.353156119683916],
    [52.99152162888572, 18.9782367577605],
    [52.98230645867707, 18.603307818402925],
    [53.097316261419024, 18.366096431634105],
    [53.36752790553979, 18.09833192573862],
    [53.527011193631864, 17.876478371769252],
    [53.708532587413515, 17.394534272933527],
    [53.7944802813912, 17.09617929424695],
    [53.79520498124862, 17.07451252967536],
  ];

  const linePositions: [number, number][] = coordinates.map(
    (coord) => [coord[0], coord[1]] as [number, number]
  );
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
          dragging={false}
          scrollWheelZoom={false}
          className="w-full h-full z-30 rounded-sm">
          {console.log(curWar.countries)}
          {curWar.countries.map((country) => {
            const coordinates = country.coordinates.data;
            const color = country.colorOnMap;
            const dElement = country.dElement;
            const fontSize = country.fontSize;
            const name = country.name;
            const bounds = country.bounds.data;
            return (
              <Fragment key={country.id}>
                <Polygon positions={coordinates} color={color} weight={0} />
                {/* API COLOR  */}
                <StateNameOnMap
                  dElement={dElement}
                  fontSize={fontSize}
                  text={name}
                  bounds={bounds}
                />
              </Fragment>
            );
          })}

          {/* <Polygon positions={secondCor} color="red" weight={0} />
          {/* API COLOR  */}

          {/* <StateNameOnMap
            dElement={"M10,150 C50,50 450,50 550,150"}
            fontSize={46}
            text={"Królestwo Polskie"}
            bounds={[
              [53.092631125747525, 19.416544065151328],
              [51.68776748482065, 22.00102918417045],
            ]}
          />}
          <MapUpdater
            zoom={curWar.MapZoom}
            center={[curWar.Center.lat, curWar.Center.lng]}
            events={events}
          /> */}
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
