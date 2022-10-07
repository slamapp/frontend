import type { ReactNode } from "react"
import { useCallback, useEffect, useReducer } from "react"
import type { ContextProps } from "./context"
import Context from "./context"
import { initialData, reducer } from "./reducer"

interface Props {
  children: ReactNode
}

const NavigationProvider = ({ children }: Props) => {
  const [navigationProps, dispatch] = useReducer(reducer, initialData)

  const setTopNavIsShrink = (isShrink: boolean) => {
    dispatch({ type: "SET_TOP_NAV_IS_SHRINK", payload: { isShrink } })
  }

  const useMountPage: ContextProps["useMountPage"] = (currentPageType) =>
    useEffect(() => {
      dispatch({ type: currentPageType })

      return () => dispatch({ type: "PAGE_NONE" })
    }, [])

  const setNavigationEvent: ContextProps["setNavigationEvent"] = useCallback(
    (events = { back: null, customButton: null }) =>
      dispatch({ type: "EVENT_BIND", payload: { events } }),
    []
  )

  const setCustomButtonEvent: ContextProps["setCustomButtonEvent"] =
    useCallback(
      (title, handleClick) =>
        dispatch({
          type: "EVENT_BIND_CUSTOM_BUTTON",
          payload: { title, handleClick },
        }),
      []
    )

  const useMountCustomButtonEvent: ContextProps["useMountCustomButtonEvent"] = (
    customButtonName,
    handleClick
  ) =>
    useEffect(() => {
      setCustomButtonEvent(customButtonName, handleClick)

      return clearNavigationEvent
    }, [handleClick])

  const clearNavigationEvent: ContextProps["clearNavigationEvent"] =
    useCallback(() => {
      dispatch({ type: "EVENT_CLEAR" })
    }, [])

  const setNavigationTitle: ContextProps["setNavigationTitle"] = useCallback(
    (title) => {
      dispatch({ type: "NAVIGATION_SET_TITLE", payload: { title } })
    },
    []
  )

  return (
    <Context.Provider
      value={{
        navigationProps,
        useMountPage,
        setNavigationTitle,
        setNavigationEvent,
        setCustomButtonEvent,
        clearNavigationEvent,
        useMountCustomButtonEvent,
        setTopNavIsShrink,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default NavigationProvider
