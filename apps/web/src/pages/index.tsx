import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { css } from '@emotion/react'
import { Box, Stack } from '@jsxcss/emotion'
import { Delay, Suspense } from '@suspensive/react'
import { motion } from 'framer-motion'
import { CourtItem, NoItemMessage } from '~/components/domains'
import { Button, Icon, Skeleton } from '~/components/uis'
import { useGetFavoritesQuery } from '~/features/favorites'
import { Navigation } from '~/layouts/Layout/navigations'

const Page = () => {
  return (
    <Navigation
      top={{
        title: '즐겨찾기',
        isNotification: true,
        isProfile: true,
      }}
      bottom
    >
      <Suspense.CSROnly
        fallback={
          <Delay>
            <Fallback />
          </Delay>
        }
      >
        <Contents />
      </Suspense.CSROnly>
    </Navigation>
  )
}

export default Page

const Contents = () => {
  const getFavoritesQuery = useGetFavoritesQuery()
  const [favorites] = useState(getFavoritesQuery.data.contents)

  return (
    <Box flex={1}>
      <Head>
        <title>Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      <Stack.Vertical spacing={18} margin="32px 16px 16px 16px" align="stretch">
        {favorites.length === 0 ? (
          <NoItemMessage
            title="즐겨찾는 농구장이 없으시네요? 🤔"
            type="favorite"
            description="즐겨찾기하면 더 빠르게 예약하실 수 있어요"
            buttonTitle="즐겨찾는 농구장 등록하기"
          />
        ) : (
          <Stack.Vertical spacing={12} align="stretch">
            {favorites.map(({ id, court }, index) => (
              <Stack.Vertical
                key={id}
                as={motion.div}
                variants={{
                  initial: { y: 40, opacity: 0 },
                  animate: {
                    y: 0,
                    opacity: 1,
                    transition: { delay: index / 50 },
                    backgroundColor: '#ffffff90',
                  },
                  whileTap: { backgroundColor: 'white' },
                }}
                initial="initial"
                animate="animate"
                whileTap="whileTap"
                border="1px solid white"
                spacing="16px"
                align="stretch"
                padding={12}
                borderRadius="16px"
                boxShadow="0 8px 32px -16px #00000020"
              >
                <Stack.Horizontal align="center" spacing={4}>
                  <Icon name="map-pin" size="sm" color="#FE6D04" />
                  <Box fontSize={20} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" fontWeight="bold">
                    {court.name}
                  </Box>
                </Stack.Horizontal>
                <Stack.Horizontal align="center" spacing={8}>
                  <Stack.Horizontal spacing={8}>
                    <CourtItem.FavoritesToggle
                      courtId={court.id}
                      favoriteId={
                        getFavoritesQuery.data?.contents.find((favorite) => favorite.court.id === court.id)?.id || null
                      }
                    />
                    <CourtItem.Share
                      court={{
                        id: court.id,
                        latitude: court.latitude,
                        longitude: court.longitude,
                        name: court.name,
                      }}
                    />
                    <CourtItem.Map court={court} />
                  </Stack.Horizontal>
                  <Link
                    href={{
                      pathname: '/map',
                      query: {
                        courtId: court.id,
                      },
                    }}
                    passHref
                    style={{ flex: 1, display: 'flex' }}
                  >
                    <Button size="lg" fullWidth>
                      예약하기
                    </Button>
                  </Link>
                </Stack.Horizontal>
              </Stack.Vertical>
            ))}
          </Stack.Vertical>
        )}
      </Stack.Vertical>
    </Box>
  )
}

const Fallback = () => {
  const SkeletonName = () => {
    const [width, setWidth] = useState('0%')

    useEffect(() => {
      setWidth(`${Math.random() * 20 + 40}%`)
    }, [])

    return <Skeleton.Box width={width} height={28} />
  }

  return (
    <Stack.Vertical spacing={18} margin="32px 16px 16px 16px" align="stretch">
      <Stack.Vertical spacing={18} align="stretch">
        {Array.from({ length: 6 }).map((_, index) => (
          <Box key={index} padding={12}>
            <Stack.Vertical align="stretch" spacing={12}>
              <Stack.Horizontal align="stretch">
                <Skeleton.Box width={28} height={28} />
                <SkeletonName />
              </Stack.Horizontal>
              <Stack.Horizontal spacing={8}>
                <Skeleton.Box width={42} height={42} />
                <Skeleton.Box width={42} height={42} />
                <Skeleton.Box width={42} height={42} />
                <Skeleton.Box
                  height={42}
                  css={css`
                    flex: 1;
                  `}
                />
              </Stack.Horizontal>
            </Stack.Vertical>
          </Box>
        ))}
      </Stack.Vertical>
    </Stack.Vertical>
  )
}
