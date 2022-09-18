import { DISPLAY_PROPERTIES } from './config'

export function toDisplayedProperties(
  accumulator: Record<string, unknown>,
  entry: [string, number]
) {
  const [key, value] = entry
  if (DISPLAY_PROPERTIES.includes(key)) {
    accumulator[key] = value
  }
  return accumulator
}
