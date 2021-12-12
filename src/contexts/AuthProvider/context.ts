import { createContext } from "react";
import { initialData } from "./reducer";
import { ContextProps } from "./types";

export const initialContext = {
  authProps: initialData,
  getCurrentUser: () => {},
};

export const Context = createContext<ContextProps>(initialContext);
