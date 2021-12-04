import { createContext } from "react";
import { pageType } from "./actionTypes";
import { initialData } from "./reducer";
import { ContextProps } from "./types";

export const Context = createContext<ContextProps>({
  navigationProps: initialData,
  pageType,
  useMountPage: (pageType) => {},
  setNavigationEvent: ({ back, next }) => {},
  clearNavigationEvent: () => {},
});
