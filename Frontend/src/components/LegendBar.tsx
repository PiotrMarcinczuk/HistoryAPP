import { useState } from "react";
import { useLegendIsOpenContext } from "../providers/LegendIsOpenProvider";
import vector from "../../public/icons/vector.png";
import { useWarContext } from "../providers/WarProvider";
const VITE_API_URL_UPLOADS = import.meta.env.VITE_API_URL_UPLOADS;
import { Scrollbar } from "react-scrollbars-custom";

export default function LegendBar() {
  const [sourcesIsOpen, setSourcesIsOpen] = useState(false);
  const { isLegendOpen, setIsLegendOpen } = useLegendIsOpenContext() as {
    isLegendOpen: boolean;
    setIsLegendOpen: () => void;
  };

  const { currentWar } = useWarContext() as { currentWar: any };
  const curWar = currentWar?.[0];

  return (
    <section
      className={`max-w-[400px] w-full z-50 h-full fixed top-0 right-0 text-text-primary ${
        isLegendOpen ? "translate-x-0" : "translate-x-full"
      } ease-in duration-200`}>
      <div className="flex flex-col items-center justify-center p-4 w-full h-full">
        <div className="absolute inset-0 bg-[url('/images/legend-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-orange-darker/80"></div>
        <div className="relative bg-[#DDD5CD]/20 z-20 h-full w-full flex flex-col overflow-hidden">
          <ul className="w-full h-full p-1">
            {/* src={`${VITE_API_URL_UPLOADS}${curEvent.Images[pIndex].url}`} */}
            {curWar?.LegendImages.map((img: any) => {
              return (
                <li key={img.id} className="p-1 flex items-center">
                  <img
                    className="max-w-12"
                    src={`${VITE_API_URL_UPLOADS}${img.url}`}
                  />
                  <p className="ml-2 word-break text-base">{img.caption}</p>
                </li>
              );
            })}
          </ul>
          <p className="text-bigger-base text-center mt-10 ease-in duration-200">
            {sourcesIsOpen ? "Chcesz ukryć źródła?" : "Interesują cię źródła?"}{" "}
            Kliknij{" "}
            <button
              onClick={() => setSourcesIsOpen(!sourcesIsOpen)}
              className="font-bold hover:cursor-pointer">
              tutaj
            </button>
          </p>
          <Scrollbar
            className={`w-full ease-in duration-200 relative ${
              sourcesIsOpen ? "overflow-y-auto max-h-32" : "max-h-0"
            }`}>
            <ul>
              {curWar?.Sources.split(/\s+/).map((src: any, index: number) => {
                return (
                  <li
                    key={index}
                    className="py-0.1 text-extra-small px-2 hover:underline hover:cursor-pointer">
                    <a target="_blank" href={src}>
                      {src}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Scrollbar>
        </div>

        <div
          className={`absolute ease-in duration-200 ${
            isLegendOpen ? "ml-2 sm:-translate-x-1/2 sm:ml-0" : ""
          } left-0 top-1/2 z-50 border-black bg-yellow-darker/80 border-1 rounded-full`}>
          <button
            onClick={setIsLegendOpen}
            className="w-18 h-18 rotate-180 flex justify-center items-center hover:cursor-pointer">
            <img src={vector} alt="navbar button" />
          </button>
        </div>
      </div>
    </section>
  );
}
