import { createContext, ReactNode, useContext } from "react";
import { GutterType } from "./types";

interface ProviderProps {
  children: ReactNode;
  gutter: GutterType;
}

interface ContextProps {
  gutter: GutterType;
}

const FluxContext = createContext<ContextProps>({ gutter: 0 });
export const useFlux = () => useContext(FluxContext);

const FluxProvider = ({ children, gutter = 0 }: ProviderProps) => {
  return (
    <FluxContext.Provider value={{ gutter }}>{children}</FluxContext.Provider>
  );
};

export default FluxProvider;
