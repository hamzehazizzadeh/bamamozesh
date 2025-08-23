import { isEmpty, isEqual } from "lodash";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useQueryParam = (key, defaultValue = null) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawValue = searchParams.get(key);

  const parsedValue = useMemo(() => {
    if (rawValue === null || rawValue === undefined) return defaultValue;

    try {
      const parsed = JSON.parse(rawValue);
      return isEqual(parsed, defaultValue) ? defaultValue : parsed;
    } catch {
      return rawValue;
    }
  }, [rawValue, defaultValue]);

  const setValue = useCallback(
    (value) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);

          const isDate = value instanceof Date;

          const shouldDelete =
            value === null ||
            value === undefined ||
            (typeof value === "string" && value.trim() === "") ||
            (typeof value === "object" && !isDate && isEmpty(value));

          if (shouldDelete) {
            newParams.delete(key);
          } else {
            const toStore =
              typeof value === "string" || isDate
                ? String(value)
                : JSON.stringify(value);
            newParams.set(key, toStore);
          }
          return newParams;
        },
        { replace: true }
      );
    },
    [key, setSearchParams]
  );

  return [parsedValue, setValue];
};

export default useQueryParam;
