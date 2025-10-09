import { SVGOverlay } from "react-leaflet";

export default function StateNameOnMap({ dElement, bounds, fontSize, text }) {
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
