import React from 'react'

import { IMAGES } from './img'
import { joinClassNames } from './lib/index'
import style from './SelectMap.module.css'

interface SelectMapProps {
  mapStyle: 'liberty' | 'postitron' | 'darkMatter'
  onChangeMapStyle: (style: 'liberty' | 'postitron' | 'darkMatter') => void
}

export function SelectMap(props: SelectMapProps) {
  const { mapStyle } = props

  return (
    <div className={style.container}>
      <div className={style.composition}>
        <img
          alt="map-positron"
          data-selected={mapStyle === 'postitron'}
          className={joinClassNames(style.map, style.map1)}
          src={IMAGES.positron}
        />
        <img
          alt="map-liberty"
          data-selected={mapStyle === 'liberty'}
          className={joinClassNames(style.map, style.map2)}
          src={IMAGES.liberty}
        />
        <img
          alt="map-darkMatter"
          data-selected={mapStyle === 'darkMatter'}
          className={joinClassNames(style.map, style.map3)}
          src={IMAGES.darkMatter}
        />
      </div>
    </div>
  )
}
