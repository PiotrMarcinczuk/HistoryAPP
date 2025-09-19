import "leaflet/dist/leaflet.css";
import openLegend from "../../public/images/open-legend.png";
import { useEffect } from "react";
import { useNavigationIsOpenContext } from "../providers/NavigationIsOpenProvider";
import { useLegendIsOpenContext } from "../providers/LegendIsOpenProvider";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import { useMap } from "react-leaflet";

export function ResizeHandler({ deps }: { deps: any[] }) {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }, [map, ...deps]);

  return null;
}

export default function Map() {
  const NavContext = useNavigationIsOpenContext();
  const LegendContext = useLegendIsOpenContext();
  const zoom = 8; // API
  const { isNavOpen } = NavContext as { isNavOpen: boolean };
  const { setIsLegendOpen } = LegendContext as {
    setIsLegendOpen: () => void;
  };

  return (
    <main
      className={`${
        isNavOpen ? "xl:w-[75%] w-full" : "w-full"
      } ease-in duration-200 h-[95%] m-2 z-10 flex flex-col justify-center items-center relative`}>
      <h1 className="-mt-8 px-24 z-40 translate-y-1/2 rounded-sm text-bigger-base sm:text-extra-large lg:text-2x-large text-center font-medium text-text-primary bg-orange-dark/40 text-nowrap">
        Wielka Wojna z Zakonem {/* API */}
        <br className="sm:hidden" />
        <span> 1409 - 1411</span>
        {/* API */}
      </h1>
      <MapContainer
        center={[53.5948, 19.568]}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full z-30 rounded-sm">
        <ResizeHandler deps={[isNavOpen]} />
        <TileLayer
          attribution='"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <button
        onClick={setIsLegendOpen}
        className="z-50 absolute bottom-0 right-0 px-3 pt-4 pb-6 bg-[#DAD7D7]/20 rounded-tl-sm hover:cursor-pointer">
        <img src={openLegend} alt="open legend" />
      </button>
    </main>
  );
}
