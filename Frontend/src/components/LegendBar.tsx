import { useLegendIsOpenContext } from "../providers/LegendIsOpenProvider";
import vector from "../../public/icons/vector.png";

export default function LegendBar() {
  const { isLegendOpen, setIsLegendOpen } = useLegendIsOpenContext() as {
    isLegendOpen: boolean;
    setIsLegendOpen: () => void;
  };

  return (
    <section
      className={`max-w-[400px] w-full z-50 h-full fixed top-0 right-0 ${
        isLegendOpen ? "translate-x-0" : "translate-x-full"
      } ease-in duration-200`}>
      <div className="flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[url('/images/legend-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-orange-darker/80"></div>

        <div className="bg-[#DDD5CD]/20 z-20 w-full h-full">fsd</div>
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
