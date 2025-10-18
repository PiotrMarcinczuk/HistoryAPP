import { Fragment, useState } from "react";
import { useLegendIsOpenContext } from "../providers/LegendIsOpenProvider";
import arrow from "../../public/icons/arrow.svg";
import battleIcon from "../../public/icons/battle-icon-24.svg";
import { useWarContext } from "../providers/WarProvider";
import { Scrollbar } from "react-scrollbars-custom";

export default function LegendBar() {
  const { isLegendOpen, setIsLegendOpen } = useLegendIsOpenContext() as {
    isLegendOpen: boolean;
    setIsLegendOpen: () => void;
  };

  const { currentWar, countriesList } = useWarContext() as {
    currentWar: any;
    countriesList: any[];
  };
  const curWar = currentWar?.[0];

  return (
    <section
      className={`max-w-[400px] w-full z-50 h-full fixed top-0 right-0 text-text-primary  ${
        isLegendOpen ? "translate-x-0" : "translate-x-full"
      } ease-in duration-200 `}>
      <div className="flex flex-col items-center justify-center p-4 w-full h-full ">
        <div className="absolute inset-0 bg-[url('/images/legend-bg.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-orange-darker/80"></div>
        <Scrollbar className="relative bg-[#DDD5CD]/20 z-20 h-full w-full flex flex-col overflow-y-hidden overflow-x-hidden">
          <ul className="w-full p-1">
            {curWar?.legendImages &&
              curWar?.legendImages.map((img: any) => {
                return (
                  <li key={img.id} className="flex py-2 items-center">
                    <img
                      className="max-w-10"
                      src={`${img.url}`}
                      alt={img.alternativeText}
                    />
                    <p className="ml-2 word-break text-base">{img.caption}</p>
                  </li>
                );
              })}
          </ul>
          <Scrollbar
            style={{
              height: "100%",
              minHeight: "200px",
              maxHeight: "calc(100vh - 150px)",
            }}
            className="flex-1 text-center flex flex-col items-center mt-8 h-full Legend">
            <p className="text-large">Strony konfliktu:</p>
            <div className="flex text-base mt-2 w-full">
              <div className="w-1/2 flex items-start justify-start flex-col p-1">
                {countriesList
                  .filter((country) => !country.isEnemy)
                  .map((country) => {
                    return (
                      <Fragment key={country.id}>
                        <div key={country.id} className="flex w-full">
                          <div className="w-14 h-12 flex items-center">
                            <img
                              src={`${country.flag.url}`}
                              alt={country.flag.alternativeText}
                            />
                            <figcaption className="ml-1 leading-4 text-left">
                              {country.name}
                            </figcaption>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
              </div>
              <div className="w-16 flex items-center justify-center">
                <img src={battleIcon} className="w-6" alt="Ikona bitwy" />
              </div>
              <div className="w-1/2 flex items-center justify-start flex-col p-1">
                {countriesList
                  .filter((country) => country.isEnemy)
                  .map((country) => {
                    return (
                      <Fragment key={country.id}>
                        <div key={country.id} className="flex w-full">
                          <div className="w-14 h-12 flex items-center">
                            <img
                              src={`${country.flag.url}`}
                              alt={country.flag.alternativeText}
                            />
                            <figcaption className="ml-1 leading-4 text-left">
                              {country.name}
                            </figcaption>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
              </div>
            </div>
          </Scrollbar>
          <p className="mt-3 md:mt-0 text-center text-small px-1">
            Jeśli podczas korzystania ze strony napotkałeś jakieś błędy będe
            wdzięczny jeśli dasz mi znać{" "}
            <a
              className="font-bold duration-200 ease-in-out text-center"
              href="mailto:piotrmarcinczuk@gmail.com">
              piotrmarcinczuk@gmail.com
            </a>
          </p>
          <div className="mt-10 px-1">
            <p>Źródła:</p>
            <ul className="overflow-hidden ">
              {curWar?.sources &&
                curWar.sources.split(/\s+/).map((src: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className="py-0.1 text-extra-small hover:underline hover:cursor-pointer">
                      <a target="_blank" href={src}>
                        {src}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </Scrollbar>

        <div
          className={`absolute ease-in duration-200 ${
            isLegendOpen ? "ml-2 sm:-translate-x-1/2 sm:ml-0" : ""
          } left-0 top-1/2 z-50 border-black bg-yellow-darker/80 border-1 rounded-full`}>
          <button
            onClick={setIsLegendOpen}
            className="w-18 h-18 rotate-180 flex justify-center items-center hover:cursor-pointer">
            <img src={arrow} alt="navbar button" />
          </button>
        </div>
      </div>
    </section>
  );
}
