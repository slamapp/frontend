import { useState, useCallback, useEffect, useMemo } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { getCurrentLocation } from "@utils/geolocation";
import { ModalSheet } from "@components/base";
import {
  DatePicker,
  SlotPicker,
  BasketballMarker,
  KakaoMap,
  SlotKeyUnion,
} from "@components/domain";
import { useMapContext, useNavigationContext } from "@contexts/hooks";
import type { Coord } from "../../types/map";

declare global {
  interface Window {
    kakao: any;
  }
}

// TODO: 노체와 중복되는 타입 공통화해서 중복 줄이기
interface Geocoder extends kakao.maps.services.Geocoder {
  coord2Address: (
    latitude: number,
    longitude: number,
    callback?: (result: any, status: any) => void
  ) => string;
  addressSearch: (
    address: string,
    callback?: (result: any, status: any) => void
  ) => void;
}

const getSlotFromDate = (date: Date): SlotKeyUnion => {
  const hour = date.getHours();
  let slot = "" as SlotKeyUnion;

  if (hour < 6) {
    slot = "dawn";
  } else if (hour < 12) {
    slot = "morning";
  } else if (hour < 18) {
    slot = "afternoon";
  } else if (hour <= 23) {
    slot = "night";
  }

  return slot;
};

const dummyBasketballCourts = [
  {
    courtId: 6,
    name: "한나 농구장",
    position: [37.53526455544585, 126.90261795958715],
    number: 6,
  },
  {
    courtId: 3,
    name: "헤이헤이 농구장",
    position: [37.538227498425, 126.902404444577],
    number: 3,
  },
  {
    courtId: 0,
    name: "플로라로라 농구장",
    position: [37.5347279, 126.9033882],
    number: 0,
  },
  {
    courtId: 10,
    name: "젤리젤리 농구장",
    position: [37.5347279, 126.9023882],
    number: 10,
  },
];

const Courts: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.MAP);
  const { map } = useMapContext();

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    return date;
  }, []);

  const [level, setLevel] = useState<number>(3);
  const [center, setCenter] = useState<Coord>();

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedSlot, setSelectedSlot] = useState<SlotKeyUnion>(() =>
    getSlotFromDate(today)
  );

  // TODO: API 명세 나올 경우 any 수정해주기
  const [selectedCourt, setSelectedCourt] = useState<any>();
  const [isAddressLoading, setIsAddressLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [snap, setSnap] = useState<number>(1);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // TODO: 노체 코드와 동일한 부분 중복 줄이기, hooks로 빼기
  const searchAddrFromCoords = ([latitude, longitude]: Coord) => {
    const geocoder = new kakao.maps.services.Geocoder();

    setIsAddressLoading(true);

    const callback = (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        // 도로명 주소
        if (result[0].road_address) {
          setSelectedCourt((prev: any) => ({
            ...prev,
            address: result[0].road_address.address_name,
          }));
        }
        // 법정 주소
        else if (result[0].address.address_name) {
          setSelectedCourt((prev: any) => ({
            ...prev,
            address: result[0].address.address_name,
          }));
        }
        // 주소가 없는 경우
        else {
          setSelectedCourt((prev: any) => ({
            ...prev,
            address: "주소가 존재하지 않습니다.",
          }));
        }
      }

      setIsAddressLoading(false);
    };

    (geocoder as Geocoder).coord2Address(longitude, latitude, callback);
  };

  const handleChangedMapBounds = useCallback((map: kakao.maps.Map) => {
    const bounds = map.getBounds();
    // const swLatlng = bounds.getSouthWest();
    // const neLatLng = bounds.getNorthEast();

    // TODO: map의 bounds를 전달하여 api 콜하기
    console.log(bounds);
  }, []);

  const handleZoomIn = useCallback(() => {
    setLevel((level) => level - 1);
  }, []);

  const handleZoomOut = useCallback(() => {
    setLevel((level) => level + 1);
  }, []);

  const handleChangeSlot = useCallback((e) => {
    setSelectedSlot(e.target.value);
  }, []);

  const handleDateClick = useCallback((selectedDate: Date) => {
    setSelectedDate(selectedDate);
  }, []);

  const handleMarkerClick = useCallback((court: any) => {
    setIsOpen(true);
    searchAddrFromCoords(court.position);
    setSelectedCourt(court);
  }, []);

  const handleChangeSnap = useCallback((snap: number) => {
    setSnap(snap);
  }, []);

  const handleInitCenter = useCallback(() => {
    getCurrentLocation(([latitude, longitude]) => {
      setCenter([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    handleInitCenter();
  }, [handleInitCenter]);

  return (
    <>
      <Head>
        <title>탐색 | Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      <DatePicker
        startDate={today}
        selectedDate={selectedDate}
        onClick={handleDateClick}
      />
      <button type="button" onClick={handleInitCenter}>
        현재 내 위치 받아오기
      </button>
      <button type="button" onClick={handleZoomIn}>
        확대(줌 레벨 -1)
      </button>
      <button type="button" onClick={handleZoomOut}>
        축소(줌 레벨 +1)
      </button>
      <SlotPicker selectedSlot={selectedSlot} onChange={handleChangeSlot} />
      {center ? (
        <KakaoMap
          level={level}
          center={center}
          onDragEnd={handleChangedMapBounds}
        >
          {map &&
            dummyBasketballCourts.map((court, i) => (
              <BasketballMarker
                key={i}
                map={map}
                court={court}
                onClick={handleMarkerClick}
              />
            ))}
        </KakaoMap>
      ) : (
        <div>현재 위치를 받아오는 중입니다.</div>
      )}

      <ModalSheet isOpen={isOpen} onClose={onClose} onSnap={handleChangeSnap}>
        {isAddressLoading ? (
          <div>로딩중...</div>
        ) : (
          <>
            <div>{selectedCourt?.name}</div>
            <div>{selectedCourt?.address}</div>
            <div>{selectedCourt?.number}</div>
            <button type="button">즐겨찾기</button>
            <Link href={`/chatroom/court/${selectedCourt?.courtId}`} passHref>
              <button type="button">채팅방</button>
            </Link>
            <button type="button">공유하기</button>
            <Link href="/reserve" passHref>
              <button type="button">참여하기</button>
            </Link>

            {snap === 0 ? (
              <>
                <div>농구장 사진</div>
                <div
                  style={{
                    width: "80%",
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
          </>
        )}
      </ModalSheet>
    </>
  );
};

export default Courts;
