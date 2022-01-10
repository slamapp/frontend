import { useRouter } from "next/router";
import { useReducer, ReactNode, useEffect, useCallback } from "react";

import { useLocalToken } from "@hooks/domain";
import {
  reservationApi,
  favoriteApi,
  userApi,
  notificationApi,
} from "@service/.";
import { Notification, EditableUserProfile } from "@domainTypes/.";
import Context from "./context";
import { initialData, reducer } from "./reducer";
import { authTypes } from "./actionTypes";
import AuthLoading from "./AuthLoading";

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

  const setCurrentUser = useCallback((data) => {
    dispatch({ type: authTypes.SET_CURRENT_USER, payload: data });
  }, []);

  const getCurrentUser = useCallback(async () => {
    dispatch({ type: authTypes.LOADING_ON });
    try {
      const data = await userApi.getUserData();
      setCurrentUser(data);
    } catch (error) {
      console.error(error);
      logout();
    } finally {
      dispatch({ type: authTypes.LOADING_OFF });
    }
  }, [logout, setCurrentUser]);

  const updateMyProfile = useCallback(
    async (editedUserProfile: EditableUserProfile) => {
      dispatch({ type: authTypes.LOADING_ON });
      try {
        const userProfile = await userApi.updateMyProfile<EditableUserProfile>(
          editedUserProfile
        );
        dispatch({
          type: authTypes.UPDATE_MY_PROFILE,
          payload: { userProfile },
        });
        router.replace(`/user/${authProps.currentUser.userId}`);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: authTypes.LOADING_OFF });
      }
    },
    [authProps.currentUser.userId, router]
  );

  const deleteMyProfileImage = useCallback(async () => {
    dispatch({ type: authTypes.LOADING_ON });
    try {
      const deletedMyProfileImage = await userApi.deleteMyProfileImage<{
        profileImage: string | null;
      }>();
      dispatch({
        type: authTypes.DELETE_MY_PROFILE_IMAGE,
        payload: { deletedMyProfileImage },
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: authTypes.LOADING_OFF });
    }
  }, [authProps.currentUser.userId, router]);

  const getMyReservations = useCallback(async () => {
    try {
      const { reservations } = await reservationApi.getMyReservations<{
        reservations: any[];
      }>();
      dispatch({
        type: authTypes.SET_MY_RESERVATIONS,
        payload: { reservations },
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getMyFavorites = useCallback(async () => {
    try {
      const { favorites } = await favoriteApi.getMyFavorites();

      dispatch({
        type: authTypes.GET_MY_FAVORITES,
        payload: { favorites },
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const createFavorite = useCallback(async (courtId: number) => {
    try {
      const favorite = await favoriteApi.createMyFavorite(courtId);
      dispatch({
        type: authTypes.CREATE_FAVORITE,
        payload: { favorite },
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteFavorite = useCallback(async (favoriteId: number) => {
    try {
      const { favoriteId: deletedFavoriteId } =
        await favoriteApi.deleteMyFavorite<{ favoriteId: number }>(favoriteId);
      dispatch({
        type: authTypes.DELETE_FAVORITE,
        payload: { deletedFavoriteId },
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const readAllNotifications = async () => {
    try {
      await notificationApi.readAllNotifications();
      dispatch({ type: authTypes.READ_ALL_NOTIFICATIONS });
    } catch (error) {
      console.error(error);
    }
  };

  const getMoreNotifications = async () => {
    const { notificationLastId } = authProps.currentUser;

    if (notificationLastId) {
      const { contents, lastId: fetchedLastId } =
        await notificationApi.getNotifications({
          lastId: notificationLastId,
        });

      dispatch({
        type: authTypes.CONCAT_NOTIFICATIONS,
        payload: { notifications: contents, lastId: fetchedLastId },
      });
    }
  };

  const unshiftNotification = (notification: Notification) => {
    dispatch({
      type: authTypes.UNSHIFT_NOTIFICATION,
      payload: { notification },
    });
  };

  const authProviderInit = async () => {
    // AuthProvider 마운트시 - 사용자정보(알림 포함) 받아오기
    try {
      await getCurrentUser().then(() => {
        getMyReservations();
        getMyFavorites();
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      authProviderInit();
    } else {
      dispatch({ type: authTypes.LOADING_OFF });
    }
  }, []);

  return (
    <Context.Provider
      value={{
        authProps,
        setCurrentUser,
        getCurrentUser,
        logout,
        createFavorite,
        deleteFavorite,
        getMyFavorites,
        getMyReservations,
        updateMyProfile,
        deleteMyProfileImage,
        readAllNotifications,
        getMoreNotifications,
        unshiftNotification,
      }}
    >
      <AuthLoading />
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
