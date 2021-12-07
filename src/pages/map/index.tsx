import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useCallback, useEffect, useMemo } from "react";

import KakaoMap from "@components/KakaoMap";
import { getCurrentLocation } from "@utils/geolocation";
import { useMapContext } from "@contexts/MapProvider";
import { BasketballMarker } from "@components/KakaoMapMarker";
import { ModalSheet } from "@components/base";
import { useNavigationContext } from "@contexts/NavigationProvider";
import { DatePicker, SlotPicker } from "@components/domain";
import { SlotKeyUnion } from "@components/domain/SlotPicker/types";
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
    name: "한나 농구장",
    position: [37.53526455544585, 126.90261795958715],
    number: 6,
  },
  {
    name: "헤이헤이 농구장",
    position: [37.538227498425, 126.902404444577],
    number: 3,
  },
  {
    name: "플로라로라 농구장",
    position: [37.5347279, 126.9033882],
    number: 0,
  },
  {
    name: "젤리젤리 농구장",
    position: [37.5347279, 126.9023882],
    number: 10,
  },
];

const Map: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.MAP);

  const { map } = useMapContext();

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    return date;
  }, []);

  const [mapOptions, setMapOptions] = useState<{
    level: number;
    center: Coord | undefined;
  }>({
    level: 3,
    center: undefined,
  });

  const [selectedDateAndSlot, setSelectedDateAndSlot] = useState<{
    selectedDate: Date;
    selectedSlot: SlotKeyUnion;
  }>(() => ({ selectedDate: today, selectedSlot: getSlotFromDate(today) }));

  // TODO: API 명세 나올 경우 any 수정해주기
  const [selectedCourt, setSelectedCourt] = useState<any>();
  const [isAddressLoading, setIsAddressLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    setMapOptions((prev) => ({
      ...prev,
      level: prev.level - 1,
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setMapOptions((prev) => ({
      ...prev,
      level: prev.level + 1,
    }));
  }, []);

  const handleChangeSlot = useCallback((e) => {
    setSelectedDateAndSlot((prev) => ({
      ...prev,
      selectedSlot: e.target.value,
    }));
  }, []);

  const handleDateClick = useCallback((selectedDate: Date) => {
    setSelectedDateAndSlot((prev) => ({
      ...prev,
      selectedDate,
    }));
  }, []);

  const handleMarkerClick = useCallback((court: any) => {
    setIsOpen(true);
    searchAddrFromCoords(court.position);
    setSelectedCourt(court);
  }, []);

  const handleInitCenter = useCallback(() => {
    getCurrentLocation(([latitude, longitude]) => {
      setMapOptions((prev) => ({
        ...prev,
        center: [latitude, longitude],
      }));
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
        selectedDate={selectedDateAndSlot.selectedDate}
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
      <SlotPicker
        selectedSlot={selectedDateAndSlot.selectedSlot}
        onChange={handleChangeSlot}
      />
      {mapOptions.center ? (
        <KakaoMap
          level={mapOptions.level}
          center={mapOptions.center}
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

      <ModalSheet isOpen={isOpen} onClose={onClose}>
        {isAddressLoading ? (
          <div>로딩중...</div>
        ) : (
          <>
            <div>{selectedCourt?.name}</div>
            <div>{selectedCourt?.address}</div>
            <div>{selectedCourt?.number}</div>
            <button type="button">즐겨찾기</button>
            <Link href="/chats" passHref>
              <button type="button">채팅방</button>
            </Link>
            <button type="button">공유하기</button>
            <Link href="/reserve" passHref>
              <button type="button">참여하기</button>
            </Link>
          </>
        )}
      </ModalSheet>
    </>
  );
};

export default Map;
