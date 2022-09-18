import React from 'react'
import { LayerSpecification } from 'maplibre-gl'

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
    <div style={{ width: 'fit-content', height: '100%' }}>
      <pre dangerouslySetInnerHTML={{ __html }} />
    </div>
  )
}
