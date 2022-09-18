import React, { useMemo } from 'react'
import style from './Popup.module.css'
import { toDisplayProperties } from './lib/features'
import { Maybe } from './types'
import { MapGeoJSONFeature } from 'maplibre-gl'
import { isNotNull } from './lib/index'

interface PopupProps {
  features: Maybe<MapGeoJSONFeature>
}

export function Popup(props: PopupProps) {
  const { features } = props

  const displayProperties = useMemo(
    () =>
      isNotNull(features)
        ? Object.entries(features).reduce(toDisplayProperties, {})
        : '',
    [features]
  )

  return (
    <div className={style.popup}>
      <pre>{JSON.stringify(displayProperties, null, 2)}</pre>
    </div>
  )
}
