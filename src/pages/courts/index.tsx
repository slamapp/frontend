import { useState, useCallback, useEffect, useMemo, useRef } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import type { Dayjs } from "dayjs"
import { motion } from "framer-motion"
import {
  DatePicker,
  BasketballMarker,
  Map,
  CourtItem,
  LeadToLoginModal,
} from "~/components/domains"
import { Text, Button, Spacer, Icon, Skeleton } from "~/components/uis/atoms"
import { Toast } from "~/components/uis/molecules"
import {
  useAuthContext,
  useMapContext,
  useNavigationContext,
} from "~/contexts/hooks"
import { useLocalStorage } from "~/hooks"
import { useLocalToken } from "~/hooks/domain"
import { courtApi } from "~/service"
import type { APICourt, Coord } from "~/types/domains"
import {
  getTimezoneCurrentDate,
  getTimezoneDateStringFromDate,
} from "~/utils/date"
import { DEFAULT_POSITION, getCurrentLocation } from "~/utils/geolocation"

interface Geocoder extends kakao.maps.services.Geocoder {
  coord2Address: (
    latitude: number,
    longitude: number,
    callback?: (result: any, status: any) => void
  ) => string
}

const Courts: NextPage = () => {
  const isMountedRef = useRef(false)
  const router = useRouter()

  const { authProps } = useAuthContext()

  const { useMountPage, useMountCustomButtonEvent, setNavigationTitle } =
    useNavigationContext()

  const [localToken] = useLocalToken()

  useMountPage("PAGE_MAP")

  const { map } = useMapContext()

  const currentDate = useMemo(() => getTimezoneCurrentDate(), [])

  const [courts, setCourts] = useState<
    Awaited<ReturnType<typeof courtApi["getCourtsByCoordsAndDate"]>>["data"]
  >([])

  const [mapInitialCenter, setMapInitialCenter] = useLocalStorage(
    "mapInitialCenter",
    DEFAULT_POSITION
  )
  const [center, setCenter] = useState<Coord>(mapInitialCenter)

  const [selectedDate, setSelectedDate] = useState<Dayjs>(currentDate)

  const [selectedMarker, setSelectedMarker] = useState<
    Awaited<ReturnType<typeof courtApi.getCourtDetail>>["data"] | null
  >(null)
  const [address, setAddress] = useState<string | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenLeadToLoginModal, setIsOpenLeadToLoginModal] = useState(false)

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
      } else {
        setIsOpenLeadToLoginModal(true)
      }
    }
  )

  const onClose = useCallback(() => {
    setIsOpen(false)
    setSelectedMarker(null)
  }, [])

  const fetchCourtsByBoundsAndDatetime = useCallback(
    async (map: kakao.maps.Map) => {
      const bounds = map.getBounds()
      const swLatlng = bounds.getSouthWest()
      const neLatLng = bounds.getNorthEast()

      const startLatitude = swLatlng.getLat()
      const startLongitude = swLatlng.getLng()

      const endLatitude = neLatLng.getLat()
      const endLongitude = neLatLng.getLng()

      try {
        const { data } = await courtApi.getCourtsByCoordsAndDate({
          date: getTimezoneDateStringFromDate(selectedDate),
          startLatitude,
          startLongitude,
          endLatitude,
          endLongitude,
          time: "morning",
        })
        setCourts(data)
      } catch (error) {
        Toast.show("코트 정보를 받아오는 데에 실패했어요")
      }
    },
    [selectedDate]
  )

  const restoreCourts = useCallback(
    async (courtId: APICourt["id"], needCenter = false) => {
      try {
        const {
          data: { court, reservationMaxCount },
        } = await courtApi.getCourtDetail(
          courtId,
          getTimezoneDateStringFromDate(selectedDate),
          "morning"
        )
        setIsOpen(true)

        if (needCenter) {
          setCenter([court.latitude, court.longitude])
        }
        setSelectedMarker({
          court,
          reservationMaxCount,
        })
      } catch (error) {
        console.error(error)
      }
    },
    [selectedDate]
  )

  const handleDateClick = useCallback((selectedDate: Dayjs) => {
    setSelectedDate(selectedDate)
  }, [])

  const handleMarkerClick = useCallback(
    (court: APICourt) => {
      setIsOpen(true)
      restoreCourts(court.id)
      setMapInitialCenter([court.latitude, court.longitude])
      router.push(`/courts?courtId=${court.id}`, undefined, {
        shallow: true,
      })

      const moveLatLon = new kakao.maps.LatLng(court.latitude, court.longitude)

      if (map) {
        setTimeout(() => {
          map.relayout()
          map.panTo(moveLatLon)
        }, 100)
      }
    },
    [restoreCourts, router, map, setMapInitialCenter]
  )

  useEffect(() => {
    if (isMountedRef.current) {
      setTimeout(() => {
        if (map) {
          map.relayout()
          setTimeout(() => {
            fetchCourtsByBoundsAndDatetime(map)
          }, 200)
        }
      }, 100)
    }
  }, [isOpen])

  const handleGetCurrentLocation = useCallback(async () => {
    getCurrentLocation(async ([latitude, longitude]) => {
      setCenter([latitude, longitude])
    })
  }, [])

  useEffect(() => {
    if (router.isReady) {
      const { courtId } = router.query

      if (courtId) {
        restoreCourts(`${courtId}`, true)
      } else {
        // handleGetCurrentLocation();
      }
    }
  }, [map])

  useEffect(() => {
    const searchAddressFromCoords = (latitude: number, longitude: number) => {
      const geocoder = new kakao.maps.services.Geocoder()

      ;(geocoder as Geocoder).coord2Address(
        longitude,
        latitude,
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            // 도로명 주소
            if (result[0].road_address) {
              setAddress(result[0].road_address.address_name)
            }
            // 법정 주소
            else if (result[0].address.address_name) {
              setAddress(result[0].address.address_name)
            }
            // 주소가 없는 경우
            else {
              setAddress("주소가 존재하지 않습니다.")
            }
          }
        }
      )
    }

    if (map && selectedMarker) {
      searchAddressFromCoords(
        selectedMarker.court.latitude,
        selectedMarker.court.longitude
      )
    }
  }, [selectedMarker, map])

  useEffect(() => {
    const titleText = selectedMarker
      ? "여기에서 농구할까요?"
      : "어디서 농구할까요?"
    setNavigationTitle(
      <motion.span
        key={titleText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {titleText}
      </motion.span>
    )
  }, [selectedMarker, setNavigationTitle])

  useEffect(() => {
    const updateSelectedCourtDetail = async () => {
      if (selectedMarker) {
        const {
          data: { court, reservationMaxCount },
        } = await courtApi.getCourtDetail(
          selectedMarker.court.id,
          getTimezoneDateStringFromDate(selectedDate),
          "morning"
        )

        setSelectedMarker((prev) => ({ ...prev, court, reservationMaxCount }))
      }
    }

    if (map) {
      fetchCourtsByBoundsAndDatetime(map)

      if (selectedMarker) {
        updateSelectedCourtDetail()
      }
    }
  }, [map, fetchCourtsByBoundsAndDatetime, authProps.favorites])

  useEffect(() => {
    isMountedRef.current = true
  }, [])

  return (
    <>
      <Head>
        <title>탐색 | Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      <DatePicker
        startDate={currentDate}
        selectedDate={selectedDate}
        onClick={handleDateClick}
      />

      <Map.KakaoMap
        level={5}
        center={center}
        onClick={onClose}
        onDragStart={onClose}
        onDragEnd={fetchCourtsByBoundsAndDatetime}
        onZoomChanged={(map: kakao.maps.Map) => {
          fetchCourtsByBoundsAndDatetime(map)
          onClose()
        }}
      >
        {/* <Map.ZoomButton onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} /> */}
        <Map.CurrentLocationButton
          onGetCurrentLocation={handleGetCurrentLocation}
        />

        {map &&
          courts.map((court) => (
            <BasketballMarker
              key={court.court.id}
              map={map}
              court={court.court}
              reservationMaxCourt={court.reservationMaxCourt}
              onClick={handleMarkerClick}
            />
          ))}
      </Map.KakaoMap>

      <BottomModal isOpen={isOpen}>
        {selectedMarker && (
          <BottomModalContainer>
            <Spacer gap="xs">
              <CourtItem.Header>{selectedMarker.court.name}</CourtItem.Header>
              <CourtItem.Address>{address}</CourtItem.Address>
            </Spacer>
            <Text block strong size="lg">
              {selectedMarker.reservationMaxCount} 명
            </Text>
            <Actions type="horizontal" gap="xs">
              <CourtItem.FavoritesToggle courtId={selectedMarker.court.id} />
              <CourtItem.Share
                court={{
                  id: selectedMarker.court.id,
                  latitude: selectedMarker.court.latitude,
                  longitude: selectedMarker.court.longitude,
                  name: selectedMarker.court.name,
                }}
              />
              <CourtItem.ChatLink
                chatroomId={
                  // TODO: Court에 chatroomId 포함시키기
                  "1"
                }
              />
              <CourtItem.KakaoMapLink
                latitude={selectedMarker.court.latitude}
                longitude={selectedMarker.court.longitude}
                courtName={selectedMarker.court.name}
              />

              {localToken ? (
                <Link
                  href={`reservations/courts/${
                    selectedMarker.court.id
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
            </Actions>
          </BottomModalContainer>
        )}
        {!selectedMarker && (
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
      </BottomModal>

      <LeadToLoginModal
        headerContent={
          <p style={{ textAlign: "center" }}>
            로그인하면 새 농구장을 추가할 수 있습니다
          </p>
        }
        isOpen={isOpenLeadToLoginModal}
        cancel={{
          content: "닫기",
          handle: () => {
            setIsOpenLeadToLoginModal(false)
          },
        }}
        confirm={{
          content: "로그인하러 가기",
          handle: () => {
            router.push("/login")
          },
        }}
      />
    </>
  )
}

export default Courts

const Actions = styled(Spacer)`
  margin-top: ${({ theme }) => theme.gaps.sm};
`

const BottomModal = styled.div<{ isOpen: boolean }>`
  ${({ theme, isOpen }) => css`
    height: ${isOpen ? 210 : 0}px;
    background-color: ${theme.colors.white};
  `}
  display: flex;
  z-index: 100;
  border-radius: 16px 16px 0 0;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.3);
  transition: height 40ms ease-in-out;
`

const BottomModalContainer = styled.div`
  flex: 1;
  margin: 28px 20px 16px 20px;
  overflow: hidden;
`
