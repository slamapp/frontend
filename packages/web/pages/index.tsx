import Head from "next/head"
import { css } from "@emotion/react"
import { FavoriteList } from "~/components/domains"
import { useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"

const Page = withRouteGuard("private", () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_FAVORITES")

  return (
    <div
      css={css`
        flex: 1;
        margin: 0 16px;
      `}
    >
      <Head>
        <title>Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      <FavoriteList />
    </div>
  )
})

export default Page
