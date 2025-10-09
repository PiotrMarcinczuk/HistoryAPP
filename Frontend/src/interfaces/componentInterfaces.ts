export interface ParagraphChildType {
  type: string;
  text: string;
  bold?: boolean;
}

export interface CountriesNameOnMapProps {
  dElement: string;
  bounds: [[number, number], [number, number]];
  fontSize: number;
  text: string;
}
