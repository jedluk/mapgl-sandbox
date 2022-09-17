import React from "react";
import style from "./App.module.css";
import { LayerSpecification, Map } from "maplibre-gl";

interface LayerProps {
  map: Map;
  source: LayerSpecification;
  onRefresh: () => void;
  onEdit: (layerId: string) => void;
}

export function Layer(props: LayerProps) {
  const { source, map, onRefresh, onEdit } = props;
  const { layout, id } = source;

  const isVisible = layout?.visibility === "visible";

  const handleVisbilityChange = () => {
    const nextVisibility = isVisible ? "none" : "visible";
    map.setLayoutProperty(id, "visibility", nextVisibility);
    onRefresh();
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
