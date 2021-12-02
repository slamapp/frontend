import { NextPage } from "next";
import Script from "next/script";
import { useState } from "react";
import KakaoMap from "@components/KakaoMap";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map: NextPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedCourt, setSelectedCourt] = useState<any>();

  return (
    <>
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=4e0c821163e2de09042a77b3ff837910&autoload=false`}
      />
      <KakaoMap
        onMarkerClick={(court: any) => {
          setVisible(true);
          setSelectedCourt(court);
        }}
      />

      {visible ? (
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
