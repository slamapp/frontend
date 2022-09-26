import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { css, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { CourtItem, DatePicker } from "~/components/domains"
import Map from "~/components/kakaos/Map/Map"
import { Button, Icon, Skeleton, Spacer, Text } from "~/components/uis/atoms"
import { Toast } from "~/components/uis/molecules"
import { useNavigationContext } from "~/contexts/hooks"
import { useCourtQuery, useCourtsQuery } from "~/features/courts"
import { useLocalStorage } from "~/hooks"
import { useLocalToken } from "~/hooks/domain"
import type { APICourt } from "~/types/domains"
import { getLocalToken } from "~/utils"
import { getTimezoneDateStringFromDate } from "~/utils/date"

// 서울
const DEFAULT_POSITION = {
  latitude: 37.5665,
  longitude: 126.978,
}

const MapPage = () => {
  const router = useRouter()
  const [localToken] = useLocalToken()

  const [selectedCourtId, setSelectedCourtId] = useState<APICourt["id"] | null>(
    null
  )

  const [mapInitialCenter, setMapInitialCenter] = useLocalStorage(
    "mapInitialCenter",
    DEFAULT_POSITION
  )

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
    const titleText = selectedCourtId
      ? "여기에서 농구할까요?"
      : "어디서 농구할까요?"
    setNavigationTitle(
      <motion.span
        key={titleText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ wordBreak: "keep-all" }}
      >
        {titleText}
      </motion.span>
    )
  }, [selectedCourtId, setNavigationTitle])

  useMountCustomButtonEvent(
    <Spacer type="horizontal" gap={8} align="center">
      <Text color="lightgrey" size="xs">
        새 농구장을 추가해보세요
      </Text>
      <Icon name="plus-circle" size={24} />
    </Spacer>,
    () => {
      if (localToken) {
        router.push("/courts/create")
        Toast.show("새 농구장을 제안하고 승인받으면 지도에서 보여요")
      } else {
        router.push("/login")
        Toast.show("로그인 후에 새 농구장을 추가할 수 있어요")
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
      {!bounds && <Skeleton.Box style={{ flex: 1 }} />}
      <Map
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
          if (mapInitialCenter.latitude && mapInitialCenter.longitude) {
            map.setCenter(
              new kakao.maps.LatLng(
                mapInitialCenter.latitude,
                mapInitialCenter.longitude
              )
            )
          }
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
        <Map.LoadingIndicator isLoading={courtsQuery.isFetching} />
        {courtsQuery.isSuccess &&
          courtsQuery.data.map(({ court, reservationMaxCount }) => (
            <Map.Marker.BasketBall
              key={court.id}
              court={court}
              reservationMaxCount={reservationMaxCount}
              onClick={(court) => {
                router.replace({
                  pathname: "/map",
                  query: { courtId: court.id },
                })
                setMapInitialCenter({
                  latitude: court.latitude,
                  longitude: court.longitude,
                })
              }}
            />
          ))}
      </Map>
      <BottomModal
        selectedDate={selectedDate}
        courtId={selectedCourtId}
        map={mapRef.current}
        courtsRefetch={() => {
          courtsQuery.refetch()
        }}
      />
    </>
  )
}

export default MapPage

const BottomModal = ({
  courtId,
  selectedDate,
  map,
  courtsRefetch,
}: {
  courtId: APICourt["id"] | null
  selectedDate: Dayjs
  map?: kakao.maps.Map
  courtsRefetch: () => void
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
