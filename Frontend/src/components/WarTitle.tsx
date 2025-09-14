interface WarTitleProps {
  title: string;
  isActive: boolean;
}

export default function WarTitle({ title, isActive }: WarTitleProps) {
  return (
    <li className="w-full flex ttt">
      <button
        className={`text-center ${
          isActive ? "" : "hover:border-yellow-normal hover:cursor-pointer"
        } ttt ease-in duration-100 border-2 px-1 py-2 text-extra-large custom-shadow ${
          isActive ? "bg-green-active" : "bg-gray-navigation/50"
        } border-x-0 border-orange-darker w-full`}>
        {title}
      </button>
    </li>
  );
}
