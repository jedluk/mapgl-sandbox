import React from "react";
import style from "./App.module.css";
import { LayerSpecification, Map } from "maplibre-gl";

interface LayerProps {
  map: Map;
  source: LayerSpecification;
  onRefresh: () => void;
}

export function Layer(props: LayerProps) {
  const { source, map, onRefresh } = props;
  const { layout = {}, id } = source;

  const isVisible = layout.visibility === "visible";

  const handleVisbilityChange = () => {
    const visibility = isVisible ? "none" : "visible";
    map.setLayoutProperty(id, "visibility", visibility);
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
      <button>Edit</button>
    </div>
  );
}
