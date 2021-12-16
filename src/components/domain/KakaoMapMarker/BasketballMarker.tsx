import { useEffect } from "react";

interface Props {
  map: kakao.maps.Map;
  court: any; // 추후 API 명세 나오면 수정 예정
  onClick: (court: any) => void;
}

const PAUSE_COURT_NUMBER = 0;
const FIRE_COURT_NUMBER = 6;

const BasketballMarker = ({ map, court, onClick }: Props): JSX.Element => {
  useEffect(() => {
    if (map) {
      let imageSrc = "/assets/basketball/fire_off_400.gif";
      imageSrc =
        court.courtReservation === PAUSE_COURT_NUMBER
          ? "/assets/basketball/animation_off_400.png"
          : imageSrc;
      imageSrc =
        court.courtReservation >= FIRE_COURT_NUMBER
          ? "/assets/basketball/fire_on_400.gif"
          : imageSrc;
      const imageSize = new kakao.maps.Size(80, 150);
      const imageOption = {
        offset: new kakao.maps.Point(27, 69),
      };

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      const markerPosition = new kakao.maps.LatLng(
        court.latitude,
        court.longitude
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

export default BasketballMarker;
