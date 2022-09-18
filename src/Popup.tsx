import React, { useMemo } from 'react'
import style from './Popup.module.css'
import { toDisplayProperties } from './lib/features'
import { Maybe } from './types'
import { MapGeoJSONFeature } from 'maplibre-gl'
import { isNotNull } from './lib/index'

interface PopupProps {
  feature: Maybe<MapGeoJSONFeature>
}

export function Popup(props: PopupProps) {
  const { feature } = props

  const displayProperties = useMemo(
    () =>
      isNotNull(feature)
        ? JSON.stringify(
            Object.entries(feature).reduce(toDisplayProperties, {}),
            undefined,
            2
          )
        : '',
    [feature]
  )

  if (displayProperties === '') {
    return null
  }
  return (
    <div className={style.popup}>
      <pre>{displayProperties}</pre>
    </div>
  )
}
