import { useState } from "react";
import WarTitle from "./WarTitle";
import logo from "../../public/images/logo.png";
import copyright from "../../public/icons/copyright.png";
import polandFlag from "../../public/icons/poland-ball.png";
import battleIcon from "../../public/icons/battle-icon.png";
import vector from "../../public/icons/vector.png";
import { useNavigationIsOpenContext } from "../providers/NavigationIsOpenProvider";
import { useWarContext } from "../providers/WarProvider";

export default function Navigation() {
  const context = useNavigationIsOpenContext();
  const warContext = useWarContext();

  const { wars } = warContext as { wars: any };
  const { isNavOpen, setIsNavOpen } = context as {
    isNavOpen: boolean;
    setIsNavOpen: () => void;
  };

  return (
    <nav
      className={`ease-in duration-200 ${
        isNavOpen ? "translate-x-0" : "-translate-x-full"
      } w-full max-w-[400px] h-full fixed text-text-primary z-20`}>
      {" "}
      {/* z-40 to be over map*/}
      <section className=" w-full h-full flex flex-col overflow-y-auto overflow-x-hidden">
        <div className="fixed inset-0 bg-[url('/images/nav-bg.png')] bg-cover bg-center"></div>
        <div className="fixed inset-0 bg-orange-darker/80"></div>

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
        <div className="mx-auto z-10 text-3x-large xs:mt-10">1400 - 1500</div>
        <ul className="relative flex flex-col w-full h-full z-10 gap-1">
          {/* ERROR WHEN WARS IS EMPTY */}
          {wars &&
            wars.map((war: any) => <WarTitle key={war.id} title={war.Title} />)}
          <li className="mt-4"></li> {/* spacer for mobile rotation */}
          <li className="absolute bottom-0 left-1/2 -translate-x-1/2 text-nowrap">
            <div className="flex justify-center items-center gap-1">
              <img src={copyright} alt="copyright" />
              <span className="text-extra-small">Code by</span>
              <a
                className="text-small text-yellow-normal"
                href="https://piotr-marcinczuk.pl">
                Piotr Marcińczuk
              </a>
            </div>
          </li>
        </ul>

        {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-nowrap">
          <div className="flex justify-center items-center gap-1">
            <img src={copyright} alt="copyright" />
            <span className="text-extra-small">Code by</span>
            <a
              className="text-small text-yellow-normal"
              href="https://piotr-marcinczuk.pl">
              Piotr Marcińczuk
            </a>
          </div>
        </div> */}
      </section>
      <div
        className={`absolute top-1/2 ease-in duration-200 ${
          isNavOpen
            ? "sm:translate-x-1/2 right-0 "
            : "translate-x-full -right-2"
        } z-10 border-black bg-yellow-darker/80 border-1 rounded-full`}>
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
