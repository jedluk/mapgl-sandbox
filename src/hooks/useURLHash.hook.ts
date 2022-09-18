import { useEffect } from 'react'

export function useURLHash(hash: string): void {
  useEffect(() => {
    if (hash !== '') {
      window.location.hash = hash
    }
  }, [hash])
}
