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

  const displayProperties = useMemo(() => {
    console.log(feature)
    return isNotNull(feature)
      ? Object.entries(feature).reduce(toDisplayProperties, {})
      : ''
  }, [feature])

  return (
    <div className={style.popup}>
      <pre>{JSON.stringify(displayProperties, null, 2)}</pre>
    </div>
  )
}
