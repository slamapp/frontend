import { useReducer, ReactNode } from "react";
import { Context } from "./context";
import { initialData, reducer } from "./reducer";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [authProps, dispatch] = useReducer(reducer, initialData);

  return (
    <Context.Provider
      value={{
        authProps,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;

export { default as useAuthContext } from "./hook";
