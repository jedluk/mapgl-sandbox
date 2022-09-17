import React from "react";
import { LayerSpecification } from "maplibre-gl";

interface EditLayerProps {
  source: LayerSpecification;
}
export function EditLayer(props: EditLayerProps) {
  console.log({ source: props.source });
  return (
    <div style={{ width: "fit-content", height: "100%" }}>
      <pre>{JSON.stringify(props.source, undefined, 2)}</pre>
    </div>
  );
}
