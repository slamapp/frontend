import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { motion } from "framer-motion"
import {
  CourtItem,
  DatePicker,
  EssentialImagePreload,
} from "~/components/domains"
import { Map } from "~/components/kakaos"
import { SSRSafeSuspense } from "~/components/ssrs"
import { BottomModal, Button, Icon, Skeleton, Toast } from "~/components/uis"
import { useCourtQuery, useCourtsQuery } from "~/features/courts"
import { useGetFavoritesQuery } from "~/features/favorites"
import { useGetUpcomingReservationsQuery } from "~/features/reservations"
import { useCurrentUserQuery } from "~/features/users"
import { useLocalStorage } from "~/hooks"
import { Navigation } from "~/layouts/Layout/navigations"
import type { APICourt } from "~/types/domains/objects"

dayjs.extend(utc)
dayjs.extend(timezone)

const PAUSE_COURT_NUMBER = 0
const FIRE_COURT_NUMBER = 6

// 서울
const DEFAULT_TIMEZONE = "Asia/Seoul"
const DEFAULT_POSITION = {
  latitude: 37.5665,
  longitude: 126.978,
}

const Custom = () => {
  const theme = useTheme()
  const router = useRouter()
  const currentUserQuery = useCurrentUserQuery()

  return (
    <HStack
      spacing="4px"
      onClick={() => {
        router.push(currentUserQuery.isSuccess ? "/courts/create" : "/login")
      }}
    >
      <Text color={theme.colors.gray0500} fontSize="12px">
        새 농구장을 추가해보세요
      </Text>
      <Icon name="plus-circle" />
    </HStack>
  )
}

const Page = () => {
  return (
    <SSRSafeSuspense>
      <Contents />
    </SSRSafeSuspense>
  )
}

export default Page

