import { MapGeoJSONFeature } from 'maplibre-gl'
import { Source, Layer } from 'react-map-gl'
import React, { useEffect, useRef, useState } from 'react'
import { FeatureCollection } from 'geojson'
import { Maybe } from './types'
import { isNull } from './lib'
import { pickCoordinates } from './lib/features'

interface PolygonProps {
  feature: MapGeoJSONFeature
}

const REVERSE_SEARCH_URL = 'https://nominatim.openstreetmap.org/reverse'

export function Polygon(props: PolygonProps) {
  const { feature } = props

  const featureRef = useRef(feature)
  const [geoJSON, setGeoJSON] = useState<Maybe<FeatureCollection>>(null)

  const { id = null } = feature

  useEffect(() => {
    featureRef.current = feature
  }, [feature])

  useEffect(() => {
    if (isNull(id)) {
      return
    }

    const coords = pickCoordinates(featureRef.current)
    if (isNull(coords)) {
      return
    }

    const params = new URLSearchParams([
      ['accept-language', 'en'],
      ['format', 'geocodejson'],
      ['zoom', '18'],
      ['limit', '1'],
      ['polygon_geojson', '1'],
      ['lon', String(coords[0])],
      ['lat', String(coords[1])]
    ])

    window
      .fetch([REVERSE_SEARCH_URL, params].join('?'))
      .then((res) => res.json())
      .then((data: FeatureCollection) => setGeoJSON(data))
      .catch(() => setGeoJSON(null))
  }, [id])

  if (isNull(geoJSON)) {
    return null
  }

  return (
    <Source id="requested-feature" type="geojson" data={geoJSON}>
      <Layer
        beforeId="building"
        id="requested-feature"
        type="fill-extrusion"
        paint={{
          'fill-extrusion-height': 30,
          'fill-extrusion-base': 0,
          'fill-extrusion-color': 'rgb(255, 77, 77)'
        }}
        source="requested-feature"
      />
    </Source>
  )
}
