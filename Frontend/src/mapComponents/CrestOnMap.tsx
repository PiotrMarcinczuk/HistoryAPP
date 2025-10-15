import { SVGOverlay } from "react-leaflet";
import { CrestOnMapProps } from "../interfaces/componentInterfaces";

export default function CrestOnMap({ bounds }: CrestOnMapProps) {
  return (
    <SVGOverlay bounds={bounds}>
      <image x="0" y="0" width="100%" height="100%" />
    </SVGOverlay>
  );
}
