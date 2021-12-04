import { useCallback, useReducer, ReactNode, useEffect } from "react";
import { pageType, eventType } from "./actionTypes";
import { Context } from "./context";
import { reducer, initialData } from "./reducer";
import { PageType, PageTypeUnion } from "./types";

interface Props {
  children: ReactNode;
}

const NavigationProvider = ({ children }: Props) => {
  const [navigationProps, dispatch] = useReducer(reducer, initialData);

  const setCurrentPage = useCallback((pageType) => {
    dispatch({ type: pageType });
  }, []);

  const useMountPage = (getPageType: (page: PageType) => PageTypeUnion) =>
    useEffect(() => {
      setCurrentPage(getPageType(pageType));
      return () => setCurrentPage(pageType.NONE);
    }, []);

  const setNavigationEvent = useCallback(
    (events = { back: null, next: null }) => {
      dispatch({ type: eventType.BIND, payload: events });
    },
    []
  );

  const clearNavigationEvent = useCallback(() => {
    dispatch({ type: eventType.CLEAR });
  }, []);

  return (
    <Context.Provider
      value={{
        navigationProps,
        pageType,
        useMountPage,
        setNavigationEvent,
        clearNavigationEvent,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default NavigationProvider;

export { default as useNavigationContext } from "./hook";
