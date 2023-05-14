import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box, Flex, Stack } from '@jsxcss/emotion'
import { Logo } from '~/components/domains'
import { Button, IconButton } from '~/components/uis'
import { env } from '~/constants'
import { BottomFixedGradient } from '~/layouts'
import { Navigation } from '~/layouts/Layout/navigations'

const Page = () => {
  const router = useRouter()

  const handleClickLogin = () =>
    router.replace(`${env.SERVICE_API_END_POINT}/oauth2/authorization/kakao?redirect_uri=${env.REDIRECT_URI}`)

  return (
    <Navigation>
      <Flex.Center height="90%">
        <Head>
          <title>로그인 | Slam - 우리 주변 농구장을 빠르게</title>
          <meta name="description" content="혼자서도 농구를 더 빠르게" />
        </Head>
        <Stack.Vertical spacing={8}>
          <Logo width={130} />
          <Box as="span" fontWeight={900} fontSize={16}>
            같이 농구할 사람이 없다고?
          </Box>
        </Stack.Vertical>
      </Flex.Center>
      <BottomFixedGradient>
        <Stack.Horizontal margin={16} spacing={8} align="center">
          <Link href="/map" passHref>
            <IconButton icon={{ name: 'map' }} />
          </Link>
          <Button onClick={handleClickLogin} size="lg" style={{ flex: 1 }} scheme="kakao">
            <Image src="/assets/icon-kakao.svg" alt="카카오 로그인 로고" width={21} height={19} />
            카카오 로그인
          </Button>
        </Stack.Horizontal>
      </BottomFixedGradient>
    </Navigation>
  )
}

export default Page
