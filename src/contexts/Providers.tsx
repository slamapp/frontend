import { ReactNode } from "react";
import { AuthProvider, NavigationProvider } from ".";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <NavigationProvider>{children}</NavigationProvider>;
    </AuthProvider>
  );
};

export default Providers;
