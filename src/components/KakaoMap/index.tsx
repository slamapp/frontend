import { useEffect, useRef, useState } from "react";
import useKakaoMapEvent from "./useKakaoMapEvent";

declare global {
  interface Window {
    kakao: any;
  }
}

// const setKakaoMapEvent = <T extends kakao.maps.event.EventTarget>(
//   target: T | undefined,
//   type: string,
//   callback: (target: T, ...args: any[]) => void
// ) => {
//     useEffect
// };

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

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap);
    });
  }, []);

  useKakaoMapEvent(map, "bounds_changed", handleBoundChanged);

  return (
    <>
      <div ref={mapRef} id="map" style={{ width: "80vw", height: "60vh" }}>
        지도 페이지
      </div>
      <div id="result"></div>
    </>
  );
};

export default KakaoMap;
