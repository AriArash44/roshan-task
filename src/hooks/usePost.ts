import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postData, reset, selectApiState } from "../store/slices/apiSlice";
import type { UsePostOptions, UsePostReturn } from "../consts/types";
import type { AppDispatch, RootState } from "../store/index";

export function usePost<T = unknown, R = unknown>(
  options: UsePostOptions<T>
): UsePostReturn<R> {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector((state: RootState) =>
    selectApiState(state, options.url) as {
      loading: boolean;
      error: string | null;
      data: R | null;
    }
  );

  const trigger = useCallback(
    async (overrideBody?: T): Promise<void> => {
      const payload = { 
        ...options, 
        body: overrideBody ?? options.body 
      };
      await dispatch(postData(payload));
    },
    [dispatch, options]
  );

  const resetData = useCallback(() => {
    dispatch(reset(options.url));
  }, [dispatch, options.url]);

  return {
    loading,
    error,
    data,
    postData: trigger,
    reset: resetData,
  };
}
