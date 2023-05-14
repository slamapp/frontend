import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { css, useTheme } from '@emotion/react'
import { Box, Flex, Stack } from '@jsxcss/emotion'
import { useLocalStorage } from '@slam/hooks'
import type { APICourt } from '@slam/types'
import { Delay, Suspense } from '@suspensive/react'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { CourtItem, DatePicker, EssentialImagePreload } from '~/components/domains'
import { Map } from '~/components/kakaos'
import { BottomModal, Button, Icon, Skeleton, Toast } from '~/components/uis'
import { useAddressQuery } from '~/features/addresses'
import { useCourtQuery, useCourtsQuery } from '~/features/courts'
import { useGetFavoritesQuery } from '~/features/favorites'
import { useGetUpcomingReservationsQuery } from '~/features/reservations'
import { useCurrentUserQuery } from '~/features/users'
import { Navigation } from '~/layouts/Layout/navigations'

const PAUSE_COURT_NUMBER = 0
const FIRE_COURT_NUMBER = 6

// 서울
const DEFAULT_POSITION = {
  latitude: 37.5665,
  longitude: 126.978,
}

const Page = () => {
  const router = useRouter()

  const selectedCourtId = router.query.courtId as string | undefined

  const [center, setCenter] = useLocalStorage('center', DEFAULT_POSITION)
  const [bounds, setBounds] = useState<kakao.maps.LatLngBounds>()

  const mapRef = useRef<kakao.maps.Map>()

  const [selectedDate, setSelectedDate] = useState(() => dayjs().tz().hour(0).minute(0).second(0).millisecond(0))

  return (
    <Navigation
      top={{
        title: selectedCourtId ? '여기에서 농구할까요?' : '어디서 농구할까요?',
        isNotification: false,
        isProfile: false,
        Custom: () => {
          const theme = useTheme()
          const router = useRouter()
          const currentUserQuery = useCurrentUserQuery()

          return (
            <Stack.Horizontal
              spacing={4}
              align="center"
              onClick={() => router.push(currentUserQuery.isSuccess ? '/courts/create' : '/login')}
            >
              <EssentialImagePreload lazyLoadTime={10} />
              <Box color={theme.colors.gray0500} fontSize={12}>
                새 농구장을 추가해보세요
              </Box>
              <Icon name="plus-circle" />
            </Stack.Horizontal>
          )
        },
      }}
      bottom
    >
      <Flex direction="column" height="100%">
        <DatePicker
          initialValue={selectedDate}
          onChange={(date) => {
            setSelectedDate(date)
            Toast.show(`${date.format('MM/DD(dd)')}의 농구장을 보고 있어요`, {
              duration: 1000,
              marginBottom: 'bottomNavigation',
            })
          }}
        />
        <Map
          center={center}
          level={6}
          maxLevel={7}
          onClick={() => router.replace({ pathname: '/map' })}
          onDragStart={() => router.replace({ pathname: '/map' })}
          onLoaded={(map) => {
            setBounds(map.getBounds())
            mapRef.current = map
          }}
          onBoundChange={(map) => setBounds(map.getBounds())}
          onZoomChanged={(map) => setBounds(map.getBounds())}
          style={{ flex: 1 }}
        >
          <Map.Button.CurrentLocation />
          <Map.Button.ZoomInOut />
          {mapRef.current && bounds && (
            <Suspense.CSROnly
              fallback={
                <Delay>
                  <Map.LoadingIndicator />
                </Delay>
              }
            >
              <Markers bounds={bounds} setBounds={setBounds} selectedDate={selectedDate} map={mapRef.current} />
            </Suspense.CSROnly>
          )}
        </Map>
        <BottomModal isOpen={!!selectedCourtId}>
          <Box padding="24px 20px 20px 20px" height={170}>
            <Suspense.CSROnly
              fallback={
                <Stack.Vertical justify="space-between">
                  <Stack.Vertical spacing={8}>
                    <Stack.Horizontal spacing={8} align="center">
                      <Skeleton.Circle size={32} />
                      <Skeleton.Box height={24} style={{ flex: 1, marginRight: 80 }} />
                    </Stack.Horizontal>
                    <Skeleton.Paragraph fontSize={12} line={2} />
                  </Stack.Vertical>

                  <Stack.Horizontal spacing="8px">
                    <Skeleton.Box height={36} width={36} />
                    <Skeleton.Box height={36} width={36} />
                    <Skeleton.Box height={36} width={36} />
                    <Skeleton.Box height={36} style={{ flex: 1 }} />
                  </Stack.Horizontal>
                </Stack.Vertical>
              }
            >
              {selectedCourtId && (
                <CourtData
                  courtId={selectedCourtId}
                  selectedDate={selectedDate}
                  onSuccess={({ latitude, longitude }) => {
                    setCenter({ latitude, longitude })
                    mapRef.current?.relayout()
                  }}
                />
              )}
            </Suspense.CSROnly>
          </Box>
        </BottomModal>
      </Flex>
    </Navigation>
  )
}

