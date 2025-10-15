export interface ParagraphChildType {
  type: string;
  text: string;
  bold?: boolean;
}

export interface CrestOnMapProps {
  bounds: [[number, number], [number, number]];
}

export interface WarTitleProps {
  title: string;
}

export interface MapUpdaterProps {
  events: any;
}
