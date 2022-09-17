import { useCallback, useEffect, useState } from "react";

export function useAutoRefresh(
  delay: number,
  active = true
): [number, () => void] {
  const [token, setRefreshToken] = useState(0);

  const refresh = useCallback(() => setRefreshToken(Date.now()), []);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => setRefreshToken(Date.now()), delay);

      return () => clearInterval(interval);
    }
  }, [active, delay]);

  return [token, refresh];
}