export default Page

const Markers = ({
  selectedDate,
  bounds,
  setBounds,
  map,
}: {
  selectedDate: Dayjs
  bounds: kakao.maps.LatLngBounds
  setBounds: Dispatch<SetStateAction<kakao.maps.LatLngBounds | undefined>>
  map: kakao.maps.Map
}) => {
  const currentUserQuery = useCurrentUserQuery()
  const getUpcomingReservationsQuery = useGetUpcomingReservationsQuery({
    enabled: currentUserQuery.isSuccess,
  })
  const getFavoritesQuery = useGetFavoritesQuery({
    enabled: currentUserQuery.isSuccess,
  })

  const theme = useTheme()
  const router = useRouter()
  const selectedCourtId = router.query.courtId as string | undefined
  const { startLatitude, startLongitude, endLatitude, endLongitude } = useMemo(
    () => ({
      startLatitude: bounds.getSouthWest().getLat(),
      startLongitude: bounds.getSouthWest().getLng(),
      endLatitude: bounds.getNorthEast().getLat(),
      endLongitude: bounds.getNorthEast().getLng(),
    }),
    [bounds]
  )

  const courtsQuery = useCourtsQuery({
    date: selectedDate.format('YYYY-MM-DD'),
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    time: 'morning',
  })

  useEffect(() => {
    courtsQuery.refetch()
  }, [startLatitude, startLongitude, endLatitude, endLongitude, selectedDate])

  useEffect(() => {
    if (!selectedCourtId) {
      map.relayout()
      setBounds(map.getBounds())
    }
  }, [selectedCourtId])

  return (
    <>
      {courtsQuery.data.map(({ court, reservationMaxCount }) => {
        let imageSrc = '/assets/basketball/animation_off_400.png'

        const isReservatedCourt =
          getUpcomingReservationsQuery.isSuccess &&
          getUpcomingReservationsQuery.data.contents.some(({ court: { id } }) => id === court.id)
        const isFavoritedCourt =
          getFavoritesQuery.isSuccess && getFavoritesQuery.data.contents.some(({ court: { id } }) => id === court.id)

        if (isFavoritedCourt) {
          imageSrc = '/assets/basketball/animation_off_favorited.png'
        }

        if (reservationMaxCount > PAUSE_COURT_NUMBER && reservationMaxCount < FIRE_COURT_NUMBER) {
          if (isReservatedCourt && isFavoritedCourt) {
            imageSrc = '/assets/basketball/fire_off_all_tagged.gif'
          } else if (isReservatedCourt) {
            imageSrc = '/assets/basketball/fire_off_reservated.gif'
          } else if (isFavoritedCourt) {
            imageSrc = '/assets/basketball/fire_off_favorited.gif'
          } else {
            imageSrc = '/assets/basketball/fire_off_400.gif'
          }
        }

        if (reservationMaxCount >= FIRE_COURT_NUMBER) {
          if (isReservatedCourt && isFavoritedCourt) {
            imageSrc = '/assets/basketball/fire_on_all_tagged.gif'
          } else if (isReservatedCourt) {
            imageSrc = '/assets/basketball/fire_on_reservated.gif'
          } else if (isFavoritedCourt) {
            imageSrc = '/assets/basketball/fire_on_favorited.gif'
          } else {
            imageSrc = '/assets/basketball/fire_on_400.gif'
          }
        }

        return (
          <Map.Marker.CustomMarkerOverlay
            key={court.id}
            position={{
              latitude: court.latitude,
              longitude: court.longitude,
            }}
          >
            <motion.div
              css={css`
                width: 50;
                height: 50;
              `}
              onTap={() => {
                router.replace({
                  pathname: '/map',
                  query: { courtId: court.id },
                })
              }}
            >
              <Flex
                as={motion.div}
                initial={{ scale: 0, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 50,
                  height: 50,
                  position: 'relative',
                  borderRadius: 25,
                  cursor: 'pointer',
                }}
                justify="center"
              >
                <Box
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    filter: 'blur(4px)',
                    width: 45,
                    height: 45,
                    borderRadius: 25,
                    overflow: 'visible',
                  }}
                />
                <img
                  src={imageSrc}
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    minWidth: 100,
                    minHeight: 150,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                  alt="basketball court status"
                />
                <Stack.Horizontal
                  as={motion.div}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  position="absolute"
                  bottom="-34px"
                  whiteSpace="nowrap"
                  textAlign="center"
                  backgroundColor={selectedCourtId === court.id ? 'black' : '#00000095'}
                  backdropFilter="blur(2px)"
                  color="white"
                  borderRadius="8px"
                  padding="4px 8px"
                  pointerEvents="none"
                  boxShadow="0 0 16px #00000040"
                  align="center"
                  spacing={4}
                >
                  <Icon name="map-pin" size={12} color={theme.colors.orange0600} />
                  <Box fontSize="12px" fontWeight="bold">
                    {court.name}
                  </Box>
                </Stack.Horizontal>
              </Flex>
            </motion.div>
          </Map.Marker.CustomMarkerOverlay>
        )
      })}
    </>
  )
}

