import React from "react"
import * as S from "./style"

interface Props {
  onZoomIn: () => void
  onZoomOut: () => void
  bottom?: number
}

const ZoomButton = ({ onZoomIn, onZoomOut, bottom }: Props) => (
  <S.ZoomActions bottom={bottom}>
    <S.MapIconButton type="button" name="plus" onClick={onZoomIn} />
    <S.MapIconButton type="button" name="minus" onClick={onZoomOut} />
  </S.ZoomActions>
)

export default ZoomButton
