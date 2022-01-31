import type { ReactNode, ReactChild } from "react";
import { useCallback, useReducer, useEffect } from "react";
import { pageType, eventType, navigationType } from "./actionTypes";
import Context from "./context";
import { reducer, initialData } from "./reducer";
import type { Events, GetPageType } from "./types";

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

  const setIsTopTransparent = (isTopTransparent: boolean) =>
    dispatch({
      type: navigationType.SET_IS_TOP_TRANSPARENT,
      payload: { isTopTransparent },
    });

  const useDisableTopTransparent = () => {
    useEffect(() => {
      setIsTopTransparent(false);

      return () => setIsTopTransparent(true);
    }, []);
  };

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

  const useMountCustomButtonEvent = (
    customButtonName: string,
    handleClick: (...args: any[]) => void
  ) =>
    useEffect(() => {
      setCustomButtonEvent(customButtonName, handleClick);

      return clearNavigationEvent;
    }, []);

  const clearNavigationEvent = useCallback(() => {
    dispatch({ type: eventType.CLEAR });
  }, []);

  const setNavigationTitle = useCallback((title: ReactChild) => {
    dispatch({ type: navigationType.SET_NAVIGATION_TITLE, payload: title });
  }, []);

  return (
    <Context.Provider
      value={{
        navigationProps,
        pageType,
        useMountPage,
        setNavigationTitle,
        setNavigationEvent,
        setCustomButtonEvent,
        clearNavigationEvent,
        setIsTopTransparent,
        useDisableTopTransparent,
        useMountCustomButtonEvent,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default NavigationProvider;
