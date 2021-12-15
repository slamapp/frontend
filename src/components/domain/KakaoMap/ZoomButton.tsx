import React from "react";

import * as S from "./style";

interface Props {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomButton = ({ onZoomIn, onZoomOut }: Props) => (
  <S.ZoomActions>
    <S.MapIconButton type="button" name="plus" onClick={onZoomIn} />
    <S.MapIconButton type="button" name="minus" onClick={onZoomOut} />
  </S.ZoomActions>
);

export default ZoomButton;
