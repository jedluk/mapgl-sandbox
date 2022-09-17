import React, { useCallback, useEffect, useState } from "react";
import MapGL, { MapboxEvent } from "react-map-gl";
import maplibregl, { Map, LayerSpecification } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import style from "./App.module.css";
import { INITIAL_VIEW } from "./config";
import { isNotNull } from "./lib";
import { Maybe } from "./types";
import { Layer } from "./Layer";

function App() {
  const [map, setMap] = useState<Maybe<Map>>(null);
  const [refreshToken, setRefreshToken] = useState<number>(Date.now());
  const [isEditMode, setEditMode] = useState(false);
  const [mapLayers, setMapLayers] = useState<LayerSpecification[]>([]);

  const handleMapLoad = useCallback(
    (event: MapboxEvent) => setMap(event.target as unknown as Map),
    []
  );

  const refresh = useCallback(() => setRefreshToken(Date.now()), []);

  useEffect(() => {
    if (isNotNull(map)) {
      setMapLayers(map.getStyle().layers);
    }
  }, [map, refreshToken]);

  return (
    <MapGL
      reuseMaps
      onLoad={handleMapLoad}
      initialViewState={INITIAL_VIEW}
      mapLib={maplibregl}
      mapStyle={`${process.env.PUBLIC_URL}/mapStyle.json`}
    >
      <input type="text" className={style.input} placeholder="Search..." />
      {isNotNull(map) && mapLayers.length > 0 && !isEditMode && (
        <div className={style.layers}>
          {mapLayers.map((layer) => (
            <Layer
              key={layer.id}
              map={map}
              source={layer}
              onRefresh={refresh}
            />
          ))}
        </div>
      )}
    </MapGL>
  );
}

export default App;
