import { createContext } from "react";

export interface ContextProps {
  compatClient: any;
}

const initialContext = {
  compatClient: null,
};

export const Context = createContext<ContextProps>(initialContext);
