import React, { useEffect, useRef, useState } from "react";
import { DEFAULT_POSITION } from "@utils/geolocation";
import GeneralMarker from "@components/KakaoMapMarker/GeneralMarker";
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

interface Props {
  level: number;
  center: Coord;
  onClick: (_: kakao.maps.Map, event: kakao.maps.event.MouseEvent) => void;
  onDragEnd: (_: kakao.maps.Map) => void;
}

const KakaoMap = ({
  level,
  center,
  onClick,
  onDragEnd,
  position,
}: Props): JSX.Element => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (map) {
      map.setCenter(new kakao.maps.LatLng(center[0], center[1]));
    }
  }, [map, center]);

  useEffect(() => {
    if (map) {
      map.setLevel(level);
    }
  }, [map, level]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(...DEFAULT_POSITION),
        level: 3,
      };
      const newMap = new window.kakao.maps.Map(mapRef.current, options);
      setMap(newMap);
    });
  }, []);

  useKakaoMapEvent<kakao.maps.Map>(map, "click", onClick);
  useKakaoMapEvent<kakao.maps.Map>(map, "dragend", onDragEnd);

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }}>
        현재 위치를 받아오는 중입니다.
      </div>
      {position && <GeneralMarker map={map} position={position} />}
    </>
  );
};

export default KakaoMap;
