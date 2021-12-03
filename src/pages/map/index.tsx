import { NextPage } from "next";
import { useState } from "react";
import KakaoMap from "@components/KakaoMap";
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

  return (
    <>
      <KakaoMap onMarkerClick={handleMarkerClick} />

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
