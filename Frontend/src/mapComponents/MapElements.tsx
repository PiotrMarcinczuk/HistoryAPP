import L from "leaflet";

enum MarkerTypes {
  PL = "PL",
  EN = "EN",
  PLW = "PLW", // win
  ENW = "ENW", // win
  PLCIT = "PLCIT", // city
  ENCIT = "ENCIT", // city
  PLCAS = "PLCAS", // castle
  ENCAS = "ENCAS", // castle
}

export default function MapElements() {
  const createCityPL = (text: string) => {
    return new L.DivIcon({
      html: `<div class="flex flex-col items-center justify-center text-white text-base"><svg width="36" height="36" viewBox="0 0 72 76" fill="white" xmlns="http://www.w3.org/2000/svg">
<path d="M48 36V12L36 0L24 12V20H0V76H72V36H48ZM16 68H8V60H16V68ZM16 52H8V44H16V52ZM16 36H8V28H16V36ZM40 68H32V60H40V68ZM40 52H32V44H40V52ZM40 36H32V28H40V36ZM40 20H32V12H40V20ZM64 68H56V60H64V68ZM64 52H56V44H64V52Z" fill="#E35656"/>
</svg>
${text}
</div>`,
      className: "",
    });
  };

  const createCastlePL = (text: string) => {
    return new L.DivIcon({
      html: `<div class="flex flex-col items-center justify-center text-white text-base"><svg width="36" height="36" viewBox="0 0 96 96" fill="#dad7d7" xmlns="http://www.w3.org/2000/svg">
<path d="M8 22L22 8L36 22H8ZM60 22L74 8L88 22H60Z" stroke="#E35656" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M88 88V52H80V34H68V52H56V42L48 34L40 42V52H28V34H16V52H8V88H36V80C36 76.8174 37.2643 73.7652 39.5147 71.5147C41.7652 69.2643 44.8174 68 48 68C51.1826 68 54.2348 69.2643 56.4853 71.5147C58.7357 73.7652 60 76.8174 60 80V88H88Z" fill="#E35656" stroke="#E356567" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 22H30V34H14V22ZM66 22H82V34H66V22Z" stroke="#E35656" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
${text}
</div>`,
      className: "",
    });
  };

  const createCityENEMY = (text: string, markerSize: number, color: string) => {
    return new L.DivIcon({
      html: `<div class="flex flex-col items-center justify-center text-white text-base"><svg width="${
        markerSize * 2
      }" height="${
        markerSize * 2
      }" viewBox="0 0 72 76" fill="white" xmlns="http://www.w3.org/2000/svg">
<path d="M48 36V12L36 0L24 12V20H0V76H72V36H48ZM16 68H8V60H16V68ZM16 52H8V44H16V52ZM16 36H8V28H16V36ZM40 68H32V60H40V68ZM40 52H32V44H40V52ZM40 36H32V28H40V36ZM40 20H32V12H40V20ZM64 68H56V60H64V68ZM64 52H56V44H64V52Z" fill="${color}"/>
</svg>
${text}
</div>`,
      className: "",
    });
  };

  const createCastleENEMY = (
    text: string,
    markerSize: number,
    color: string
  ) => {
    return new L.DivIcon({
      html: `<div class="flex flex-col items-center justify-center text-white text-base"><svg width="${
        markerSize * 2
      }" height="${
        markerSize * 2
      }" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 22L22 8L36 22H8ZM60 22L74 8L88 22H60Z" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M88 88V52H80V34H68V52H56V42L48 34L40 42V52H28V34H16V52H8V88H36V80C36 76.8174 37.2643 73.7652 39.5147 71.5147C41.7652 69.2643 44.8174 68 48 68C51.1826 68 54.2348 69.2643 56.4853 71.5147C58.7357 73.7652 60 76.8174 60 80V88H88Z" fill="${color}" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 22H30V34H14V22ZM66 22H82V34H66V22Z" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
${text}
</div>`,
      className: "",
    });
  };

  const createTextIconPL = (text: string, markerSize: number) => {
    return new L.DivIcon({
      html: ` <div style="font-size: ${markerSize * 2}px;"
                  class="w-${markerSize} h-${markerSize} hover:scale-105 ease-in duration-200 
                  rounded-full border-[3px] border-[#312112] 
                  flex items-center justify-center relative font-semibold
                  bg-[#E35656]
                   text-extra-large text-orange-darker">${text}</div>`,
      className: "",
    });
  };

  const createTextIconENEMY = (text: string, markerSize: number) => {
    return new L.DivIcon({
      html: ` <div style="font-size: ${markerSize * 2}px;"
                  class="w-${markerSize} h-${markerSize} hover:scale-105 ease-in duration-200
                  rounded-full border-[3px] border-[#312112] 
                  flex items-center justify-center relative font-semibold
                  bg-gray-enemy
                   text-extra-large text-orange-darker">${text}</div>`,
      className: "",
    });
  };

  const createTextIconPLwin = (
    text: string,
    markerSize: number,
    color: string
  ) => {
    return new L.DivIcon({
      html: `<div style="font-size: ${
        markerSize * 2
      }px; background: linear-gradient(to right, #E35656 50%, ${color} 50%);" 
                  class="w-${markerSize} h-${markerSize} hover:scale-105 ease-in duration-200
                  rounded-full border-[3px] border-[#312112] 
                  flex items-center justify-center relative font-semibold
                    text-orange-darker">${
                      text ? text : ""
                    }<svg xmlns="http://www.w3.org/2000/svg" width="${
        markerSize * 2
      }" height="${markerSize * 2}" viewBox="0 0 29 29"
           class="absolute bottom-0 translate-y-1/2" fill="#26E600"> 
        <path d="M23.9481 28.3742L19.8507 24.2987L16.7725 27.3942L15.792 26.4104C15.255 25.8717 14.9862 25.204 14.9858 24.4071C14.9853 23.6103 15.2532 22.9422 15.7896 22.4029L21.701 16.4583C22.2373 15.9189 22.9022 15.649 23.6955 15.6485C24.4888 15.6481 25.154 15.9172 25.691 16.4559L26.6716 17.4396L23.5934 20.535L27.6559 24.6456C27.9361 24.9267 28.0763 25.2547 28.0765 25.6297C28.0767 26.0046 27.9369 26.3328 27.6571 26.6142L25.9081 28.373C25.6283 28.6544 25.3017 28.7952 24.9284 28.7954C24.5551 28.7956 24.2283 28.6552 23.9481 28.3742ZM28.0649 6.29493L12.1845 22.2644L12.3596 22.4049C12.8965 22.9436 13.1653 23.6114 13.1658 24.4082C13.1662 25.205 12.8983 25.8731 12.362 26.4125L11.3825 27.3974L8.30069 24.3057L4.20814 28.386C3.92831 28.6674 3.60172 28.8082 3.22839 28.8084C2.85506 28.8087 2.52831 28.6682 2.24814 28.3872L0.497084 26.6305C0.216915 26.3495 0.0767183 26.0214 0.0764934 25.6465C0.0762685 25.2715 0.216072 24.9433 0.495903 24.6619L4.55343 20.5464L1.47158 17.4547L2.45099 16.4698C2.98733 15.9305 3.65217 15.6606 4.4455 15.6601C5.23884 15.6596 5.904 15.9287 6.44099 16.4674L6.58109 16.6431L22.4615 0.673638L28.0615 0.670279L28.0649 6.29493ZM6.99907 13.2681L0.0648969 6.31172L0.0615234 0.687073L5.66152 0.683714L12.5957 7.64006L6.99907 13.2681Z" />
      </svg></div>`,
      className: "", // prevents leaflet default styles
    });
  };

  const createTextIconENEMYwin = (
    text: string,
    markerSize: number,
    color: string
  ) => {
    return new L.DivIcon({
      html: `<div style="font-size: ${
        markerSize * 2
      }px; background: linear-gradient(to right, #E35656 50%, ${color} 50%);" 
                  class="w-${markerSize} h-${markerSize} hover:scale-105 ease-in duration-200 
                  rounded-full border-[3px] border-[#312112] 
                  flex items-center justify-center relative font-semibold
                   text-extra-large text-orange-darker">${text}<svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29"
           class="absolute bottom-0 translate-y-1/2" fill="#FF0000"> 
        <path d="M23.9481 28.3742L19.8507 24.2987L16.7725 27.3942L15.792 26.4104C15.255 25.8717 14.9862 25.204 14.9858 24.4071C14.9853 23.6103 15.2532 22.9422 15.7896 22.4029L21.701 16.4583C22.2373 15.9189 22.9022 15.649 23.6955 15.6485C24.4888 15.6481 25.154 15.9172 25.691 16.4559L26.6716 17.4396L23.5934 20.535L27.6559 24.6456C27.9361 24.9267 28.0763 25.2547 28.0765 25.6297C28.0767 26.0046 27.9369 26.3328 27.6571 26.6142L25.9081 28.373C25.6283 28.6544 25.3017 28.7952 24.9284 28.7954C24.5551 28.7956 24.2283 28.6552 23.9481 28.3742ZM28.0649 6.29493L12.1845 22.2644L12.3596 22.4049C12.8965 22.9436 13.1653 23.6114 13.1658 24.4082C13.1662 25.205 12.8983 25.8731 12.362 26.4125L11.3825 27.3974L8.30069 24.3057L4.20814 28.386C3.92831 28.6674 3.60172 28.8082 3.22839 28.8084C2.85506 28.8087 2.52831 28.6682 2.24814 28.3872L0.497084 26.6305C0.216915 26.3495 0.0767183 26.0214 0.0764934 25.6465C0.0762685 25.2715 0.216072 24.9433 0.495903 24.6619L4.55343 20.5464L1.47158 17.4547L2.45099 16.4698C2.98733 15.9305 3.65217 15.6606 4.4455 15.6601C5.23884 15.6596 5.904 15.9287 6.44099 16.4674L6.58109 16.6431L22.4615 0.673638L28.0615 0.670279L28.0649 6.29493ZM6.99907 13.2681L0.0648969 6.31172L0.0615234 0.687073L5.66152 0.683714L12.5957 7.64006L6.99907 13.2681Z" />
      </svg></div>`,
      className: "", // prevents leaflet default styles
    });
  };

  const setMarkerType = (markerType: string) => {
    switch (markerType) {
      case MarkerTypes.PL:
        return createTextIconPL;
      case MarkerTypes.PLW:
        return createTextIconPLwin;
      case MarkerTypes.PLCIT:
        return createCityPL;
      case MarkerTypes.PLCAS:
        return createCastlePL;
      case MarkerTypes.EN:
        return createTextIconENEMY;
      case MarkerTypes.ENW:
        return createTextIconENEMYwin;
      case MarkerTypes.ENCIT:
        return createCityENEMY;
      case MarkerTypes.ENCAS:
        return createCastleENEMY;
      default:
        return createTextIconPL;
    }
  };

  return {
    setMarkerType,
  };
}
