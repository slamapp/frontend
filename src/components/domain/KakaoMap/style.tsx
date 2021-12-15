import { IconButton } from "@components/base";
import styled from "@emotion/styled";

const PositionAction = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
  z-index: 10;
`;

const MapIconButton = styled(IconButton)`
  padding: ${({ theme }) => theme.gaps.xs};
  border: none;
  border-radius: 0;
`;

const ZoomActions = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  right: 12px;
  bottom: 170px;
  z-index: 10;

  button:first-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  }
`;

export { PositionAction, MapIconButton, ZoomActions };
