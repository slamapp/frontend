import KakaoMap from "@components/KakaoMap";
import { NextPage } from "next";
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map: NextPage = () => (
  <>
    <Script
      strategy="beforeInteractive"
      type="text/javascript"
      src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_KEY}&autoload=false`}
    />
    <KakaoMap />
  </>
);

export default Map;
