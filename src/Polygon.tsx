import { MapGeoJSONFeature } from 'maplibre-gl'
import { useEffect, useState } from 'react'
import { Maybe } from './types'
import { isNull, isNotNull } from './lib/index'
import { pickCoordinates } from './lib/features'

interface PolygonProps {
  show: boolean
  feature: Maybe<MapGeoJSONFeature>
}

const REVERSE_SEARCH_URL = 'https://nominatim.openstreetmap.org/reverse'
//
export function Polygon(props: PolygonProps) {
  const { feature, show } = props

  const [geoJSON, setGeoJSON] = useState<Maybe<MapGeoJSONFeature>>(null)

  useEffect(() => {
    if (!show || isNull(feature)) {
      return
    }
    const coords = isNotNull(feature) ? pickCoordinates(feature) : null
    
    if (isNull(coords)) {
      return
    }

    const params = new URLSearchParams([
      ['accept-language', 'en'],
      ['format', 'geojson'],
      ['lon', String(coords[0])],
      ['lat', String(coords[1])]
    ])

    window
      .fetch([REVERSE_SEARCH_URL, params].join('?'))
      .then((res) => res.json())
      .catch(() => setGeoJSON(null))
  }, [feature, show])

  if (isNotNull(geoJSON)) {
    console.log({ geoJSON })
  }

  return null
}
