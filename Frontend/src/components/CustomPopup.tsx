import { Fragment } from "react";
import { createPortal } from "react-dom";
import CustomLine from "./CustomLine";
import { Scrollbar } from "react-scrollbars-custom";
import { useEventsContext } from "../providers/EventsProvider";
import { EventsContextType } from "../interfaces/prvoiderInterfaces";
import { ParagraphChildType } from "../interfaces/componentInterfaces";

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
            className="flex relative overflow-y-auto max-w-[1400px] w-full">
            <div className="border-2 border-orange-dark rounded-lg bg-orange-normal mt-2">
              <div className="flex flex-col w-full text-text-primary px-3 py-2">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-bigger-base sm:text-2x-large text-semibold">
                    {curEvent.title}
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

                {curEvent.description.map((paragraph: any, pIndex: number) => (
                  <Fragment key={pIndex}>
                    {/* items-center possible bug */}
                    <div
                      className={`flex flex-col-reverse items-center sm:items-start sm:justify-between ${
                        checkIfEven(pIndex)
                          ? "sm:flex-row-reverse"
                          : "sm:flex-row"
                      } -mx-1.5`}>
                      {/* max-w-81 min-w-81 */}
                      <div className="flex flex-col items-center xs:max-w-1/2 mx-1.5 mt-2 sm:mt-0">
                        {curEvent.images[pIndex] && (
                          <img
                            src={`${curEvent.images[pIndex].url}`}
                            alt={curEvent.images[pIndex].alternativeText}
                          />
                        )}

                        {curEvent.images[pIndex] && (
                          <figcaption className="mt-2 text-base text-wrap w-3/4 text-center">
                            {curEvent.images[pIndex].caption}
                          </figcaption>
                        )}
                      </div>
                      <div className="mx-1.5 xs:max-w-2/3">
                        {paragraph.children.map(
                          (child: ParagraphChildType, cIndex: number) =>
                            child.text && (
                              <span
                                key={cIndex}
                                className={`text-bigger-base md:text-large ${
                                  child.bold ? "font-bold" : ""
                                }`}>
                                {child.text}
                              </span>
                            )
                        )}
                      </div>
                    </div>
                    {/* Possible bugs */}
                    {pIndex < curEvent.description.length - 1 && (
                      <CustomLine isEven={checkIfEven(pIndex)} />
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </Scrollbar>
        </section>,
        document.body
      )}
    </>
  );
}
