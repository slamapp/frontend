import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Box, Flex } from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import { AnimatePresence, motion } from "framer-motion"
import {
  BottomFixedGradient,
  CourtItem,
  DatePicker,
} from "~/components/domains"
import Map from "~/components/kakaos/Map/Map"
import { Button, Icon, Skeleton, Spacer, Text } from "~/components/uis/atoms"
import { Toast } from "~/components/uis/molecules"
import { useAuthContext, useNavigationContext } from "~/contexts/hooks"
import { useCourtQuery, useCourtsQuery } from "~/features/courts"
import { useLocalStorage } from "~/hooks"
import type { APICourt } from "~/types/domains/objects"
import { getLocalToken } from "~/utils"
import { getTimezoneDateStringFromDate } from "~/utils/date"

const PAUSE_COURT_NUMBER = 0
const FIRE_COURT_NUMBER = 6

// 서울
const DEFAULT_POSITION = {
  latitude: 37.5665,
  longitude: 126.978,
}

const Page = () => {
  const theme = useTheme()
  const router = useRouter()
  const { authProps } = useAuthContext()
  const { favorites, reservations, currentUser } = authProps

  const [selectedCourtId, setSelectedCourtId] = useState<APICourt["id"] | null>(
    null
  )

  const [center, setCenter] = useLocalStorage("center", DEFAULT_POSITION)

  const [bounds, setBounds] = useState<kakao.maps.LatLngBounds>()

  const mapRef = useRef<kakao.maps.Map>()

  const isFetchDisabled = useRef(false)
  const { useMountPage, useMountCustomButtonEvent, setNavigationTitle } =
    useNavigationContext()

  const [selectedDate, setSelectedDate] = useState(() => {
    const timezone = "Asia/Seoul"

    return dayjs().tz(timezone).hour(0).minute(0).second(0).millisecond(0)
  })

  const courtsQuery = useCourtsQuery(
    {
      date: selectedDate.format("YYYY-MM-DD"),
      startLatitude: bounds?.getSouthWest().getLat() || 0,
      startLongitude: bounds?.getSouthWest().getLng() || 0,
      endLatitude: bounds?.getNorthEast().getLat() || 0,
      endLongitude: bounds?.getNorthEast().getLng() || 0,
      time: "morning",
    },
    { enabled: !!bounds }
  )

  useMountPage("PAGE_MAP")

  useEffect(() => {
    setNavigationTitle(
      <motion.span
        key={selectedCourtId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ wordBreak: "keep-all" }}
      >
        {selectedCourtId ? "여기에서 농구할까요?" : "어디서 농구할까요?"}
      </motion.span>
    )

    if (selectedCourtId === null) {
      setTimeout(() => {
        mapRef.current?.relayout()
        courtsQuery.refetch()
      }, 200)
    }
  }, [selectedCourtId, setNavigationTitle])

  useMountCustomButtonEvent(
    <Spacer type="horizontal" gap={8} align="center">
      <Text color="lightgrey" size="xs">
        새 농구장을 추가해보세요
      </Text>
      <Icon name="plus-circle" />
    </Spacer>,
    () => {
      if (currentUser) {
        router.push("/courts/create")
      } else {
        router.push("/login")
      }
    }
  )

  useEffect(() => {
    requestAnimationFrame(() => {
      courtsQuery.refetch()
    })
  }, [bounds, selectedDate])

  useEffect(() => {
    setSelectedCourtId((router.query.courtId as string) || null)
  }, [router.isReady, router.query.courtId])

  return (
    <>
      <Flex direction="column" flex={1}>
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
              }
            )
          }}
        />

        <Map
          center={center}
          level={6}
          onClick={() => {
            router.replace({ pathname: "/map" })
          }}
          onDragStart={() => {
            router.replace({ pathname: "/map" })

            isFetchDisabled.current = true
          }}
          onDragEnd={() => {
            isFetchDisabled.current = false
          }}
          onLoaded={(map) => {
            setBounds(map.getBounds())
            mapRef.current = map
          }}
          onBoundChange={(map) => {
            if (!isFetchDisabled.current) {
              setBounds(map.getBounds())
            }
          }}
          style={{ flex: 1 }}
        >
          <Map.Button.CurrentLocation />
          <Map.Button.ZoomInOut />
          {courtsQuery.isFetching && <Map.LoadingIndicator />}
          {courtsQuery.isSuccess &&
            courtsQuery.data.map(({ court, reservationMaxCount }) => {
              let imageSrc = "/assets/basketball/animation_off_400.png"

              const isReservatedCourt = reservations.some(
                ({ court: { id } }) => id === court.id
              )
              const isFavoritedCourt = favorites.some(
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
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
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
                    </Flex>
                  </motion.div>
                </Map.Marker.CustomMarkerOverlay>
              )
            })}
        </Map>
        <BottomModal
          selectedDate={selectedDate}
          courtId={selectedCourtId}
          map={mapRef.current}
          courtsRefetch={() => {
            courtsQuery.refetch()
          }}
          onCourtReady={({ latitude, longitude }) => {
            setCenter({
              latitude,
              longitude,
            })
          }}
        />
      </Flex>
      <AnimatePresence mode="wait">
        {selectedCourtId ??
          (authProps.currentUser === null && (
            <BottomFixedGradient
              as={motion.div}
              initial={{ y: 300 }}
              animate={{ y: 0, transition: { type: "ease" } }}
              exit={{ y: 300 }}
            >
              <Box mx="16px" mb="16px">
                <Link href="/login" passHref>
                  <a>
                    <Button
                      size="lg"
                      fullWidth
                      css={css`
                        background-color: ${theme.colors.kakaoYellow};
                        color: ${theme.colors.kakaoLoginBrown};
                      `}
                    >
                      <Image
                        src="/assets/icon-kakao.svg"
                        alt="카카오 로그인 로고"
                        width={21}
                        height={19}
                      />
                      3초만에 로그인하기
                    </Button>
                  </a>
                </Link>
              </Box>
            </BottomFixedGradient>
          ))}
      </AnimatePresence>
    </>
  )
}

