import { useEffect } from 'react'

export function useKeyboardListener(
  key: string,
  onKeyDown: () => void,
  onKeyUp: () => void
): void {
  useEffect(() => {
    function keyDownListener(evt: KeyboardEvent) {
      if (evt.key.toLowerCase() === key.toLowerCase()) {
        onKeyDown()
      }
    }
    function keyUpListener(evt: KeyboardEvent) {
      if (evt.key.toLowerCase() === key.toLowerCase()) {
        onKeyUp()
      }
    }

    window.addEventListener('keydown', keyDownListener)
    window.addEventListener('keyup', keyUpListener)
    return () => {
      window.removeEventListener('keydown', keyDownListener)
      window.removeEventListener('keyup', keyUpListener)
    }
  }, [key, onKeyUp, onKeyDown])
}
