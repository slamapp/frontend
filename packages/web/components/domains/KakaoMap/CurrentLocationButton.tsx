import type { MouseEvent } from "react"
import styled from "@emotion/styled"
import { IconButton } from "~/components/uis/molecules"

interface Props {
  onGetCurrentLocation: (e?: MouseEvent<HTMLButtonElement>) => void
}

const CurrentLocationButton: React.FC<Props> = ({ onGetCurrentLocation }) => (
  <PositionAction>
    <IconButton
      name="crosshair"
      type="button"
      iconColor="#6B94E5"
      onClick={onGetCurrentLocation}
      noOutlined
    />
  </PositionAction>
)

export default CurrentLocationButton

const PositionAction = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 10;
`
