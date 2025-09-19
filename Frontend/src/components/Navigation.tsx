import WarTitle from "./WarTitle";
import logo from "../../public/images/logo.png";
import copyright from "../../public/icons/copyright.png";
import polandFlag from "../../public/icons/poland-ball.png";
import battleIcon from "../../public/icons/battle-icon.png";
import vector from "../../public/icons/vector.png";
import { useNavigationIsOpenContext } from "../providers/NavigationIsOpenProvider";
export default function Navigation() {
  const context = useNavigationIsOpenContext();
  const { isNavOpen, setIsNavOpen } = context as {
    isNavOpen: boolean;
    setIsNavOpen: () => void;
  };

  return (
    <nav
      className={`ease-in duration-200 ${
        isNavOpen ? "translate-x-0" : "-translate-x-full"
      } max-w-[400px] h-full absolute text-text-primary z-50`}>
      <section className="relative w-[400px] h-full flex flex-col">
        <div className="absolute inset-0 bg-[url('/images/nav-bg.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-orange-darker/80"></div>

        <div className="relative z-10 mx-auto my-10">
          <img src={logo} alt="logo" />
        </div>

        <div className="w-full z-10 flex items-center justify-between">
          <hr className="border-yellow-normal flex-1 mr-2" />
          <div className="flex items-center gap-1">
            <img src={battleIcon} alt="battle icon" />
            <img src={polandFlag} alt="poland flag" />
            <img src={battleIcon} alt="battle icon" />
          </div>
          <hr className="border-yellow-normal flex-1 ml-2" />
        </div>

        <div className="mx-auto z-10 text-3x-large mt-10">1400 - 1500</div>
        <ul className="flex flex-col w-full z-10 gap-1">
          <WarTitle title="Wielka Wojna z zakonem" isActive={true} />{" "}
          {/* API */}
          <WarTitle title="Wojna golubska" isActive={false} /> {/* API */}
          <WarTitle title="Wojna głodowa" isActive={false} /> {/* API */}
        </ul>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-nowrap">
          <div className="flex justify-center items-center gap-1">
            <img src={copyright} alt="copyright" />
            <span className="text-extra-small">Code by</span>
            <a
              className="text-small text-yellow-normal"
              href="https://piotr-marcinczuk.pl/">
              Piotr Marcińczuk
            </a>
          </div>
        </div>
      </section>
      <div
        className={`absolute top-1/2 ease-in duration-200 ${
          isNavOpen
            ? "sm:translate-x-1/2 right-0 "
            : "translate-x-full -right-2"
        } z-50 border-black bg-yellow-darker/80 border-1 rounded-full`}>
        <button
          onClick={setIsNavOpen}
          className="w-18 h-18 flex justify-center items-center hover:cursor-pointer">
          <img
            src={vector}
            alt="navbar button"
            className={`ease-in duration-200 ${isNavOpen ? "" : "rotate-180"}`}
          />
        </button>
      </div>
    </nav>
  );
}
