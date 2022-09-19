import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'

import { isNotNull } from '../../lib'

interface PortalProps {
  children: React.ReactNode
}

export function Portal(props: PortalProps) {
  const portalRoot = useMemo(() => document.getElementById('root'), [])

  return isNotNull(portalRoot) ? createPortal(props.children, portalRoot) : null
}
