import dayjs from "dayjs"
import { useCookies } from "react-cookie"
import { env } from "~/constants"

const useTokenCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies()

  return {
    get: () => cookies[env.SLAM_TOKEN_KEY],
    set: (token: string) =>
      setCookie(`${env.SLAM_TOKEN_KEY}`, token, {
        path: "/",
        expires: dayjs().add(14, "day").toDate(),
        sameSite: "strict",
      }),
    remove: () => removeCookie(`${env.SLAM_TOKEN_KEY}`, { path: "/" }),
  }
}

export default useTokenCookie
