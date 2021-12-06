import { createContext } from "react";
import { initialData } from "./reducer";
import { ContextProps } from "./types";

export const initialContext = {
  authProps: initialData,
};

export const Context = createContext<ContextProps>(initialContext);
