interface WarTitleProps {
  title: string;
  isActive: boolean;
}

export default function WarTitle({ title, isActive }: WarTitleProps) {
  return (
    <li className="w-full flex font-light">
      <button
        className={`text-center ${
          isActive
            ? ""
            : "hover:border-yellow-normal hover:cursor-pointer hover:bg-gray-navigation/40"
        } ease-in duration-100 border-2 px-1 py-2 text-extra-large ${
          isActive ? "bg-green-active/50" : "bg-gray-navigation/30"
        } border-x-0 border-orange-darker w-full`}>
        {title}
      </button>
    </li>
  );
}
