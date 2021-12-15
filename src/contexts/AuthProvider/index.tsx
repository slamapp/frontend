import { useLocalToken } from "@hooks/domain";
import { useRouter } from "next/router";
import { useReducer, ReactNode, useEffect, useCallback } from "react";
import userAPI from "@service/userApi";
import { AuthLoading } from "@components/domain";
import Context from "./context";
import { initialData, reducer } from "./reducer";
import { actionTypes } from "./actionTypes";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [authProps, dispatch] = useReducer(reducer, initialData);
  const [token, _] = useLocalToken();

  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.clear();
    dispatch({ type: actionTypes.CLEAR_CURRENT_USER });
    router.replace("/login");
  }, [router]);

  const getCurrentUser = useCallback(async () => {
    dispatch({ type: actionTypes.LOADING_ON });
    try {
      const data = await userAPI.getUserData();
      dispatch({ type: actionTypes.GET_CURRENT_USER, payload: data });
    } catch (error) {
      logout();
    } finally {
      dispatch({ type: actionTypes.LOADING_OFF });
    }
  }, [logout]);

  useEffect(() => {
    if (token) {
      getCurrentUser();
    } else {
      dispatch({ type: actionTypes.LOADING_OFF });
    }
  }, []);

  return (
    <Context.Provider
      value={{
        authProps,
        getCurrentUser,
        logout,
      }}
    >
      <AuthLoading />
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
