import React, { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { DEFAULT_POSITION } from "@utils/geolocation";
import { useMapContext } from "@contexts/MapProvider";
import { Coord } from "../../types/map";
import useKakaoMapEvent from "./useKakaoMapEvent";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  level: number;
  center: Coord;
  onClick: (_: kakao.maps.Map, event: kakao.maps.event.MouseEvent) => void;
  onDragEnd: (_: kakao.maps.Map) => void;
  children: ReactNode;
}

const KakaoMap = ({
  level,
  center,
  onClick,
  onDragEnd,
  children,
}: Props): JSX.Element => {
  const { map, handleInitMap } = useMapContext();
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

      handleInitMap(newMap);
    });
  }, [handleInitMap]);

  useKakaoMapEvent<kakao.maps.Map>(map, "click", onClick);
  useKakaoMapEvent<kakao.maps.Map>(map, "dragend", onDragEnd);

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }}>
        현재 위치를 받아오는 중입니다.
        {children}
      </div>
    </>
  );
};

export default KakaoMap;
