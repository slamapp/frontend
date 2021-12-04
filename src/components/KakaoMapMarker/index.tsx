import { useEffect } from "react";

interface Props {
  map: kakao.maps.Map;
  court: any; // 추후 API 명세 나오면 수정 예정
  onClick: (court: any) => void;
}

const PAUSE_COURT_NUMBER = 0;
const FIRE_COURT_NUMBER = 6;

const KakaoMapMarker = ({ map, court, onClick }: Props): JSX.Element => {
  useEffect(() => {
    if (map) {
      let imageSrc = "/assets/basketball-transparent.gif";
      imageSrc =
        court.number === PAUSE_COURT_NUMBER
          ? "/assets/basketball-pause.png"
          : imageSrc;
      imageSrc =
        court.number >= FIRE_COURT_NUMBER
          ? "/assets/basketball-fire.gif"
          : imageSrc;
      const imageSize = new kakao.maps.Size(64, 69);
      const imageOption = { offset: new kakao.maps.Point(27, 69) };

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      const markerPosition = new kakao.maps.LatLng(
        court.position[0],
        court.position[1]
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
        clickable: true,
      });

      marker.setMap(map);

      // TODO: remove Event Listner를 위한 wrapping 또는 정보 저장 필요
      kakao.maps.event.addListener(marker, "click", () => {
        onClick(court);
      });
    }
  }, [map, court, onClick]);

  // TODO: 일단 반환 해놓은 더미 없애기
  return <div></div>;
};

export default KakaoMapMarker;
