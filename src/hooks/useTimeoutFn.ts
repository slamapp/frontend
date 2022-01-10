import { useEffect, useRef, useCallback } from "react";

const useTimeoutFn = (fn: () => void, ms: number) => {
  const timeoutId = useRef<NodeJS.Timeout>();
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }, []);

  useEffect(() => clear, [clear]);

  return [run, clear];
};

export default useTimeoutFn;
