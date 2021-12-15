import { useLocalToken } from "@hooks/domain";
import { useRouter } from "next/router";
import { useReducer, ReactNode, useEffect, useCallback } from "react";
import userAPI from "@service/userApi";
import { AuthLoading } from "@components/domain";
import Context from "./context";
import { initialData, reducer } from "./reducer";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [authProps, dispatch] = useReducer(reducer, initialData);
  const [token, setToken] = useLocalToken();

  const router = useRouter();

  const getCurrentUser = useCallback(async () => {
    dispatch({ type: "LOADING_ON" });
    try {
      const data = await userAPI.getUserData();

      dispatch({ type: "GET_CURRENT_USER", payload: data });
    } catch (error) {
      localStorage.clear();
      router.replace("/login");
    } finally {
      dispatch({ type: "LOADING_OFF" });
    }
  }, [router, setToken]);

  useEffect(() => {
    if (token) {
      getCurrentUser();
    } else {
      dispatch({ type: "LOADING_OFF" });
    }
  }, []);

  return (
    <Context.Provider
      value={{
        authProps,
        getCurrentUser,
      }}
    >
      <AuthLoading />
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
