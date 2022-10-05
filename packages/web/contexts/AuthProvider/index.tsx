import type { ReactNode } from "react"
import { useCallback, useEffect, useReducer } from "react"
import { useRouter } from "next/router"
import type { AxiosError } from "axios"
import { api } from "~/api"
import { Toast } from "~/components/uis/molecules"
import { useLocalToken } from "~/hooks/domain"
import AuthLoading from "./AuthLoading"
import Context from "./context"
import type { ContextProps } from "./context"
import { initialData, reducer } from "./reducer"

const LOG_OUT_LOGO_ANIMATION_DELAY_TIME_MS = 2000
interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [authProps, dispatch] = useReducer(reducer, initialData)

  const [token] = useLocalToken()

  const router = useRouter()

  const logout: ContextProps["logout"] = useCallback(() => {
    localStorage.clear()
    dispatch({ type: "CLEAR_CURRENT_USER" })
    router.replace("/login")
    setTimeout(() => {
      dispatch({ type: "LOADING_OFF" })
    }, LOG_OUT_LOGO_ANIMATION_DELAY_TIME_MS)
  }, [router])

  const setCurrentUser: ContextProps["setCurrentUser"] = useCallback(
    (data) => dispatch({ type: "SET_CURRENT_USER", payload: data }),
    []
  )

  const getCurrentUser: ContextProps["getCurrentUser"] =
    useCallback(async () => {
      dispatch({ type: "LOADING_ON" })
      try {
        const {
          data: {
            id,
            createdAt,
            description,
            email,
            nickname,
            positions,
            proficiency,
            profileImage,
            role,
            updatedAt,
            notifications,
          },
        } = await api.users.getUserData()

        setCurrentUser({
          user: {
            id,
            createdAt,
            description,
            email,
            nickname,
            positions,
            proficiency,
            profileImage,
            role,
            updatedAt,
          },
          notifications,
        })
      } catch (error) {
        Toast.show("유저 정보를 받아오는 데에 실패했어요")

        logout()
        throw error as AxiosError
      } finally {
        dispatch({ type: "LOADING_OFF" })
      }
    }, [logout, setCurrentUser])

  const deleteMyProfileImage: ContextProps["deleteMyProfileImage"] =
    useCallback(async () => {
      dispatch({ type: "LOADING_ON" })
      try {
        const { data } = await api.users.deleteMyProfileImage()
        const { profileImage } = data
        dispatch({
          type: "SET_MY_PROFILE_IMAGE",
          payload: { profileImage },
        })
      } catch (error) {
        console.error(error)
      } finally {
        dispatch({ type: "LOADING_OFF" })
      }
    }, [router])

  const getMyReservations: ContextProps["getMyReservations"] =
    useCallback(async () => {
      try {
        const { data } = await api.reservations.getMyUpcomingReservations()

        dispatch({
          type: "SET_MY_RESERVATIONS",
          payload: { reservations: data.contents },
        })
      } catch (error) {
        throw error as AxiosError
      }
    }, [])

  const getMyFavorites: ContextProps["getMyFavorites"] =
    useCallback(async () => {
      try {
        const { data } = await api.favorites.getMyFavorites()

        dispatch({
          type: "GET_MY_FAVORITES",
          payload: { favorites: data.contents },
        })
      } catch (error) {
        throw error as AxiosError
      }
    }, [])

  const createFavorite: ContextProps["createFavorite"] = useCallback(
    async (courtId) => {
      try {
        const { data: favorite } = await api.favorites.createFavorite(courtId)
        dispatch({ type: "CREATE_FAVORITE", payload: { favorite } })
      } catch (error) {
        console.error(error)
      }
    },
    []
  )

  const deleteFavorite: ContextProps["deleteFavorite"] = useCallback(
    async (favoriteId) => {
      try {
        await api.favorites.deleteFavorite(favoriteId)
        dispatch({
          type: "DELETE_FAVORITE",
          payload: { deletedFavoriteId: favoriteId },
        })
      } catch (error) {
        console.error(error)
      }
    },
    []
  )

  const readAllNotifications: ContextProps["readAllNotifications"] =
    async () => {
      try {
        await api.notifications.readAllNotifications()
        dispatch({ type: "READ_ALL_NOTIFICATIONS" })
      } catch (error) {
        console.error(error)
      }
    }

  const getMoreNotifications: ContextProps["getMoreNotifications"] =
    async () => {
      if (authProps.notificationLastId) {
        const {
          data: { contents, lastId: fetchedLastId },
        } = await api.notifications.getNotifications({
          lastId: authProps.notificationLastId,
        })

        dispatch({
          type: "CONCAT_NOTIFICATIONS",
          payload: { notifications: contents, lastId: fetchedLastId },
        })
      }
    }

  const unshiftNotification: ContextProps["unshiftNotification"] = (
    notification
  ) => dispatch({ type: "UNSHIFT_NOTIFICATION", payload: { notification } })

  const authProviderInit = async () => {
    try {
      await getCurrentUser()
      await Promise.all([getMyReservations(), getMyFavorites()])
    } catch (error) {
      Toast.show("사용자 정보를 받아오는 도중에 문제가 생겼습니다.")
      throw error as AxiosError
    }
  }

  useEffect(() => {
    if (token) {
      authProviderInit()
    } else {
      dispatch({ type: "LOADING_OFF" })
    }
  }, [])

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
        deleteMyProfileImage,
        readAllNotifications,
        getMoreNotifications,
        unshiftNotification,
        authProviderInit,
      }}
    >
      <AuthLoading />
      {children}
    </Context.Provider>
  )
}

export default AuthProvider
