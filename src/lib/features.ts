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
