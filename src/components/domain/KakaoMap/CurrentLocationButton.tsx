import { MouseEvent } from "react";
import * as S from "./style";

interface Props {
  onGetCurrentLocation: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CurrentLocationButton: React.FC<Props> = ({ onGetCurrentLocation }) => (
  <S.PositionAction>
    <S.MapIconButton
      name="crosshair"
      type="button"
      iconColor="#6B94E5"
      onClick={onGetCurrentLocation}
    />
  </S.PositionAction>
);

export default CurrentLocationButton;
