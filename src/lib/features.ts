import { MapGeoJSONFeature } from 'maplibre-gl'
import { Maybe } from '../types'

export const DISPLAY_PROPERTIES = [
  'type',
  'properties',
  'id',
  'layer',
  'source',
  'sourceLayer',
  'state'
]

export function toDisplayProperties(
  accumulator: Record<string, unknown>,
  entry: [string, number]
) {
  const [key, value] = entry
  if (DISPLAY_PROPERTIES.includes(key)) {
    accumulator[key] = value
  }
  return accumulator
}

type Position2D = [number, number]

export function pickCoordinates({
  geometry
}: MapGeoJSONFeature): Maybe<Position2D> {
  switch (geometry.type) {
    case 'Point':
      return geometry.coordinates as Position2D
    case 'LineString':
      return geometry.coordinates[
        Math.floor(geometry.coordinates.length / 2)
      ] as Position2D
    case 'MultiLineString':
      return geometry.coordinates[
        Math.floor(geometry.coordinates.length / 2)
      ][0] as Position2D
    case 'Polygon':
      return geometry.coordinates[
        Math.floor(geometry.coordinates.length / 2)
      ][0] as Position2D
    default:
      return null
  }
}
