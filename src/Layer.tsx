import React from 'react'
import style from './LayersControl.module.css'
import { LayerSpecification , Map } from 'maplibre-gl'

interface LayerProps {
  map: Map
  source: LayerSpecification
  onEdit: (layerId: string) => void
  onChange: () => void
}

export function Layer(props: LayerProps) {
  const { source, map, onEdit, onChange } = props
  const { layout, id } = source

  const isVisible = layout?.visibility === 'visible'

  const handleVisbilityChange = () => {
    const nextVisibility = isVisible ? 'none' : 'visible'
    map.setLayoutProperty(id, 'visibility', nextVisibility)
    onChange()
  }

  return (
    <div className={style.layer}>
      <input
        type="checkbox"
        checked={isVisible}
        onChange={handleVisbilityChange}
      />
      <span>{id}</span>
      <button onClick={() => onEdit(id)}>Edit</button>
    </div>
  )
}
