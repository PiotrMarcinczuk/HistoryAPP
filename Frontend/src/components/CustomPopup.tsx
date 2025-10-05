import { Fragment } from "react";
import { createPortal } from "react-dom";
import CustomLine from "./CustomLine";
import { Scrollbar } from "react-scrollbars-custom";
import { useEventsContext } from "../providers/EventsProvider";
import { EventsContextType } from "../interfaces/prvoiderInterfaces";
import { ParagraphChildType } from "../interfaces/componentInterfaces";

const VITE_API_URL_UPLOADS = import.meta.env.VITE_API_URL_UPLOADS;
export default function Popup({ onClose }: { onClose: () => void }) {
  const { currentEvent } = useEventsContext() as EventsContextType;
  const curEvent = currentEvent?.[0];
  const checkIfEven = (index: number) => index % 2 === 0;

  if (!curEvent) return null;

  return (
    <>
      {createPortal(
        <section className="fixed px-2 left-0 top-0 flex justify-center xl:items-center py-4 xl:py-0 w-screen h-full bg-[#D9D9D9]/65 z-50">
          <Scrollbar
            noScrollX
            className="relative overflow-x-hidden overflow-y-auto border-2 border-orange-dark rounded-lg bg-orange-normal max-w-[1400px] w-full max-h-[906px] h-full">
            <div className="flex flex-col w-full text-text-primary px-3 py-2">
              <div className="flex justify-between  items-center mb-6">
                <h1 className="text-bigger-base sm:text-2x-large text-semibold">
                  {curEvent.Title}
                </h1>
                <button
                  onClick={onClose}
                  className="bg-[#F4F2EF] text-black hover:bg-brown-dark hover:cursor-pointer ease-in duration-200 flex justify-center items-center w-18 h-18 rounded-sm border-1 border-orange-darker">
                  <div>
                    <hr className="w-22 h-px rotate-45" />
                    <hr className="w-22 h-px -rotate-45" />
                  </div>
                </button>
              </div>

              {curEvent.Description.map((paragraph: any, pIndex: number) => (
                <Fragment key={pIndex}>
                  {/* items-center possible bug */}
                  <div
                    className={`flex flex-col-reverse items-center sm:items-start sm:justify-between sm:flex-row ${
                      checkIfEven(pIndex)
                        ? "sm:flex-row-reverse"
                        : "sm:flex-row"
                    } -mx-1.5`}>
                    <div className="flex flex-col items-center max-w-81 min-w-81 mx-1.5 mt-2 sm:mt-0">
                      {curEvent.Images[pIndex] && (
                        <img
                          src={`${VITE_API_URL_UPLOADS}${curEvent.Images[pIndex].url}`}
                          alt="król"
                          className="w-full"
                        />
                      )}
                      {curEvent.Images[pIndex] && (
                        <figcaption className="mt-2 text-base md:text-bigger-base text-wrap w-3/4 text-center">
                          {curEvent.Images[pIndex].caption}
                        </figcaption>
                      )}
                    </div>
                    <div className="mx-1.5">
                      {paragraph.children.map(
                        (child: ParagraphChildType, cIndex: number) =>
                          child.text && (
                            <span
                              key={cIndex}
                              className={`text-bigger-base md:text-large lg:text-extra-large ${
                                child.bold ? "font-bold" : ""
                              }`}>
                              {child.text}
                            </span>
                          )
                      )}
                    </div>
                  </div>
                  {/* Possible bugs */}
                  {pIndex < curEvent.Description.length - 1 && (
                    <CustomLine isEven={checkIfEven(pIndex)} />
                  )}
                </Fragment>
              ))}

              {/* <CustomLine isEven={true} /> 
               <div className="flex flex-col items-center min-w-81 mx-1.5 mt-2 sm:mt-0">
                  <img src={img1} alt="król" className="w-full" />
                  <figcaption className="mt-2 text-base md:text-bigger-base text-wrap w-3/4 text-center">
                    Polski władca na polach Grunwaldu
                  </figcaption>
                </div> 
               <div
                className={`flex ${
                  false ? "flex-col" : "flex-col-reverse"
                } sm:flex-row -mx-1.5`}>
                <div className="flex flex-col items-center min-w-81 mx-1.5 mt-2 sm:mt-0">
                  <img src={img1} alt="król" className="w-full" />
                  <figcaption className="mt-2 text-base md:text-bigger-base text-wrap w-3/4 text-center">
                    Polski władca na polach Grunwaldu
                  </figcaption>
                </div>
                <span className="text-bigger-base md:text-large lg:text-extra-large mx-1.5">
                  Bitwa pod Grunwaldem miała miejsce 15 lipca 1410 roku i była
                  jednym z największych starć średniowiecznej Europy. Starły się
                  w niej wojska Królestwa Polskiego i Wielkiego Księstwa
                  Litewskiego pod wodzą króla Władysława II Jagiełły oraz
                  Wielkiego Księcia Litewskiego Witolda z armią Zakonu
                  Krzyżackiego, dowodzoną przez Wielkiego Mistrza Ulryka von
                  Jungingena.
                </span>
              </div>
              <CustomLine isEven={false} />
              <div
                className={`flex ${
                  true ? "flex-col" : "flex-col-reverse"
                } sm:flex-row -mx-1.5`}>
                <span className="text-bigger-base md:text-large lg:text-extra-large mx-1.5 mt-2 sm:mt-0">
                  Bitwa pod Grunwaldem miała miejsce 15 lipca 1410 roku i była
                  jednym z największych starć średniowiecznej Europy. Starły się
                  w niej wojska Królestwa Polskiego i Wielkiego Księstwa
                  Litewskiego pod wodzą króla Władysława II Jagiełły oraz
                  Wielkiego Księcia Litewskiego Witolda z armią Zakonu
                  Krzyżackiego, dowodzoną przez Wielkiego Mistrza Ulryka von
                  Jungingena.
                </span>
                <div className="flex flex-col items-center min-w-81 mx-1.5">
                  <img src={img1} alt="król" className="w-full" />
                  <figcaption className="mt-2 text-base md:text-bigger-base text-wrap w-3/4 text-center">
                    Polski władca na polach Grunwaldu
                  </figcaption>
                </div>
              </div>  */}
            </div>
          </Scrollbar>
        </section>,
        document.body
      )}
    </>
  );
}
