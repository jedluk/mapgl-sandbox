import 'maplibre-gl/dist/maplibre-gl.css'

import { MapLayerMouseEvent } from 'mapbox-gl'
import maplibregl, { Map, MapGeoJSONFeature } from 'maplibre-gl'
import React, { useCallback, useState } from 'react'
import MapGL, { MapboxEvent, NavigationControl } from 'react-map-gl'
import { useBoolean } from 'use-boolean'

import { useAutoRefresh } from './hooks/useAutoRefresh.hook'
import { useKeyboardListener } from './hooks/useKeyboardListener.hook'
import { useURLHash } from './hooks/useURLHash.hook'
import { LayersControl } from './LayersControl'
import { isNotNull, isNull } from './lib'
import { Polygon } from './Polygon'
import { Popup } from './Popup'
import { Maybe } from './types'

export function App() {
  const [map, setMap] = useState<Maybe<Map>>(null)
  const [feature, setFeature] = useState<Maybe<MapGeoJSONFeature>>(null)

  const [isDetailRequested, requestDetail, resetDetail] = useBoolean(false)
  const [, refresh] = useAutoRefresh(1000, false)

  const handleMapLoad = useCallback(
    (event: MapboxEvent) => setMap(event.target as unknown as Map),
    []
  )

  const queryRendererFeatures = useCallback(
    (event: MapLayerMouseEvent) => {
      if (isNull(map) || event.originalEvent.metaKey) {
        return
      }
      const features = map.queryRenderedFeatures(
        event.point as unknown as [number, number]
      )

      setFeature(features[0] ?? null)
    },
    [map]
  )

  // Jerusalem 11/31.77/35.21/0/0
  useURLHash('11/53.42/14.55/0/0')
  useKeyboardListener('s', requestDetail, resetDetail)

  const mapLayers = map?.getStyle().layers ?? []

  return (
    <MapGL
      reuseMaps
      hash
      cursor="crosshair"
      onLoad={handleMapLoad}
      mapLib={maplibregl}
      mapStyle={`${process.env.PUBLIC_URL}/mapStyle.json`}
      onMouseMove={queryRendererFeatures}
    >
      <NavigationControl position="bottom-right" />
      <LayersControl map={map} layers={mapLayers} onChange={refresh} />
      <Popup feature={feature} />
      {isNotNull(feature) && isDetailRequested && <Polygon feature={feature} />}
    </MapGL>
  )
}
