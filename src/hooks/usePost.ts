import { useState, useCallback, useMemo } from "react";
import type { UsePostOptions, UsePostReturn } from "../consts/types";

export function usePost<T = unknown, R = unknown>(options: UsePostOptions<T>): UsePostReturn<R> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<R | null>(null);
  const mockEnable = useMemo(() => import.meta.env.VITE_USE_MOCK === 'true', []);

  const postData = useCallback(async (overrideBody?: T): Promise<void> => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch((mockEnable ? import.meta.env.VITE_MOCK_URL : import.meta.env.VITE_BASE_URL).concat(options.url), {
        method: "POST",
        headers: {
          ...(options.headers || {}),
          ...(Object.keys(options.headers || {}).includes("Content-Type")
            ? {} : { "Content-Type": "application/json" }),
        },
        body: JSON.stringify(overrideBody ?? options.body),
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const json = await res.json();
      setData(json as R);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [options]);
  
  function reset() {
    setLoading(false);
    setError(null);
    setData(null);
  }

  return { loading, error, data, postData, reset };
}
