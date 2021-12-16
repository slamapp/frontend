import { createContext } from "react";

export interface ContextProps {
  sendObject: any;
  sendFollow: any;
  [x: string]: any;
}

const initialContext = {
  sendObject: () => {},
  sendFollow: () => {},
};

export const Context = createContext<ContextProps>(initialContext);
