import React, { useCallback, useMemo, useState } from "react";
import MapGL, { MapboxEvent, NavigationControl } from "react-map-gl";
import maplibregl, { Map, LayerSpecification } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import { INITIAL_VIEW } from "./config";
import { Maybe } from "./types";
import { LayersControl } from "./LayersControl";
import { isNotNull } from "./lib";
import { useEffect } from "react";

function App() {
  const [map, setMap] = useState<Maybe<Map>>(null);

  const [refreshToken, setRefreshToken] = useState<number>(Date.now());
  const [mapLayers, setMapLayers] = useState<LayerSpecification[]>([]);
  const [touchLayer, setTouchLayer] = useState("");

  const interactiveLayersIds = useMemo(
    () => mapLayers.map((layer) => layer.id),
    [mapLayers]
  );

  const handleMapLoad = useCallback(
    (event: MapboxEvent) => setMap(event.target as unknown as Map),
    []
  );

  const handleChange = useCallback(() => setRefreshToken(Date.now()), []);

  useEffect(() => {
    if (isNotNull(map)) {
      setMapLayers(map.getStyle().layers);
    }
  }, [map, refreshToken]);

  return (
    <MapGL
      reuseMaps
      cursor="crosshair"
      onLoad={handleMapLoad}
      initialViewState={INITIAL_VIEW}
      interactiveLayerIds={interactiveLayersIds}
      mapLib={maplibregl}
      mapStyle={`${process.env.PUBLIC_URL}/mapStyle.json`}
    >
      <NavigationControl position="bottom-right" />
      <LayersControl map={map} layers={mapLayers} onChange={handleChange} />
    </MapGL>
  );
}

export default App;
