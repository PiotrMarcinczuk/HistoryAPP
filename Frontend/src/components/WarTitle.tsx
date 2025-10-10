import { useWarContext } from "../providers/WarProvider";
import { WarContextType } from "../interfaces/prvoiderInterfaces";
import { memo } from "react";
import { WarTitleProps } from "../interfaces/componentInterfaces";

function WarTitle({ title }: WarTitleProps) {
  const { currentWar, setCurrentWar }: WarContextType = useWarContext();
  const warTitle = currentWar?.[0].title;

  return (
    <li className="w-full flex font-light">
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (setCurrentWar) setCurrentWar(e.currentTarget);
        }}
        className={`text-center ${
          warTitle === title
            ? ""
            : "hover:border-yellow-normal hover:cursor-pointer hover:bg-gray-navigation/40"
        } ease-in duration-100 border-2 px-1 py-2 text-extra-large ${
          warTitle === title ? "bg-green-active/50" : "bg-gray-navigation/30"
        } border-x-0 border-orange-darker w-full`}>
        {title}
      </button>
    </li>
  );
}

export default memo(WarTitle);
