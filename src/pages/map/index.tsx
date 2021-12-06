import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";

import KakaoMap from "@components/KakaoMap";
import { getCurrentLocation, DEFAULT_POSITION } from "@utils/geolocation";
import { useMapContext } from "@contexts/MapProvider";
import { BasketballMarker } from "@components/KakaoMapMarker";
import { ModalSheet } from "@components/base";
import { useNavigationContext } from "@contexts/NavigationProvider";
import { DatePicker } from "@components/domain";
import { Coord } from "../../types/map";

declare global {
  interface Window {
    kakao: any;
  }
}

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

const Map: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.MAP);

  const { map } = useMapContext();

  const [level, setLevel] = useState<number>(3);
  const [center, setCenter] = useState<Coord>(DEFAULT_POSITION);
  const [selectedCourt, setSelectedCourt] = useState<any>();
  const [isAddressLoading, setIsAddressLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return today;
  });

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

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

  const handleMarkerClick = useCallback((court: any) => {
    setIsOpen(true);
    searchAddrFromCoords(court.position);
    setSelectedCourt(court);
  }, []);

  const handleGetMapCenter = useCallback((map: kakao.maps.Map) => {
    const bounds = map.getBounds();
    const swLatlng = bounds.getSouthWest();

    // NOTE 추후에 필요할 때 로그를 setter로 대체할 수 있음s
    console.log([swLatlng.getLat(), swLatlng.getLng()]);
  }, []);

  const handleZoomIn = useCallback(() => {
    setLevel((level) => level - 1);
  }, []);

  const handleZoomOut = useCallback(() => {
    setLevel((level) => level + 1);
  }, []);

  const handleInitCenter = useCallback(() => {
    getCurrentLocation(([latitude, longitude]) => {
      setCenter([latitude, longitude]);
    });
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    handleInitCenter();
  }, [handleInitCenter]);

  const onClickDate = useCallback((date: Date) => {
    console.log(date.getTime());
    setSelectedDate(date);
  }, []);

  return (
    <>
      <Head>
        <title>탐색 | Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      <DatePicker selectedDate={selectedDate} onClick={onClickDate} />\
      <button type="button" onClick={handleInitCenter}>
        현재 내 위치 받아오기
      </button>
      <button type="button" onClick={handleZoomIn}>
        확대(줌 레벨 -1)
      </button>
      <button type="button" onClick={handleZoomOut}>
        축소(줌 레벨 +1)
      </button>
      <KakaoMap level={level} center={center} onDragEnd={handleGetMapCenter}>
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
