import { useEffect } from 'react'

export function useKeyboardListener(
  key: string,
  onKeyDown: () => void,
  onKeyUp: () => void
): void {
  useEffect(() => {
    function keyDownistener(evt: KeyboardEvent) {
      if (evt.key.toLowerCase() === key.toLowerCase()) onKeyDown()
    }
    function keyUpListener() {
      onKeyUp()
    }

    window.addEventListener('keydown', keyDownistener)
    window.addEventListener('keyup', keyUpListener)
    return () => {
      window.removeEventListener('keydown', keyDownistener)
      window.removeEventListener('keyup', keyUpListener)
    }
  }, [key, onKeyUp, onKeyDown])
}
