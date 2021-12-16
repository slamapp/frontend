import { IconButton } from "@components/base";
import React from "react";

interface Props {
  latitude: number;
  longitude: number;
  courtName: string;
}

const KakaoMapButton = ({ latitude, longitude, courtName }: Props) => {
  return (
    <a
      href={`https://map.kakao.com/?urlX=${latitude}&urlY=${longitude}&name=${courtName}`}
      target="_blank"
      rel="noreferrer"
    >
      <IconButton name="map" />
    </a>
  );
};

export default KakaoMapButton;
