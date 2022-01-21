import { ReactNode } from "react";
import {
  AuthProvider,
  NavigationProvider,
  SocketProvider,
  MapProvider,
} from ".";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <SocketProvider>
        <NavigationProvider>
          <MapProvider>{children}</MapProvider>
        </NavigationProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default Providers;
