import React from 'react'

interface RenderWhenProps {
  condition: boolean
  children: React.ReactNode
}

function RenderWhenComponent(props: RenderWhenProps) {
  return props.condition ? <>{props.children}</> : null
}

export const RenderWhen = React.memo(RenderWhenComponent)
