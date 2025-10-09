import { SVGOverlay } from "react-leaflet";
import { CountriesNameOnMapProps } from "../interfaces/componentInterfaces";
export default function CountriesNameOnMap({
  dElement,
  bounds,
  fontSize,
  text,
}: CountriesNameOnMapProps) {
  const pathId = `path-${Math.random().toString(36).substr(2, 9)}`; // unique ID
  return (
    <SVGOverlay bounds={bounds}>
      <svg width="100%" height="100%">
        <defs>
          <path id={pathId} d={dElement} fill="transparent" stroke="none" />
        </defs>

        <text
          stroke="none"
          fill="white"
          fontSize={fontSize}
          opacity={0.6}
          fontWeight="bold"
          textAnchor="middle">
          <textPath href={`#${pathId}`} startOffset="50%">
            {text}
          </textPath>
        </text>
      </svg>
    </SVGOverlay>
  );
}