const Contents = () => {
  const theme = useTheme()
  const router = useRouter()
  const currentUserQuery = useCurrentUserQuery()
  const getUpcomingReservationsQuery = useGetUpcomingReservationsQuery()
  const getFavoritesQuery = useGetFavoritesQuery({
    enabled: currentUserQuery.isSuccess,
  })

  const [selectedCourtId, setSelectedCourtId] = useState<APICourt["id"] | null>(
    null
  )

  const [center, setCenter] = useLocalStorage("center", DEFAULT_POSITION)
  const [bounds, setBounds] = useState<kakao.maps.LatLngBounds>()

  const mapRef = useRef<kakao.maps.Map>()

  const [selectedDate, setSelectedDate] = useState(() =>
    dayjs().tz(DEFAULT_TIMEZONE).hour(0).minute(0).second(0).millisecond(0)
  )

  const selectedDateFormatted = selectedDate.format("YYYY-MM-DD")

  const courtsQuery = useCourtsQuery(
    {
      date: selectedDateFormatted,
      startLatitude: bounds?.getSouthWest().getLat() || 0,
      startLongitude: bounds?.getSouthWest().getLng() || 0,
      endLatitude: bounds?.getNorthEast().getLat() || 0,
      endLongitude: bounds?.getNorthEast().getLng() || 0,
      time: "morning",
    },
    { enabled: !!bounds }
  )

  const courtQuery = useCourtQuery(
    selectedCourtId,
    { date: selectedDateFormatted, time: "morning" },
    {
      onSuccess: ({ latitude, longitude }) => {
        setCenter({ latitude, longitude })
        mapRef.current?.relayout()
        courtsQuery.refetch()
      },
    }
  )

  useEffect(() => {
    if (bounds) {
      courtsQuery.refetch()
    }
  }, [
    bounds?.getNorthEast().getLat(),
    bounds?.getNorthEast().getLng(),
    bounds?.getSouthWest().getLat(),
    bounds?.getSouthWest().getLng(),
    selectedDate,
  ])

  useEffect(() => {
    setSelectedCourtId((router.query.courtId as string) || null)

    if (bounds && !router.query.courtId) {
      setTimeout(() => {
        mapRef.current?.relayout()
        courtsQuery.refetch()
      }, 200)
    }
  }, [router.isReady, router.query.courtId])

  return (
    <Navigation
      top={{
        title: selectedCourtId ? "여기에서 농구할까요?" : "어디서 농구할까요?",
        isNotification: false,
        isProfile: false,
        Custom,
      }}
      bottom
    >
      <EssentialImagePreload lazyLoadTime={10} />
      <Flex direction="column" h="100%">
        <DatePicker
          initialValue={selectedDate}
          onChange={(date) => {
            setSelectedDate(date)
            Toast.show(
              <>
                {`${date.format("MM/DD")}`}
                <>{`${date.format("(dd)")}`}</>의 농구장을 보고 있어요
              </>,
              {
                duration: 1000,
                marginBottom: "bottomNavigation",
              }
            )
          }}
        />
        <Map
          center={center}
          level={6}
          maxLevel={7}
          onClick={() => {
            router.replace({ pathname: "/map" })
          }}
          onDragStart={() => {
            router.replace({ pathname: "/map" })
          }}
          onLoaded={(map) => {
            setBounds(map.getBounds())
            mapRef.current = map
          }}
          onBoundChange={(map) => {
            setBounds(map.getBounds())
          }}
          onZoomChanged={(map) => {
            setBounds(map.getBounds())
          }}
          style={{ flex: 1 }}
        >
          <Map.Button.CurrentLocation />
          <Map.Button.ZoomInOut />
          {courtsQuery.isFetching && <Map.LoadingIndicator />}
          {courtsQuery.isSuccess &&
            courtsQuery.data.map(({ court, reservationMaxCount }) => {
              let imageSrc = "/assets/basketball/animation_off_400.png"

              const isReservatedCourt =
                getUpcomingReservationsQuery.isSuccess &&
                getUpcomingReservationsQuery.data.contents.some(
                  ({ court: { id } }) => id === court.id
                )
              const isFavoritedCourt =
                getFavoritesQuery.isSuccess &&
                getFavoritesQuery.data.contents.some(
                  ({ court: { id } }) => id === court.id
                )

              if (isFavoritedCourt) {
                imageSrc = "/assets/basketball/animation_off_favorited.png"
              }

              if (
                reservationMaxCount > PAUSE_COURT_NUMBER &&
                reservationMaxCount < FIRE_COURT_NUMBER
              ) {
                if (isReservatedCourt && isFavoritedCourt) {
                  imageSrc = "/assets/basketball/fire_off_all_tagged.gif"
                } else if (isReservatedCourt) {
                  imageSrc = "/assets/basketball/fire_off_reservated.gif"
                } else if (isFavoritedCourt) {
                  imageSrc = "/assets/basketball/fire_off_favorited.gif"
                } else {
                  imageSrc = "/assets/basketball/fire_off_400.gif"
                }
              }

              if (reservationMaxCount >= FIRE_COURT_NUMBER) {
                if (isReservatedCourt && isFavoritedCourt) {
                  imageSrc = "/assets/basketball/fire_on_all_tagged.gif"
                } else if (isReservatedCourt) {
                  imageSrc = "/assets/basketball/fire_on_reservated.gif"
                } else if (isFavoritedCourt) {
                  imageSrc = "/assets/basketball/fire_on_favorited.gif"
                } else {
                  imageSrc = "/assets/basketball/fire_on_400.gif"
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
                        pathname: "/map",
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
                        position: "relative",
                        borderRadius: 25,
                        cursor: "pointer",
                      }}
                      justify="center"
                    >
                      <Box
                        style={{
                          position: "absolute",
                          bottom: -4,
                          backgroundColor: "rgba(0,0,0,0.6)",
                          filter: "blur(4px)",
                          width: 45,
                          height: 45,
                          borderRadius: 25,
                          overflow: "visible",
                        }}
                      />
                      <img
                        src={imageSrc}
                        style={{
                          position: "absolute",
                          bottom: -8,
                          minWidth: 100,
                          minHeight: 150,
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      />
                      <HStack
                        as={motion.div}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        pos="absolute"
                        bottom="-34px"
                        whiteSpace="nowrap"
                        textAlign="center"
                        bgColor={
                          selectedCourtId === court.id ? "black" : "#00000095"
                        }
                        transition="background-color 200ms"
                        backdropFilter="blur(2px)"
                        color="white"
                        borderRadius="8px"
                        py="4px"
                        px="8px"
                        pointerEvents="none"
                        boxShadow="0 0 16px #00000040"
                      >
                        <Icon
                          name="map-pin"
                          size={12}
                          color={theme.colors.orange0600}
                        />
                        <Text fontSize="12px" fontWeight="bold">
                          {court.name}
                        </Text>
                      </HStack>
                    </Flex>
                  </motion.div>
                </Map.Marker.CustomMarkerOverlay>
              )
            })}
        </Map>
        <BottomModal isOpen={!!selectedCourtId}>
          <Box p="24px 20px 20px 20px" h="170px">
            {courtQuery.isLoading ? (
              <VStack align="stretch" justify="space-between" h="100%">
                <VStack align="stretch">
                  <HStack>
                    <Skeleton.Circle size={32} />
                    <Skeleton.Box
                      height={24}
                      style={{ flex: 1, marginRight: 80 }}
                    />
                  </HStack>
                  <Skeleton.Paragraph fontSize={12} line={2} />
                </VStack>

                <HStack spacing="8px">
                  <Skeleton.Box height={36} width={36} />
                  <Skeleton.Box height={36} width={36} />
                  <Skeleton.Box height={36} width={36} />
                  <Skeleton.Box height={36} style={{ flex: 1 }} />
                </HStack>
              </VStack>
            ) : (
              courtQuery.isSuccess && (
                <VStack align="stretch" justify="space-between" h="100%">
                  <VStack align="stretch" spacing={0}>
                    <CourtItem.Header>{courtQuery.data.name}</CourtItem.Header>
                    <CourtItem.Address>
                      {courtQuery.data.address}
                    </CourtItem.Address>
                  </VStack>
                  <HStack spacing="8px">
                    {getFavoritesQuery.isSuccess && (
                      <CourtItem.FavoritesToggle
                        courtId={courtQuery.data.id}
                        favoriteId={
                          getFavoritesQuery.data.contents.find(
                            (favorite) =>
                              favorite.court.id === courtQuery.data.id
                          )?.id || null
                        }
                      />
                    )}
                    <CourtItem.Share court={courtQuery.data} />
                    <CourtItem.ChatLink chatroom={{ id: "1" }} />
                    <CourtItem.Map court={courtQuery.data} />
                    <Box flex={1}>
                      <Link
                        href={
                          currentUserQuery.isSuccess
                            ? `reservations/courts/${courtQuery.data.id}?date=${selectedDateFormatted}`
                            : "/login"
                        }
                        passHref
                      >
                        <Button size="lg" fullWidth>
                          예약하기
                        </Button>
                      </Link>
                    </Box>
                  </HStack>
                </VStack>
              )
            )}
          </Box>
        </BottomModal>
      </Flex>
    </Navigation>
  )
}
