import React, { useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import { Box, Flex, Stack } from '@jsxcss/emotion'
import { useIntersectionObserver } from '@slam/hooks'
import { QueryErrorBoundary } from '@suspensive/react-query'
import { Button } from '~/components/uis'
import { PageLoader, ScrollContainer } from './components'
import { BottomNavigation, TopNavigation, useNavigationValue } from './navigations'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const navigation = useNavigationValue()
  const topIntersectionObserverRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const topIntersectionObserverEntry = useIntersectionObserver(topIntersectionObserverRef, {})

  return (
    <Stack.Vertical maxWidth="560px" margin="auto" height="100%">
      <ScrollContainer>
        <QueryErrorBoundary
          fallback={(queryError) => {
            console.error(queryError.error)

            return (
              <Flex.Center flex={1}>
                <Stack.Vertical align="center" spacing={8}>
                  <Image
                    width={90}
                    height={170}
                    unoptimized
                    src="/assets/basketball/animation_off_400.png"
                    alt="basketball"
                    css={css`
                      margin-top: -100px;
                      filter: saturate(0);
                    `}
                  />
                  <Box>오류가 발생했습니다.</Box>
                  <Button
                    onClick={async () => {
                      await router.push('/logout')
                      queryError.reset()
                    }}
                  >
                    처음부터 시작하기
                  </Button>
                </Stack.Vertical>
              </Flex.Center>
            )
          }}
        >
          <Box ref={topIntersectionObserverRef} position="absolute" minHeight={30} width="100%" />
          {navigation.top && <TopNavigation isShrink={!topIntersectionObserverEntry?.isIntersecting} />}
          {children}
        </QueryErrorBoundary>
        <PageLoader />
      </ScrollContainer>
      {navigation.bottom && <BottomNavigation />}
    </Stack.Vertical>
  )
}

export default Layout
