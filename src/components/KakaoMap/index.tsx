import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_POSITION, getCurrentLocation } from "@utils/geolocation";
import KakaoMapMarker from "@components/KakaoMapMarker";
import { Coord } from "../../types/map";
import useKakaoMapEvent from "./useKakaoMapEvent";

declare global {
  interface Window {
    kakao: any;
  }
}

const dummyBasketballCourts = [
  {
    name: "한나 농구장",
    address: "한나시 한나구 한나동 한나번지 한나",
    position: [37.53526455544585, 126.90261795958715],
  },
  {
    name: "헤이헤이 농구장",
    address: "서울 영등포구 노들로 221",
    position: [37.5359439, 126.9023724],
  },
  {
    name: "플로라로라 농구장",
    address: "서울 영등포구 당산로47길 19",
    position: [37.5347279, 126.9033882],
  },
  {
    name: "젤리젤리 농구장",
    address: "서울 영등포구 당산로48길 11",
    position: [37.5347279, 126.9023882],
  },
];

const KakaoMap = (): JSX.Element => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const mapRef = useRef<HTMLDivElement>(null);

  const handleBoundChanged = (target: kakao.maps.Map) => {
    const bounds = target.getBounds();

    // 영역 정보의 남서쪽 정보를 얻어옵니다
    const swLatlng = bounds.getSouthWest();

    // 영역 정보의 북동쪽 정보
    const neLatlng = bounds.getNorthEast();

    let message = `<p>영역좌표는 남서쪽 위도, 경도는  ${swLatlng.toString()}이고 <br>`;
    message += `북동쪽 위도, 경도는  ${neLatlng.toString()}입니다 </p>`;

    const resultDiv = document.getElementById("result");
    resultDiv!.innerHTML = message;
  };

  // TODO: 현재 위치를 받아오는 연산이 느릴 때가 있어서 로딩 처리 필요할 수 있음
  const handleChangeCenterPosition = useCallback(() => {
    getCurrentLocation(([latitude, longitude]: Coord) => {
      if (map) {
        map.setCenter(new kakao.maps.LatLng(latitude, longitude));
      }
    });
  }, [map]);

  const handleZoomIn = useCallback(() => {
    if (map) {
      const level = map.getLevel();
      map.setLevel(level - 1);
    }
  }, [map]);

  const handleZoomOut = useCallback(() => {
    if (map) {
      const level = map.getLevel();
      map.setLevel(level + 1);
    }
  }, [map]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(...DEFAULT_POSITION),
        level: 3,
      };

      getCurrentLocation(([latitude, longitude]: Coord) => {
        const newMap = new window.kakao.maps.Map(mapRef.current, options);
        newMap.setCenter(new kakao.maps.LatLng(latitude, longitude));
        setMap(newMap);
      });
    });
  }, []);

  useKakaoMapEvent(map, "bounds_changed", handleBoundChanged);

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
      <div ref={mapRef} style={{ width: "80vw", height: "60vh" }}>
        현재 위치를 받아오는 중입니다.
      </div>
      <div id="result"></div>
      {dummyBasketballCourts.map((court) => (
        <KakaoMapMarker key={court.name} map={map} court={court} />
      ))}
    </>
  );
};

export default KakaoMap;
