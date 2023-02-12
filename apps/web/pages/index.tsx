import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { css } from '@emotion/react'
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
      <VStack spacing="18px" mt="32px" mb="16px" mx="16px" align="stretch">
        {favorites.length === 0 ? (
          <NoItemMessage
            title="즐겨찾는 농구장이 없으시네요? 🤔"
            type="favorite"
            description="즐겨찾기하면 더 빠르게 예약하실 수 있어요"
            buttonTitle="즐겨찾는 농구장 등록하기"
          />
        ) : (
          <VStack spacing="12px" align="stretch">
            {favorites.map(({ id, court }, index) => (
              <VStack
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
                p="12px"
                borderRadius="16px"
                boxShadow="0 8px 32px -16px #00000020"
              >
                <HStack spacing="4px">
                  <Icon name="map-pin" size="sm" color="#FE6D04" />
                  <Text fontSize="xl" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" fontWeight="bold">
                    {court.name}
                  </Text>
                </HStack>
                <HStack spacing="8px">
                  <HStack spacing="8px">
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
                  </HStack>
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
                </HStack>
              </VStack>
            ))}
          </VStack>
        )}
      </VStack>
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
    <VStack spacing="18px" mt="32px" mb="16px" mx="16px" align="stretch">
      <VStack spacing="18px" align="stretch">
        {Array.from({ length: 6 }).map((_, index) => (
          <Box key={index} p="12px">
            <VStack align="stretch" spacing="12px">
              <HStack align="stretch">
                <Skeleton.Box width={28} height={28} />
                <SkeletonName />
              </HStack>
              <HStack spacing="8px">
                <Skeleton.Box width={42} height={42} />
                <Skeleton.Box width={42} height={42} />
                <Skeleton.Box width={42} height={42} />
                <Skeleton.Box
                  height={42}
                  css={css`
                    flex: 1;
                  `}
                />
              </HStack>
            </VStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  )
}
