import React, { useState } from "react";
import MapGL from "react-map-gl";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

function App() {
  const [interactiveLayers] = useState<string[]>([]);

  return (
    <MapGL
      reuseMaps
      style={{ minHeight: "100%", minWidth: "100%" }}
      mapLib={maplibregl}
      mapStyle={`${process.env.PUBLIC_URL}/mapStyle.json`}
      interactiveLayerIds={interactiveLayers}
    />
  );
}

export default App;
