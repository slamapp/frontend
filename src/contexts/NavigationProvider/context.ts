import { createContext } from "react";
import { pageType } from "./actionTypes";
import { initialData } from "./reducer";
import { ContextProps } from "./types";

const initialContext = {
  navigationProps: initialData,
  pageType,
  useMountPage: () => {},
  setNavigationEvent: () => {},
  clearNavigationEvent: () => {},
};

export const Context = createContext<ContextProps>(initialContext);
