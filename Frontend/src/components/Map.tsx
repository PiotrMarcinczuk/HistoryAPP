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

export function ResizeHandler({ deps }: ResizeHandlerProps) {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }, [map, ...deps]);

  return null;
}

function MapUpdater({ zoom, center, events }: MapUpdaterProps) {
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
  const coords = [
    [16.91169144014222, 53.58693047404711],
    [16.878864248916244, 53.5208584043219],
    [16.82578531886685, 53.50508061580345],
    [16.719625377006906, 53.50929311918176],
    [16.533695993267088, 53.70573486119193],
    [16.46185109113327, 53.72699329480963],
    [16.385219486762566, 53.705730405811295],
    [16.373261231571576, 53.654659766550225],
    [16.586391681284, 53.506782367765624],
    [16.33008524212829, 53.46687573634071],
    [16.296551036903026, 53.43121474927571],
    [16.33723764821201, 53.405513791475755],
    [16.423452353261723, 53.39979757775512],
    [16.06359524247614, 52.69345042849804],
    [15.480811926501048, 52.57628337322774],
    [15.376521250970967, 52.41408276904204],
    [15.45927626241135, 52.429413126581295],
    [15.534918232343301, 52.40085743228272],
    [15.542131866474193, 52.34589308574277],
    [15.599798399137228, 52.08552645917416],
    [16.18713047908375, 51.66831121745673],
    [16.586538240509668, 51.57020718443408],
    [17.056137560797993, 51.540190276105506],
    [17.323837272773375, 51.48556497708827],
    [17.499295444917493, 51.21700070382465],
    [17.9337096851645, 51.03248077915231],
    [18.422862713027286, 50.90180066012613],
    [18.835273568168446, 50.73270739349206],
    [19.260763788236858, 50.56024366527808],
    [19.304638596909598, 50.39272411518738],
    [19.23008959318244, 50.25264402783037],
    [19.12042229936344, 50.14026117704668],
    [19.247669872008743, 50.01636433577451],
    [19.427531066882437, 49.965629604153065],
    [19.36169763749706, 49.91765107802229],
    [19.392292440344193, 49.8075109558566],
    [19.50467673877992, 49.58028072665101],
    [19.650114521657827, 49.394988579535664],
    [19.80190112709468, 49.404491058723295],
    [19.78144443577534, 49.07128980080293],
    [20.210210422661532, 49.0638109115626],
    [20.145998326329817, 49.3760757230811],
    [21.04087328827623, 49.39542480594437],
    [21.41146106516763, 49.420948508281924],
    [23.65992575348676, 48.74339962453229],
    [25.24416998716211, 48.069585508897376],
    [26.564157003967864, 47.171657810503376],
    [27.104732712851103, 45.95073310501556],
    [27.2593727900275, 45.41170090567715],
    [28.054422030219428, 45.16125770729536],
    [28.673992110587562, 45.06108625635724],
    [29.477549933749913, 44.91325674969639],
    [29.688794602171583, 45.358457700236244],
    [29.533067013213582, 45.6407033011501],
    [29.94759682600329, 45.78478718419797],
    [30.42349643578396, 45.97939728631377],
    [30.732690985747922, 46.31658897694476],
    [30.2276168120774, 46.61540709428283],
    [29.560163065505577, 47.04948157749794],
    [29.420020641012258, 47.385314468125245],
    [29.148108324427938, 47.680166502387294],
    [29.098650020439578, 48.00609822425409],
    [28.653706690478884, 48.182206821779545],
    [28.33235465977444, 48.160232981853],
    [27.870939236569058, 48.40696747872599],
    [27.69341049086566, 48.908598121682815],
    [27.615244251827704, 49.25909406021023],
    [27.639322497168735, 49.65387897307593],
    [28.294808033241793, 49.96048726290613],
    [27.885946789529157, 50.3304956234895],
    [27.21241180153592, 50.33046862125377],
    [26.559229573416644, 50.216865565483914],
    [25.1942175569215, 50.34368302613484],
    [23.986285138983135, 50.773508371069624],
    [23.98630117408075, 50.77348559807248],
    [23.982298223075873, 50.8273855934695],
    [24.126688970593506, 50.82057595234903],
    [24.233998898194443, 51.10353408124405],
    [24.359933458734844, 51.28840756674734],
    [24.809728460281008, 51.494963004689396],
    [24.87090258513237, 51.63364241358656],
    [25.004018005678432, 51.68720536803443],
    [24.89608777133492, 51.82307821525865],
    [24.73417205296488, 51.84086773267171],
    [24.539870818722306, 51.79193248574998],
    [24.395943978541766, 51.711741962979545],
    [24.39233590853422, 51.58224076491811],
    [24.30238558169961, 51.51063925357897],
    [24.1008906777717, 51.46582904229646],
    [23.920366442624385, 51.56905162209165],
    [23.823219922744357, 51.55339237933376],
    [23.53709127574112, 51.471959750791],
    [23.26640300138294, 51.63837282338781],
    [23.172417823365464, 51.87580683135968],
    [23.229983267562858, 52.00666765864207],
    [23.172419223093158, 52.10621843994781],
    [22.953811654183113, 52.216755952690164],
    [22.730706263868058, 52.357633984706524],
    [22.665941088405248, 52.42350933284993],
    [22.655148429265296, 52.530889154112714],
    [22.97327745218533, 52.599935779883936],
    [23.077599905305703, 52.53871477877951],
    [23.173183050033828, 52.55184043966736],
    [23.2199624908759, 52.65452656256605],
    [23.104849365337742, 52.80484976479542],
    [23.396253767585307, 52.97415852530912],
    [23.461700811857725, 53.112940013867444],
    [23.28545170828096, 53.171215269389336],
    [23.188326794013165, 53.18631477536593],
    [23.335797518171546, 53.38417808771476],
    [23.781877321991487, 53.424915934470135],
    [23.61995749799115, 53.51912051472257],
    [23.43293496022895, 53.593951202256164],
    [23.328601119386946, 53.58754473226122],
    [22.26006388601857, 53.38634354938074],
    [21.168267742943954, 53.37560785526051],
    [19.772303373187412, 53.17769129860551],
    [19.423637551243957, 53.19259786578726],
    [19.020609975856615, 53.06741090190667],
    [19.02060037747384, 52.83328886805768],
    [18.775927430106975, 52.80502144853736],
    [18.63921223520714, 52.75061041230404],
    [18.584033083060177, 52.95500439962086],
    [18.1917505559357, 53.09137084903102],
    [18.152147899507924, 53.1280965669294],
    [18.20978825881457, 53.175566091735504],
    [18.216941955345078, 53.22515324212421],
    [17.882543753761297, 53.4678239159432],
    [17.48340052667686, 53.581207956208715],
    [16.911238101631113, 53.58689658976593],
  ];
  const newCoords = [];
  coords.forEach((coord) => {
    newCoords.push([coord[1], coord[0]]);
  });
  console.log(JSON.stringify(newCoords, null, 2));

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

  const centerPoints: [number, number] = useMemo(() => {
    if (!curWar) return [0, 0];
    return [curWar.center.data[0], curWar.center.data[1]];
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
          <MapUpdater
            zoom={curWar.mapZoom}
            center={centerPoints}
            events={events}
          />{" "}
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
