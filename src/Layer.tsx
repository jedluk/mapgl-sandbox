import React from "react";
import style from "./LayersControl.module.css";
import { LayerSpecification } from "maplibre-gl";
import { Map } from "maplibre-gl";

interface LayerProps {
  map: Map;
  source: LayerSpecification;
  onChange: () => void;
  onEdit: (layerId: string) => void;
}

export function Layer(props: LayerProps) {
  const { source, map, onChange, onEdit } = props;
  const { layout, id } = source;

  const isVisible = layout?.visibility === "visible";

  const handleVisbilityChange = () => {
    const nextVisibility = isVisible ? "none" : "visible";
    map.setLayoutProperty(id, "visibility", nextVisibility);
    onChange();
  };

  return (
    <div className={style.layer}>
      <input
        type="checkbox"
        checked={isVisible}
        onChange={handleVisbilityChange}
      />
      {id}
      <button onClick={() => onEdit(id)}>Edit</button>
    </div>
  );
}
