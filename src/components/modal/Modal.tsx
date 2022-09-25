import React from 'react'

import { isNotUndefined } from '../../lib'
import { ICONS } from '../../vector'
import { Portal } from '../portal/Portal'
import { RenderWhen } from '../render-when/RenderWhen'
import style from './Modal.module.css'

interface ModalProps {
  actions?: JSX.Element
  children: React.ReactNode
  justifyActions?: 'left' | 'center' | 'right'
  visible: boolean
  title: string
  onClose: () => void
}

export function Modal(props: ModalProps) {
  const { actions, title, onClose } = props
  const { justifyActions: justifyContent = 'right' } = props

  if (!props.visible) {
    return null
  }

  return (
    <Portal>
      <div className={style.backdrop}>
        <div className={style.popup}>
          <div className={style.header}>
            <span>{title}</span>
            <button
              className={style.close}
              onClick={onClose}
              style={{
                backgroundImage: [process.env.PUBLIC_URL, ICONS.close].join('')
              }}
            />
          </div>

          <div className={style.splitter} />
          {props.children}

          <RenderWhen condition={isNotUndefined(actions)}>
            <div className={style.splitter} />
            <div className={style.footer} style={{ justifyContent }}>
              {actions}
            </div>
          </RenderWhen>
        </div>
      </div>
    </Portal>
  )
}
