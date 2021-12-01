import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_POSITION, getCurrentLocation } from "@utils/geolocation";
import { Coord } from "../../types/map";
import useKakaoMapEvent from "./useKakaoMapEvent";

declare global {
  interface Window {
    kakao: any;
  }
}

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
      <div
        ref={mapRef}
        style={{ width: "80vw", height: "60vh", backgroundColor: "gray" }}
      ></div>
      <div id="result"></div>
    </>
  );
};

export default KakaoMap;
