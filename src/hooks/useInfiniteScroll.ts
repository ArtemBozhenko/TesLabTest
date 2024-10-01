import React, { useState, useEffect, useMemo, useRef } from 'react';

export const isValidNotEmptyArray = <T,>(array: T[]): boolean => {
  return !!(array && array.length > 0);
};

export interface IListQueryResponse<T> {
  recipes: T[];
  total: number;
  skip: number;
  limit: number;
}

interface IUseInfiniteScrollOptions {
  limit?: number;
}

interface IUseInfiniteScrollReturn<T> {
  combinedData: T[];
  localSkip: number;
  setLocalSkip: React.Dispatch<React.SetStateAction<number>>;
  loadMore: () => void;
  refresh: () => void;
  isLoading: boolean;
  isFetching: boolean;
  isRefresh: boolean;
}

const useInfiniteScroll = <T,>(
  useGetDataListQuery: (params: { skip: number; limit: number;[key: string]: any }, options?: { pollingInterval?: number, refetchOnMountOrArgChange?: boolean }) => any,
  { limit = 10, ...queryParameters }: IUseInfiniteScrollOptions
): IUseInfiniteScrollReturn<T> => {
  const [localSkip, setLocalSkip] = useState(0);
  const [isRefresh, setRefresh] = useState(false);
  const [combinedData, setCombinedData] = useState<T[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const queryResponse = useGetDataListQuery(
    {
      skip: localSkip,
      limit,
      ...queryParameters,
    },
    { pollingInterval: 0, refetchOnMountOrArgChange: true },
    // { pollingInterval: 30000 } // обновление последнего запроса через 30 сек
  );

  const {
    recipes: fetchData = [],
    total: remoteTotal = 0,
    limit: remoteLimit = 10,
  } = (queryResponse?.data as IListQueryResponse<T>) || {};

  useEffect(() => {
    if (isValidNotEmptyArray(fetchData)) {
      if (localSkip === 0) {
        setCombinedData([...fetchData]);
      } else if (localSkip >= limit) {
        setRefresh(false);
        setCombinedData((previousData: T[]) => [...previousData, ...fetchData]);
      }
    }
  }, [fetchData]);

  const isLastPage = useMemo<boolean>(() => {
    return remoteTotal > localSkip + remoteLimit;
  }, [remoteTotal, remoteLimit, localSkip]);

  const refresh = () => {
    clearInterval(intervalRef.current!);
    if (localSkip === 0) {
      queryResponse.refetch().unwrap()
        .then((res: IListQueryResponse<T>) => {
          setCombinedData([...res.recipes]);
        })
        .finally(() => startPolling())
    } else {
      setLocalSkip(0);
      startPolling();
    }
  };

  const loadMore = () => {
    if (isLastPage) {
      setLocalSkip((skip) => skip + remoteLimit);
    }
  };

  const startPolling = () => {
    intervalRef.current = setInterval(() => {
      setLocalSkip(0);
    }, 30000);
  };

  useEffect(() => {
    startPolling();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    combinedData: (fetchData?.length === 0 || combinedData?.length === 0 || combinedData === undefined) ? fetchData : combinedData,
    localSkip,
    setLocalSkip,
    loadMore,
    refresh,
    isLoading: queryResponse?.isLoading,
    isFetching: queryResponse?.isFetching,
    isRefresh,
  };
};

export default useInfiniteScroll;
