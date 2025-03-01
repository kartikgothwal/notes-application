import { useEffect, useState } from "react";

const useDebounce = (value: string | null, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(value);
  useEffect(() => {
    if (value === null) return;
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
