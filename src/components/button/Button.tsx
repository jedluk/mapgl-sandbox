import React from 'react'

import style from './Button.module.css'

interface ButtonProps {
  text: string
  onClick: () => void
}

export function Button(props: ButtonProps) {
  return (
    <button className={style.button} onClick={props.onClick}>
      {props.text}
    </button>
  )
}
