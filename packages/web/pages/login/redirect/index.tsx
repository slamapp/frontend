import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { Spinner } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { useTokenCookie } from "~/hooks/domain"

const Page: NextPage = () => {
  const router = useRouter()
  const token = router.query.token as string
  const tokenCookie = useTokenCookie()

  useEffect(() => {
    if (token) {
      tokenCookie.set(token)
      router.replace("/")
    }
  }, [token])

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
      `}
    >
      <Spinner />
    </div>
  )
}

export default Page
