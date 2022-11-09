import React, { useCallback, useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(
    async (thisUrl = url) =>
      await fetch(thisUrl)
        .then(async (resp) => resp.json())
        .catch((err) => {
          console.log({ err });
          return undefined;
        })
        .finally(() => setIsLoading(false)),
    [url]
  );

  const fetchData = useCallback(
    (thisUrl = url) => {
      setIsLoading(true);
      getData(thisUrl).then((data) => setData(data as unknown as T));
    },
    [getData, setData]
  );

  useEffect(() => {
    if (!data) {
      fetchData();
    }
  }, [fetchData, data]);

  return { data, isLoading, fetchData };
};
