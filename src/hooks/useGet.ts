import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, reset, selectApiState } from "../store/slices/apiSlice";
import type { UseGetOptions, UseGetReturn } from "../consts/types";
import type { AppDispatch, RootState } from "../store/index";

export function useGet<R = unknown>(options: UseGetOptions): UseGetReturn<R> {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector((state: RootState) =>
    selectApiState(state, options.url) as {
      loading: boolean;
      error: string | null;
      data: R | null;
    }
  );

  const getData = useCallback(async (): Promise<void> => {
    await dispatch(fetchData(options));
  }, [dispatch, options]);

  const resetData = useCallback(() => {
    dispatch(reset(options.url));
  }, [dispatch, options.url]);

  return { loading, error, data, getData, reset: resetData };
}
