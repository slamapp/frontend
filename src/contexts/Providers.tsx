import { ReactNode } from "react";
import MapProvider from "./MapProvider";
import NavigationProvider from "./NavigationProvider";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <NavigationProvider>
      <MapProvider>{children}</MapProvider>
    </NavigationProvider>
  );
};

export default Providers;
