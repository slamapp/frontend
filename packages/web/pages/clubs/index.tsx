import type { NextPage } from "next"
import Head from "next/head"
import { withRouteGuard } from "~/hocs"

const Clubs: NextPage = withRouteGuard("private", () => {
  return (
    <div>
      <Head>
        <title>클럽목록 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>
    </div>
  )
})

export default Clubs
