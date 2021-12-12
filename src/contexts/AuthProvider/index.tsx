import useLocalStorage from "@hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useReducer, ReactNode } from "react";
import { Context } from "./context";
import { useHandles } from "./handles";
import { initialData, reducer } from "./reducer";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [authProps, dispatch] = useReducer(reducer, initialData);
  const [token, setToken] = useLocalStorage("slam_token", "");

  const { handleGetCurrentUser } = useHandles();

  const getCurrentUser = async (token: string) => {
    dispatch({ type: "LOADING_ON" });
    try {
      const { data } = await handleGetCurrentUser(token);
      dispatch({ type: "GET_CURRENT_USER", payload: data });
      console.log(data);
      router.replace("/");
    } catch (error) {
      console.error(error);
      throw new Error(
        "유저 정보 받아오기 실패! 토큰이 만료되거나 잘못된 토큰으로 사용자 정보를 요청했습니다."
      );
    } finally {
      dispatch({ type: "LOADING_OFF" });
    }
  };

  return (
    <Context.Provider
      value={{
        authProps,
        getCurrentUser,
      }}
    >
      {authProps.isLoading && <AuthLoading />}
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;

export { default as useAuthContext } from "./hook";

const AuthLoading = () => {
  return <div>Loading</div>;
};
