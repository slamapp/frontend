import { createContext } from "react";

export interface ContextProps {
  sendTestOn: any;
  sendChat: any;
  sendObject: any;
}

const initialContext = {
  sendTestOn: () => {},
  sendChat: () => {},
  sendObject: () => {},
};

export const Context = createContext<ContextProps>(initialContext);
