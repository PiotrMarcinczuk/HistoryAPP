interface WarTitleProps {
  title: string;
  isActive: boolean;
}

export default function WarTitle({ title, isActive }: WarTitleProps) {
  return (
    <li className="w-full flex">
      <button
        className={`text-center hover:border-yellow-normal ease-in duration-100 hover:cursor-pointer border-2 px-1 py-2 text-extra-large custom-shadow ${
          isActive ? "bg-green-active" : "bg-gray-navigation/50"
        } border-x-0 border-orange-darker w-full`}>
        {title}
      </button>
    </li>
  );
}
