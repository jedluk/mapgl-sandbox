import { MapGeoJSONFeature } from 'maplibre-gl'
import React, { useMemo } from 'react'

import { toDisplayProperties } from './lib/features'
import { isNotNull } from './lib/index'
import style from './Popup.module.css'
import { Maybe } from './types'

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
