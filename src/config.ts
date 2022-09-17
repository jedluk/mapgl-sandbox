import { ViewState } from "react-map-gl";

export const INITIAL_VIEW: Partial<ViewState> = {
  latitude: 53.428543,
  longitude: 14.552812,
  zoom: 13,
  bearing: 0,
  pitch: 0,
};

export const DISPLAY_PROPERTIES = [
  "type",
  "properties",
  "id",
  "layer",
  "source",
  "sourceLayer",
  "state",
];