const CourtData = ({
  courtId,
  selectedDate,
  onSuccess,
}: {
  courtId: APICourt['id']
  selectedDate: Dayjs
  onSuccess: Parameters<typeof useCourtQuery>[2]['onSuccess']
}) => {
  const currentUserQuery = useCurrentUserQuery()
  const getFavoritesQuery = useGetFavoritesQuery({
    enabled: currentUserQuery.isSuccess,
  })

  const courtQuery = useCourtQuery(courtId, { date: selectedDate.format('YYYY-MM-DD'), time: 'morning' }, { onSuccess })

  const addressQuery = useAddressQuery({
    latitude: courtQuery.data.latitude,
    longitude: courtQuery.data.longitude,
  })

  return (
    <Stack.Vertical justify="space-between" height="100%">
      <Stack.Vertical>
        <CourtItem.Header>{courtQuery.data.name}</CourtItem.Header>
        <CourtItem.Address>{addressQuery.data}</CourtItem.Address>
      </Stack.Vertical>
      <Stack.Horizontal spacing="8px">
        {getFavoritesQuery.isSuccess && (
          <CourtItem.FavoritesToggle
            courtId={courtQuery.data.id}
            favoriteId={
              getFavoritesQuery.data.contents.find((favorite) => favorite.court.id === courtQuery.data.id)?.id || null
            }
          />
        )}
        <CourtItem.Share court={courtQuery.data} />
        {/* <CourtItem.ChatLink chatroom={{ id: "1" }} /> */}
        <CourtItem.Map court={courtQuery.data} />
        <Box flex={1}>
          <Link
            href={
              currentUserQuery.isSuccess
                ? `reservations/courts/${courtQuery.data.id}?date=${selectedDate.format('YYYY-MM-DD')}`
                : '/login'
            }
            passHref
          >
            <Button size="lg" fullWidth>
              예약하기
            </Button>
          </Link>
        </Box>
      </Stack.Horizontal>
    </Stack.Vertical>
  )
}
