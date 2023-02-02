import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { HStack, VStack } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { Logo } from "~/components/domains"
import { Button, IconButton } from "~/components/uis"
import { env } from "~/constants"
import { BottomFixedGradient } from "~/layouts"
import { Navigation } from "~/layouts/Layout/navigations"

const Page = () => {
  const router = useRouter()

  const kakaoUrl = `${env.SERVICE_API_END_POINT}/oauth2/authorization/kakao?redirect_uri=${env.REDIRECT_URI}`

  const handleClickLogin = () => {
    router.replace(kakaoUrl)
  }

  return (
    <Navigation>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 90%;
        `}
      >
        <Head>
          <title>로그인 | Slam - 우리 주변 농구장을 빠르게</title>
          <meta name="description" content="혼자서도 농구를 더 빠르게" />
        </Head>

        <VStack>
          <Logo width={130} />
          <span
            css={css`
              font-weight: 900;
              font-size: 16;
            `}
          >
            같이 농구할 사람이 없다고?
          </span>
        </VStack>
      </div>
      <BottomFixedGradient>
        <HStack m="16px" spacing="8px">
          <Link href="/map" passHref>
            <IconButton icon={{ name: "map" }} />
          </Link>
          <Button
            onClick={handleClickLogin}
            size="lg"
            style={{ flex: 1 }}
            scheme="kakao"
          >
            <Image
              src="/assets/icon-kakao.svg"
              alt="카카오 로그인 로고"
              width={21}
              height={19}
            />
            카카오 로그인
          </Button>
        </HStack>
      </BottomFixedGradient>
    </Navigation>
  )
}

export default Page
