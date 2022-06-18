import { useState, useCallback, useEffect, useMemo } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "@emotion/styled"
import type { Dayjs } from "dayjs"
import {
  DatePicker,
  BasketballMarker,
  Map,
  CourtItem,
  LeadToLoginModal,
} from "~/components/domains"
import { Text, Button, Spacer } from "~/components/uis/atoms"
import { ModalSheet } from "~/components/uis/templates"
import {
  useAuthContext,
  useMapContext,
  useNavigationContext,
} from "~/contexts/hooks"
import type { APICourt, Coord } from "~/domainTypes/tobe"
import { useLocalStorage } from "~/hooks"
import { useLocalToken } from "~/hooks/domain"
import { courtApi } from "~/service"
import type { CourtApi } from "~/service/courtApi/type"
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
  const router = useRouter()

  const { authProps } = useAuthContext()

  const { useMountPage, useDisableTopTransparent, useMountCustomButtonEvent } =
    useNavigationContext()

  const [localToken] = useLocalToken()

  useMountPage("PAGE_MAP")
  useDisableTopTransparent()

  const { map } = useMapContext()

  const currentDate = useMemo(() => getTimezoneCurrentDate(), [])

  const [courts, setCourts] = useState<
    Awaited<ReturnType<CourtApi["getCourtsByCoordsAndDate"]>>["data"]
  >([])

  const [level, setLevel] = useState<number>(5)
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

  useMountCustomButtonEvent("추가", () => {
    if (localToken) {
      router.push("/courts/create")
    } else {
      setIsOpenLeadToLoginModal(true)
    }
  })

  const [snap, setSnap] = useState<number>(1)

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

      const { data } = await courtApi.getCourtsByCoordsAndDate({
        date: getTimezoneDateStringFromDate(selectedDate),
        startLatitude,
        startLongitude,
        endLatitude,
        endLongitude,
        time: "morning",
      })

      setCourts(data)
    },
    [selectedDate]
  )

  const handleZoomIn = useCallback(() => {
    if (map) {
      setLevel(map.getLevel() - 1)
    }
  }, [map])

  const handleZoomOut = useCallback(() => {
    if (map) {
      setLevel(map.getLevel() + 1)
    }
  }, [map])

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
    },
    [restoreCourts, router]
  )

  const handleChangeSnap = useCallback((snap: number) => {
    setSnap(snap)
  }, [])

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

    if (selectedMarker) {
      searchAddressFromCoords(
        selectedMarker.court.latitude,
        selectedMarker.court.longitude
      )
    }
  }, [selectedMarker])

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
  }, [map, fetchCourtsByBoundsAndDatetime, center, authProps.favorites])

  useEffect(() => {}, [])

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
        level={level}
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

      <ModalSheet isOpen={isOpen} onClose={onClose} onSnap={handleChangeSnap}>
        {selectedMarker && (
          <ModalContentContainer>
            <Spacer gap="xs" type="vertical">
              <CourtItem.Header>{selectedMarker.court.name}</CourtItem.Header>
              <CourtItem.Address>{address}</CourtItem.Address>
            </Spacer>
            <ReservationCount block strong size="lg">
              {selectedMarker.reservationMaxCount} 명
            </ReservationCount>
            <Actions gap="xs">
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
                  href={{
                    pathname: `/courts/[courtId]/[date]`,
                    query: {
                      timeSlot: "morning",
                    },
                  }}
                  as={`/courts/${
                    selectedMarker.court.id
                  }/${getTimezoneDateStringFromDate(selectedDate)}`}
                  passHref
                >
                  <a style={{ flex: 1, display: "flex" }}>
                    <Button size="lg" style={{ flex: 1 }}>
                      예약하기
                    </Button>
                  </a>
                </Link>
              ) : (
                <Link href={"/login"} passHref>
                  <a style={{ flex: 1, display: "flex" }}>
                    <Button size="lg" style={{ flex: 1 }}>
                      로그인하고 예약하기
                    </Button>
                  </a>
                </Link>
              )}
            </Actions>

            {snap === 0 ? (
              <>
                <div>농구장 사진</div>
                <div
                  style={{
                    width: "100%",
                    height: 200,
                    backgroundColor: "orange",
                  }}
                >
                  농구장 사진사진
                </div>

                <div>코트 바닥 정보</div>
                <div>고무고무</div>
              </>
            ) : null}
          </ModalContentContainer>
        )}
      </ModalSheet>

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

const ModalContentContainer = styled.div`
  margin: 0 20px;
  margin-top: 10px;
`

const ReservationCount = styled(Text)`
  color: ${({ theme }) => theme.previousTheme.colors.gray800};
  margin-top: ${({ theme }) => theme.previousTheme.gaps.md};
`
