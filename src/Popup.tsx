import React from 'react'
import style from './Popup.module.css'

interface PopupProps {
  features: string
}

export function Popup(props: PopupProps) {
  return (
    <div className={style.popup}>
      <pre>{props.features}</pre>
    </div>
  )
}
