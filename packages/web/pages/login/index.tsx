import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { HStack, VStack } from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"
import { BottomFixedGradient, Logo } from "~/components/domains"
import { Button } from "~/components/uis/atoms"
import { IconButton } from "~/components/uis/molecules"
import { useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"

const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI as string

const Page = withRouteGuard("prevented", () => {
  const theme = useTheme()
  const router = useRouter()
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_LOGIN")

  const endpoint = process.env.NEXT_PUBLIC_SERVICE_API_END_POINT as string
  const kakaoUrl = `${endpoint}/oauth2/authorization/kakao?redirect_uri=${redirectUri}`

  const handleClickLogin = () => {
    router.replace(kakaoUrl)
  }

  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
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
              font-size: 16;
              font-weight: 900;
            `}
          >
            같이 농구할 사람이 없다고?
          </span>
        </VStack>
      </div>
      <BottomFixedGradient>
        <HStack m="16px" spacing="8px">
          <Link href="/map" passHref>
            <a>
              <IconButton name="map" />
            </a>
          </Link>
          <Button
            onClick={handleClickLogin}
            size="lg"
            style={{
              flex: 1,
              backgroundColor: theme.colors.kakaoYellow,
              color: theme.colors.kakaoLoginBrown,
            }}
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
    </>
  )
})

export default Page
