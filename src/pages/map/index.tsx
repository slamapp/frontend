import { NextPage } from "next";
import { useState, useCallback, useEffect } from "react";
import KakaoMap from "@components/KakaoMap";
import { getCurrentLocation, DEFAULT_POSITION } from "@utils/geolocation";
import GeneralMarker from "@components/KakaoMapMarker/GeneralMarker";
import { Coord } from "../../types/map";

declare global {
  interface Window {
    kakao: any;
  }
}

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
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedCourt, setSelectedCourt] = useState<any>();
  const [isAddressLoading, setIsAddressLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(3);
  const [center, setCenter] = useState<Coord>(DEFAULT_POSITION);
  const [position, setPosition] = useState<Coord>();

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

  const handleMarkerClick = (court: any) => {
    setVisible(true);
    searchAddrFromCoords(court.position);
    setSelectedCourt(court);
  };

  const handleChangeCenterPosition = useCallback(() => {
    getCurrentLocation(([latitude, longitude]) => {
      setCenter([latitude, longitude]);
    });
  }, []);

  const handleGetMapCenter = useCallback((map: kakao.maps.Map) => {
    const bounds = map.getBounds();
    const swLatlng = bounds.getSouthWest();
    // cons neLatlng = bounds.getNorthEast();

    console.log([swLatlng.getLat(), swLatlng.getLng()]);
  }, []);

  const onClick = (
    _: kakao.maps.Map,
    mouseEvent: kakao.maps.event.MouseEvent
  ) => {
    // 클릭한 위도, 경도 정보를 가져옵니다
    const latlng = mouseEvent.latLng;

    if (latlng) {
      console.log(
        `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`
      );
      setPosition([latlng.getLat(), latlng.getLng()]);
    }
  };

  const handleZoomIn = useCallback(() => {
    setLevel((level) => level - 1);
  }, []);

  const handleZoomOut = useCallback(() => {
    setLevel((level) => level + 1);
  }, []);

  useEffect(() => {
    handleChangeCenterPosition();
  }, [handleChangeCenterPosition]);

  return (
    <>
      <button type="button" onClick={handleChangeCenterPosition}>
        현재 내 위치 받아오기
      </button>
      <button type="button" onClick={handleZoomIn}>
        확대(줌 레벨 -1)
      </button>
      <button type="button" onClick={handleZoomOut}>
        축소(줌 레벨 +1)
      </button>
      <KakaoMap
        level={level}
        center={center}
        onClick={onClick}
        onDragEnd={handleGetMapCenter}
        position={position}
      />

      {isAddressLoading ? <div>로딩중...</div> : null}
      {!isAddressLoading && visible ? (
        <>
          <div>{selectedCourt?.name}</div>
          <div>{selectedCourt?.address}</div>
          <div>{selectedCourt?.number}</div>
        </>
      ) : null}
    </>
  );
};

export default Map;
