import React, { useCallback, useMemo, useState } from "react";
import MapGL, { MapboxEvent, NavigationControl } from "react-map-gl";
import maplibregl, { Map, LayerSpecification } from "maplibre-gl";
import { MapLayerMouseEvent } from "mapbox-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import { INITIAL_VIEW } from "./config";
import { Maybe } from "./types";
import { LayersControl } from "./LayersControl";
import { isNotNull, isNotUndefined, isNull } from "./lib";
import { useEffect } from "react";
import { Popup } from "./Popup";

// jerusalem hash #11/31.77/35.21/0/0
// szczecin hash #11/53.42/14.55/0/0

function App() {
  const [map, setMap] = useState<Maybe<Map>>(null);

  const [refreshToken, setRefreshToken] = useState<number>(Date.now());
  const [mapLayers, setMapLayers] = useState<LayerSpecification[]>([]);
  const [features, setFeatures] = useState("");

  const interactiveLayersIds = useMemo(
    () => mapLayers.map((layer) => layer.id),
    [mapLayers]
  );

  const handleMapLoad = useCallback(
    (event: MapboxEvent) => setMap(event.target as unknown as Map),
    []
  );

  const handleChange = useCallback(() => setRefreshToken(Date.now()), []);

  const queryRendererFeatures = useCallback(
    (event: MapLayerMouseEvent) => {
      if (isNull(map) || !event.originalEvent.shiftKey) {
        setFeatures('')
        return;
      }
      // @ts-ignore comment
      const features = map.queryRenderedFeatures(event.point).shift();

      if (isNotUndefined(features)) {
        const displayProperties = [
          "type",
          "properties",
          "id",
          "layer",
          "source",
          "sourceLayer",
          "state",
        ];

        const displayFeatures = Object.entries(features).reduce(
          (acc, [key, value]) => {
            if (displayProperties.includes(key)) {
              acc[key] = value;
            }
            return acc;
          },
          {} as Record<string, unknown>
        );

        setFeatures(JSON.stringify(displayFeatures, null, 2));
      }
    },
    [map]
  );

  useEffect(() => {
    if (isNotNull(map)) {
      setMapLayers(map.getStyle().layers);
    }
  }, [map, refreshToken]);

  return (
    <MapGL
      reuseMaps
      hash
      cursor="crosshair"
      onLoad={handleMapLoad}
      initialViewState={INITIAL_VIEW}
      interactiveLayerIds={interactiveLayersIds}
      mapLib={maplibregl}
      mapStyle={`${process.env.PUBLIC_URL}/mapStyle.json`}
      onMouseMove={queryRendererFeatures}
    >
      <NavigationControl position="bottom-right" />
      <LayersControl map={map} layers={mapLayers} onChange={handleChange} />
      <Popup features={features} />
    </MapGL>
  );
}

export default App;
