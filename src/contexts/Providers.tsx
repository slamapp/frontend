import { ReactNode } from "react";
import { AuthProvider, NavigationProvider, MapProvider } from ".";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <NavigationProvider>
        <MapProvider>{children}</MapProvider>
      </NavigationProvider>
    </AuthProvider>
  );
};

export default Providers;
