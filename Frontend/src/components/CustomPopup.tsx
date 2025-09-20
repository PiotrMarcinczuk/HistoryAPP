import { createPortal } from "react-dom";
import img1 from "../../public/images/img1.png";
import CustomLine from "./CustomLine";
export default function Popup({ onClose }: { onClose: () => void }) {
  return (
    <>
      {createPortal(
        <section className="fixed px-2 left-0 top-0 flex justify-center items-center w-screen h-full bg-[#D9D9D9]/65 z-50">
          <div className=" relative overflow-hidden overflow-y-auto border-2 border-orange-dark rounded-lg bg-orange-normal max-w-[1400px] w-full max-h-[906px] h-full px-3 py-2">
            <div className="flex flex-col text-text-primary">
              <div className="flex justify-between  items-center mb-6">
                <h1 className="text-2x-large text-semibold">
                  BITWA POD GRUNWALDEM 1410
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
              <div className="flex -mx-1.5">
                <span className="text-extra-large mx-1.5">
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
                  <figcaption className="mt-2 text-bigger-base text-wrap w-3/4 text-center">
                    Polski władca na polach Grunwaldu
                  </figcaption>
                </div>
              </div>
              <CustomLine isEven={true} />
              <div className="flex -mx-1.5">
                <div className="flex flex-col items-center min-w-81 mx-1.5">
                  <img src={img1} alt="król" className="w-full" />
                  <figcaption className="mt-2 text-bigger-base text-wrap w-3/4 text-center">
                    Polski władca na polach Grunwaldu
                  </figcaption>
                </div>
                <span className="text-extra-large mx-1.5">
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
              <div className="flex -mx-1.5">
                <span className="text-extra-large mx-1.5">
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
                  <figcaption className="mt-2 text-bigger-base text-wrap w-3/4 text-center">
                    Polski władca na polach Grunwaldu
                  </figcaption>
                </div>
              </div>
            </div>
          </div>
        </section>,
        document.body
      )}
    </>
  );
}
