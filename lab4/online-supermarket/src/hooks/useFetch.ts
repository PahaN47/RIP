import React, { useCallback, useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(
    async () =>
      await fetch(url)
        .then(async (resp) => resp.json())
        .catch((err) => {
          console.log({ err });
          return undefined;
        })
        .finally(() => setIsLoading(false)),
    [url]
  );

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getData().then((data) => setData(data as unknown as T));
  }, [getData, setData]);

  useEffect(() => {
    if (!data) {
      fetchData();
    }
  }, [fetchData, data]);

  return { data, isLoading, fetchData };
};
