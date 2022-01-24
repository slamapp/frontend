import { ReactNode } from "react";
import {
  AuthProvider,
  NavigationProvider,
  SocketProvider,
  MapProvider,
  ReservationProvider,
} from ".";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <SocketProvider>
        <NavigationProvider>
          <ReservationProvider>
            <MapProvider>{children}</MapProvider>
          </ReservationProvider>
        </NavigationProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default Providers;
