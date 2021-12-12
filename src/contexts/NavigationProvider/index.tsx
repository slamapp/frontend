import { useCallback, useReducer, ReactNode, useEffect } from "react";
import { pageType, eventType, navigationType } from "./actionTypes";
import Context from "./context";
import { reducer, initialData, DataProps } from "./reducer";
import { Events, GetPageType } from "./types";

interface Props {
  children: ReactNode;
}

const NavigationProvider = ({ children }: Props) => {
  const [navigationProps, dispatch] = useReducer(reducer, initialData);

  const setCurrentPage = useCallback((pageType) => {
    dispatch({ type: pageType });
  }, []);

  const useMountPage = (getPageType: GetPageType) =>
    useEffect(() => {
      const currentPage = getPageType(pageType);
      setCurrentPage(currentPage);
      return () => setCurrentPage(pageType.NONE);
    }, []);

  const setNavigationEvent = useCallback(
    (events: Events = { back: null, customButton: null }) => {
      dispatch({ type: eventType.BIND, payload: events });
    },
    []
  );

  const setCustomButtonEvent = useCallback(
    (title: string, handleClick: any) => {
      dispatch({
        type: eventType.BIND_CUSTOM_BUTTON,
        payload: { title, handleClick },
      });
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
        setCustomButtonEvent,
        clearNavigationEvent,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default NavigationProvider;
