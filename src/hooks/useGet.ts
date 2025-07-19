import { useState, useCallback, useMemo } from "react";
import type { UseGetOptions, UseGetReturn } from "../consts/types";

export function useGet<R = unknown>(options: UseGetOptions): UseGetReturn<R> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<R | null>(null);
  const mockEnable = useMemo(() => import.meta.env.VITE_USE_MOCK === "true", []);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const base = mockEnable ? import.meta.env.VITE_MOCK_URL : import.meta.env.VITE_BASE_URL;
      const res = await fetch(base.concat(options.url), {
        method: "GET",
        headers: {
          ...(options.headers || {}),
        },
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

  const reset = () => {
    setLoading(false);
    setError(null);
    setData(null);
  };

  return { loading, error, data, getData, reset };
}
