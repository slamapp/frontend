import type { NextPage } from "next"
import Head from "next/head"
import styled from "@emotion/styled"
import { FavoriteList } from "~/components/domains"
import { useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"

const Home: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_FAVORITES")

  return (
    <PageContainer>
      <Head>
        <title>Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      <FavoriteList />
    </PageContainer>
  )
}

export default withRouteGuard("private", Home)

const PageContainer = styled.div`
  flex: 1;
  margin: 0 16px;
`
