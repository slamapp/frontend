import { useCallback, useEffect, useMemo } from "react";
import { useAuthContext } from "~/contexts/hooks";
import type { APICourt } from "~/domainTypes/tobe";

interface Props {
  map: kakao.maps.Map;
  court: APICourt;
  reservationMaxCourt: number;
  onClick: (court: any) => void;
}

const PAUSE_COURT_NUMBER = 0;
const FIRE_COURT_NUMBER = 6;

const BasketballMarker = ({
  map,
  court,
  reservationMaxCourt,
  onClick,
}: Props): JSX.Element => {
  const { authProps } = useAuthContext();
  const { favorites, reservations } = authProps.currentUser;

  const marker = useMemo(() => {
    return new kakao.maps.Marker({
      position: new kakao.maps.LatLng(0, 0),
      clickable: true,
      title: court.name,
    });
  }, []);

  const handleClick = useCallback(() => {
    onClick(court);
  }, [court, onClick]);

  useEffect(() => {
    if (map) {
      let imageSrc = "/assets/basketball/animation_off_400.png";

      const isReservatedCourt = reservations.some(
        ({ court: { id } }) => id === court.id
      );
      const isFavoritedCourt = favorites.some(
        ({ court: { id } }) => id === court.id
      );

      if (isFavoritedCourt) {
        imageSrc = "/assets/basketball/animation_off_favorited.png";
      }

      if (
        reservationMaxCourt > PAUSE_COURT_NUMBER &&
        reservationMaxCourt < FIRE_COURT_NUMBER
      ) {
        if (isReservatedCourt && isFavoritedCourt) {
          imageSrc = "/assets/basketball/fire_off_all_tagged.gif";
        } else if (isReservatedCourt) {
          imageSrc = "/assets/basketball/fire_off_reservated.gif";
        } else if (isFavoritedCourt) {
          imageSrc = "/assets/basketball/fire_off_favorited.gif";
        } else {
          imageSrc = "/assets/basketball/fire_off_400.gif";
        }
      }

      if (reservationMaxCourt >= FIRE_COURT_NUMBER) {
        if (isReservatedCourt && isFavoritedCourt) {
          imageSrc = "/assets/basketball/fire_on_all_tagged.gif";
        } else if (isReservatedCourt) {
          imageSrc = "/assets/basketball/fire_on_reservated.gif";
        } else if (isFavoritedCourt) {
          imageSrc = "/assets/basketball/fire_on_favorited.gif";
        } else {
          imageSrc = "/assets/basketball/fire_on_400.gif";
        }
      }

      const imageSize = new kakao.maps.Size(80, 150);

      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, {
        offset: new kakao.maps.Point(35, 35),
        spriteOrigin: new kakao.maps.Point(5, 90),
        shape: "circle",
      });

      const markerPosition = new kakao.maps.LatLng(
        court.latitude,
        court.longitude
      );

      marker.setImage(markerImage);
      marker.setPosition(markerPosition);
      marker.setMap(map);

      // TODO: remove Event Listner를 위한 wrapping 또는 정보 저장 필요
      kakao.maps.event.addListener(marker, "click", handleClick);
    }

    return () => {
      kakao.maps.event.removeListener(marker, "click", handleClick);
      marker.setMap(null);
    };
  }, [map, court, handleClick, marker]);

  // TODO: 일단 반환 해놓은 더미 없애기
  return <div></div>;
};

export default BasketballMarker;
