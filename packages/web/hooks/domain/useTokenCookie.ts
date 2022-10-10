import dayjs from "dayjs"
import { useCookies } from "react-cookie"
import { TOKEN_KEY } from "~/constants"

const useTokenCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies()

  return {
    get: () => cookies[TOKEN_KEY],
    set: (token: string) =>
      setCookie(TOKEN_KEY, token, {
        path: "/",
        expires: dayjs().add(14, "day").toDate(),
        sameSite: "strict",
      }),
    remove: () => removeCookie(TOKEN_KEY, { path: "/" }),
  }
}

export default useTokenCookie
