import type { DependencyList } from "react";
import { useEffect } from "react";
import type { AsyncFn } from "./useAsyncFn";
import useAsyncFn from "./useAsyncFn";

interface stateProps {
  isLoading: boolean;
  value?: any;
}

const useAsync = (fn: AsyncFn, deps: DependencyList): stateProps => {
  const [state, callback] = useAsyncFn(fn, deps);

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
};

export default useAsync;
