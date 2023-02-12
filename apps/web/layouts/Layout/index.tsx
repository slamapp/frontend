import React, { useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box, Center, Text, VStack } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { QueryErrorBoundary } from '@suspensive/react-query'
import { Button } from '~/components/uis'
import { useIntersectionObserver } from '~/hooks'
import { PageLoader, ScrollContainer } from './components'
import { BottomNavigation, TopNavigation, useNavigationValue } from './navigations'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const { top, bottom } = useNavigationValue()
  const topIntersectionObserverRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const topIntersectionObserverEntry = useIntersectionObserver(topIntersectionObserverRef, {})

  return (
    <VStack align="stretch" justify="stretch" maxW="560px" m="auto" h="100%" spacing={0}>
      <ScrollContainer>
        <QueryErrorBoundary
          fallback={(queryError) => {
            console.error(queryError.error)

            return (
              <Center flex={1}>
                <VStack>
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
                  <Text>오류가 발생했습니다.</Text>
                  <Button
                    onClick={async () => {
                      await router.push('/logout')
                      queryError.reset()
                    }}
                  >
                    처음부터 시작하기
                  </Button>
                </VStack>
              </Center>
            )
          }}
        >
          <Box ref={topIntersectionObserverRef} pos="absolute" minH="30px" w="100%" />
          {top && <TopNavigation isShrink={!topIntersectionObserverEntry?.isIntersecting} />}
          {children}
        </QueryErrorBoundary>
        <PageLoader />
      </ScrollContainer>
      {bottom && <BottomNavigation />}
    </VStack>
  )
}

export default Layout
