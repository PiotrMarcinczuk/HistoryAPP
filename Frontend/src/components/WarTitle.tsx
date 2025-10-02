interface WarTitleProps {
  title: string;
}
import { useWarContext } from "../providers/WarProvider";

export default function WarTitle({ title }: WarTitleProps) {
  const { currentWar, setCurrentWar } = useWarContext();
  return (
    <li className="w-full flex font-light">
      <button
        onClick={(e) => setCurrentWar(e.target)}
        className={`text-center ${
          currentWar?.innerText === title
            ? ""
            : "hover:border-yellow-normal hover:cursor-pointer hover:bg-gray-navigation/40"
        } ease-in duration-100 border-2 px-1 py-2 text-extra-large ${
          currentWar?.innerText === title
            ? "bg-green-active/50"
            : "bg-gray-navigation/30"
        } border-x-0 border-orange-darker w-full`}>
        {title}
      </button>
    </li>
  );
}
