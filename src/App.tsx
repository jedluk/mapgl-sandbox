import React, { Fragment, useCallback, useEffect, useState } from "react";
import MapGL, { MapboxEvent, NavigationControl } from "react-map-gl";
import maplibregl, { Map, LayerSpecification } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import style from "./App.module.css";
import { INITIAL_VIEW } from "./config";
import { isNotNull } from "./lib";
import { Maybe } from "./types";
import { Layer } from "./Layer";
import { EditLayer } from "./EditLayer";

function App() {
  const [map, setMap] = useState<Maybe<Map>>(null);
  const [refreshToken, setRefreshToken] = useState<number>(Date.now());
  const [editableLayer, setEditableLayer] = useState("");
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

  console.log({ editableLayer });

  return (
    <MapGL
      reuseMaps
      onLoad={handleMapLoad}
      initialViewState={INITIAL_VIEW}
      mapLib={maplibregl}
      mapStyle={`${process.env.PUBLIC_URL}/mapStyle.json`}
    >
      <NavigationControl position="bottom-right"/>
      {isNotNull(map) && mapLayers.length > 0 && (
        <div
          className={style.layers}
          style={{ width: editableLayer !== "" ? "fit-content" : 300 }}
        >
          {editableLayer === "" ? (
            mapLayers.map((layer) => (
              <Layer
                key={layer.id}
                map={map}
                source={layer}
                onRefresh={refresh}
                onEdit={setEditableLayer}
              />
            ))
          ) : (
            <Fragment>
              <button
                className={style.close}
                onClick={() => setEditableLayer("")}
              >
                X
              </button>
              <EditLayer
                source={mapLayers.filter((l) => l.id === editableLayer)[0]}
              />
            </Fragment>
          )}
        </div>
      )}
    </MapGL>
  );
}

export default App;