export default Page

const BottomModal = ({
  courtId,
  selectedDate,
  map,
  courtsRefetch,
  onCourtReady,
}: {
  courtId: APICourt["id"] | null
  selectedDate: Dayjs
  map?: kakao.maps.Map
  courtsRefetch: () => void
  onCourtReady: (court: APICourt) => void
}) => {
  const theme = useTheme()

  const courtQuery = useCourtQuery(
    courtId || "",
    { date: getTimezoneDateStringFromDate(selectedDate), time: "morning" },
    {
      enabled: !!courtId,
      onSuccess: (data) => {
        setTimeout(() => {
          map?.relayout()
          map?.panTo(new kakao.maps.LatLng(data.latitude, data.longitude))
          courtsRefetch()
        }, 0)

        onCourtReady(data)
      },
    }
  )

  return (
    <div
      css={css`
        position: sticky;
        height: ${courtId ? 210 : 0}px;
        background-color: ${theme.colors.white};
        display: flex;
        z-index: 0;
        border-radius: 16px 16px 0 0;
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.3);
        transition: height 100ms ease-in-out;
      `}
    >
      {courtQuery.isSuccess && (
        <BottomModalContainer>
          <Spacer gap="xs">
            <CourtItem.Header>{courtQuery.data.name}</CourtItem.Header>
            <CourtItem.Address>{courtQuery.data.address}</CourtItem.Address>
          </Spacer>
          <Spacer
            type="horizontal"
            gap="xs"
            style={{ marginTop: theme.gaps.sm }}
          >
            <CourtItem.FavoritesToggle courtId={courtQuery.data.id} />
            <CourtItem.Share
              court={{
                id: courtQuery.data.id,
                latitude: courtQuery.data.latitude,
                longitude: courtQuery.data.longitude,
                name: courtQuery.data.name,
              }}
            />
            <CourtItem.ChatLink
              chatroomId={
                // TODO: Court에 chatroomId 포함시키기
                "1"
              }
            />
            <CourtItem.KakaoMapLink
              latitude={courtQuery.data.latitude}
              longitude={courtQuery.data.longitude}
              courtName={courtQuery.data.name}
            />

            {getLocalToken() ? (
              <Link
                href={`reservations/courts/${
                  courtQuery.data.id
                }?date=${getTimezoneDateStringFromDate(selectedDate)}`}
                passHref
              >
                <a style={{ flex: 1, display: "flex" }}>
                  <Button size="lg" style={{ flex: 1 }}>
                    예약하기
                  </Button>
                </a>
              </Link>
            ) : (
              <Link href="/login" passHref>
                <a style={{ flex: 1, display: "flex" }}>
                  <Button size="lg" style={{ flex: 1 }}>
                    로그인하고 예약하기
                  </Button>
                </a>
              </Link>
            )}
          </Spacer>
        </BottomModalContainer>
      )}
      {courtQuery.isLoading && (
        <BottomModalContainer>
          <Spacer justify="space-between" style={{ height: "100%" }}>
            <Spacer gap={8}>
              <Spacer type="horizontal" align="center" gap={8}>
                <Skeleton.Circle size={32} />
                <Skeleton.Box
                  height={24}
                  style={{ flex: 1, marginRight: 80 }}
                />
              </Spacer>
              <Skeleton.Paragraph fontSize={12} line={2} />
            </Spacer>

            <Spacer type="horizontal" gap={12}>
              <Skeleton.Box height={36} width={36} />
              <Skeleton.Box height={36} width={36} />
              <Skeleton.Box height={36} width={36} />
              <Skeleton.Box height={36} width={36} />
              <Skeleton.Box height={36} style={{ flex: 1 }} />
            </Spacer>
          </Spacer>
        </BottomModalContainer>
      )}
    </div>
  )
}

const BottomModalContainer = styled.div`
  flex: 1;
  margin: 28px 20px 16px 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
