import { useLocalToken } from "@hooks/domain";
import { useRouter } from "next/router";
import { useReducer, ReactNode, useEffect, useCallback } from "react";
import userAPI from "@service/userApi";
import Context from "./context";
import { initialData, reducer } from "./reducer";
import { authTypes } from "./actionTypes";
import AuthLoading from "./AuthLoading";
import { Notification } from "./types";

const LOG_OUT_LOGO_ANIMATION_DELAY_TIME_MS = 2000;
interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [authProps, dispatch] = useReducer(reducer, initialData);
  const [token, _] = useLocalToken();

  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.clear();
    dispatch({ type: authTypes.CLEAR_CURRENT_USER });
    router.replace("/login");
    setTimeout(() => {
      dispatch({ type: authTypes.LOADING_OFF });
    }, LOG_OUT_LOGO_ANIMATION_DELAY_TIME_MS);
  }, [router]);

  const getCurrentUser = useCallback(async () => {
    dispatch({ type: authTypes.LOADING_ON });
    try {
      const data = await userAPI.getUserData();
      dispatch({ type: authTypes.GET_CURRENT_USER, payload: data });
    } catch (error) {
      logout();
    } finally {
      dispatch({ type: authTypes.LOADING_OFF });
    }
  }, [logout]);

  const createFavorite = useCallback((courtId: number) => {
    // TODO create api call하여 받아온 response로 대체
    dispatch({
      type: authTypes.CREATE_FAVORITE,
      payload: {
        favorite: {
          favoriteId: 5,
          courtId,
          courtName: "새로 생성된 농구장",
          latitude: 34.567234,
          longitude: 12.493048,
          createdAt: "2021-01-01T12:20:10",
          updatedAt: "2021-01-01T12:20:10",
        },
      },
    });
  }, []);

  const deleteFavorite = useCallback((favoriteId: number) => {
    // TODO: delete api call하여 받아온 response로 대체
    dispatch({
      type: authTypes.DELETE_FAVORITE,
      payload: {
        deletedFavoriteId: favoriteId,
      },
    });
  }, []);
  const pushNotification = (notification: Notification) => {
    dispatch({
      type: authTypes.PUSH_NOTIFICATION,
      payload: { notification },
    });
  };

  useEffect(() => {
    if (token) {
      getCurrentUser();
    } else {
      dispatch({ type: authTypes.LOADING_OFF });
    }
  }, []);

  return (
    <Context.Provider
      value={{
        authProps,
        getCurrentUser,
        logout,
        createFavorite,
        deleteFavorite,
        pushNotification,
      }}
    >
      <AuthLoading />
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
