import styled from "@emotion/styled"
import { IconButton } from "~/components/uis/molecules"

interface Props {
  onZoomIn: () => void
  onZoomOut: () => void
  bottom?: number
}

const ZoomButton = ({ onZoomIn, onZoomOut, bottom }: Props) => (
  <ZoomActions bottom={bottom}>
    <IconButton type="button" name="plus" onClick={onZoomIn} />
    <IconButton type="button" name="minus" onClick={onZoomOut} />
  </ZoomActions>
)

export default ZoomButton

const ZoomActions = styled.div<{ bottom?: number }>`
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  right: 12px;
  bottom: ${({ bottom }) => (bottom ? `${bottom + 230}px` : "230px")};
  z-index: 10;

  button:first-of-type {
    border-bottom: 1px solid
      ${({ theme }) => theme.previousTheme.colors.gray200};
  }
`
