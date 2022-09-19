import { LayerSpecification } from 'maplibre-gl'
import React from 'react'

interface EditLayerProps {
  source: LayerSpecification
}

const colorRegex = /(rgba?\(.*\))|(hsl\(.*\))/g

export function EditLayer(props: EditLayerProps) {
  const stringified = JSON.stringify(props.source, undefined, 2)

  const __html = stringified.replace(
    colorRegex,
    '<span style="background-color: $1$2">$1$2</span>'
  )

  return (
    <div>
      <pre dangerouslySetInnerHTML={{ __html }} />
    </div>
  )
}
