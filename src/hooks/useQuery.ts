import { useEffect, useCallback, useReducer, useRef, useMemo } from "react";
type HTTPStatusCode =
  | 100
  | 101
  | 102
  | 103
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;

export type ApiFetcher<TResponse, Params> = (
  params: Params,
  signal?: AbortSignal // Make the signal optional
) => Promise<ApiResponse<TResponse>>;

interface UseApiOptions<TParams, TResponse> {
  params?: TParams;
  enabled?: boolean;
  autoFetch?: boolean;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: Error | string) => void;
  customMessage?: Partial<Record<HTTPStatusCode, string>>;
}

interface ApiStatus<TResponse> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | Error | null;
  data: TResponse | null;
}

interface UseApiReturn<TResponse, TParams> extends ApiStatus<TResponse> {
  refetch: (newParams?: TParams) => Promise<void>;
}

function useApi<TResponse, TParams>(
  {
    apiFetcher,
    options: {
      enabled = true,
      autoFetch = true,
      // customMessage = {},
      onError = () => {},
      onSuccess = () => {},
      params,
    },
  }: {
    apiFetcher: ApiFetcher<TResponse, TParams>;
    options?: UseApiOptions<TParams, TResponse>;
  },
  dependencies: Array<any> = []
): UseApiReturn<TResponse, TParams> {
  const [status, setStatus] = useReducer(
    (state: ApiStatus<TResponse>, updates: Partial<ApiStatus<TResponse>>) => ({
      ...state,
      ...updates,
    }),
    {
      isLoading: !!(autoFetch && enabled),
      isSuccess: false,
      isError: false,
      error: null,
      data: null,
    }
  );

  const abortControllerRef = useRef<AbortController | null>(null);
  const memoizedParams = useMemo(() => params, [params]);
  // const toast = useToast();

  const callApi = useCallback(
    async (params: TParams) => {
      setStatus({ isLoading: true, data: null });
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      try {
        const response = await apiFetcher(params, controller.signal);
        if (response.data) {
          setStatus({
            isLoading: false,
            isSuccess: true,
            data: response.data,
          });
          onSuccess?.(response.data);
        } else {
          throw new Error(response.messages[0] || "Failed to fetch data.");
        }
      } catch (error: any) {
        if (error.name === "AbortError" || error.message == "canceled") {
          console.log("Request aborted");
          return;
        }
        setStatus({
          isError: true,
          error,
          isLoading: false,
        });
        // if (!!error) {
        //   toast({
        //     title: `${customMessage ? customMessage[404] : error.message}`,
        //     position: "top",
        //     isClosable: true,
        //   });
        // }
        onError?.(error);
      } finally {
        abortControllerRef.current = null;
      }
    },
    [apiFetcher, onSuccess, onError, params]
  );

  useEffect(() => {
    if (autoFetch && enabled === true) {
      callApi(memoizedParams);
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [...dependencies, abortControllerRef, enabled]);

  const refetch = useCallback(
    async (newParams?: TParams) => {
      const finalParams = newParams || memoizedParams;
      // enabled &&await callApi(finalParams);
      await callApi(finalParams);
    },
    [callApi, memoizedParams, ...dependencies]
  );

  return {
    ...status,
    refetch,
  };
}

export default useApi;
