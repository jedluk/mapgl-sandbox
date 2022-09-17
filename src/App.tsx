import "maplibre-gl/dist/maplibre-gl.css";

import React, { useCallback, useState } from "react";
import MapGL, { MapboxEvent, NavigationControl } from "react-map-gl";
import maplibregl, { Map } from "maplibre-gl";
import { MapLayerMouseEvent } from "mapbox-gl";

import { INITIAL_VIEW } from "./config";
import { Maybe } from "./types";
import { LayersControl } from "./LayersControl";
import { isNull, isUndefined } from "./lib";
import { Popup } from "./Popup";
import { toDisplayedProperties } from "./features";
import { useAutoRefresh } from "./hooks/useAutoRefresh.hook";

// jerusalem hash #11/31.77/35.21/0/0
// szczecin hash #11/53.42/14.55/0/0

function App() {
  const [map, setMap] = useState<Maybe<Map>>(null);

  const [features, setFeatures] = useState("");
  const [, refresh] = useAutoRefresh(1000, false);

  const handleMapLoad = useCallback(
    (event: MapboxEvent) => setMap(event.target as unknown as Map),
    []
  );

  const queryRendererFeatures = useCallback(
    (event: MapLayerMouseEvent) => {
      if (isNull(map) || event.originalEvent.shiftKey) {
        return;
      }
      // @ts-ignore comment
      const point = event.point as [number, number];
      const features = map.queryRenderedFeatures(point).shift();

      if (isUndefined(features)) {
        return;
      }

      const displayFeatures = Object.entries(features).reduce(
        toDisplayedProperties,
        {}
      );

      setFeatures(JSON.stringify(displayFeatures, null, 2));
    },
    [map]
  );

  const mapLayers = map?.getStyle().layers ?? [];

  return (
    <MapGL
      reuseMaps
      hash
      cursor="crosshair"
      onLoad={handleMapLoad}
      initialViewState={INITIAL_VIEW}
      mapLib={maplibregl}
      mapStyle={`${process.env.PUBLIC_URL}/mapStyle.json`}
      onMouseMove={queryRendererFeatures}
    >
      <NavigationControl position="bottom-right" />
      <LayersControl map={map} layers={mapLayers} onChange={refresh} />
      <Popup features={features} />
    </MapGL>
  );
}

export default App;
