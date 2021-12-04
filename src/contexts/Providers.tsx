import { ReactNode } from "react";
import NavigationProvider from "./NavigationProvider";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return <NavigationProvider>{children}</NavigationProvider>;
};

export default Providers;
