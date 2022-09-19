import { LayerSpecification, Map } from 'maplibre-gl'
import React, { Fragment, useState } from 'react'

import { isNull } from '../../lib'
import { Maybe } from '../../types'
import { EditLayer } from './EditLayer'
import { Layer } from './Layer'
import style from './LayersControl.module.css'

interface LayersControlProps {
  map: Maybe<Map>
  layers: LayerSpecification[]
  onChange: () => void
}

export function LayersControl(props: LayersControlProps) {
  const { map, layers, onChange } = props

  const [editableLayer, setEditableLayer] = useState('')

  if (isNull(map)) {
    return null
  }

  return (
    <div
      className={style.layers}
      style={{ width: editableLayer !== '' ? 'fit-content' : 300 }}
    >
      {editableLayer === '' ? (
        <Fragment>
          <div className={style.header}>Map Layers</div>
          {layers.map((layer) => (
            <Layer
              key={layer.id}
              map={map}
              source={layer}
              onChange={onChange}
              onEdit={setEditableLayer}
            />
          ))}
        </Fragment>
      ) : (
        <Fragment>
          <button className={style.close} onClick={() => setEditableLayer('')}>
            X
          </button>
          <EditLayer source={layers.filter((l) => l.id === editableLayer)[0]} />
        </Fragment>
      )}
    </div>
  )
}
