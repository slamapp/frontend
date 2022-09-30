import type { MouseEvent } from "react"
import { css } from "@emotion/react"
import { IconButton } from "~/components/uis/molecules"

interface Props {
  onGetCurrentLocation: (e?: MouseEvent<HTMLButtonElement>) => void
}

const CurrentLocationButton: React.FC<Props> = ({ onGetCurrentLocation }) => (
  <div
    css={css`
      position: absolute;
      top: 15px;
      left: 15px;
      z-index: 10;
    `}
  >
    <IconButton
      name="crosshair"
      type="button"
      iconColor="#6B94E5"
      onClick={onGetCurrentLocation}
      noOutlined
    />
  </div>
)

export default CurrentLocationButton
