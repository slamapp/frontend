import { css } from "@emotion/react"
import { IconButton } from "~/components/uis/molecules"
import { useMap } from "../../context"

const ZoomInOut = () => {
  const { map } = useMap()
  const currentLevel = map?.getLevel() || 0

  const handleClickZoomIn = () => {
    if (currentLevel > 1) {
      map?.setLevel(currentLevel - 1, { animate: true })
    }
  }
  const handleClickZoomOut = () => {
    if (currentLevel < 7) {
      map?.setLevel(currentLevel + 1, { animate: true })
    }
  }

  return (
    <div
      css={css`
        position: absolute;
        top: 100px;
        left: 15px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `}
    >
      <IconButton
        name="plus"
        type="button"
        iconColor="#6B94E5"
        onClick={handleClickZoomIn}
        noOutlined
      />
      <IconButton
        name="minus"
        type="button"
        iconColor="#6B94E5"
        onClick={handleClickZoomOut}
        noOutlined
      />
    </div>
  )
}

export default ZoomInOut
