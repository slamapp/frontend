import { ReactChild } from "react";
import styled from "@emotion/styled";
import Sheet from "react-modal-sheet";

interface Props {
  children: ReactChild;
  onClose: () => void;
  isOpen: boolean;
}

const CustomSheet = styled(Sheet)`
  z-index: 1 !important;
  .react-modal-sheet-container {
    max-width: 640px;
    right: 0;
    margin: auto;
  }
  .react-modal-sheet-content {
    text-align: center;
  }
`;

const ModalSheet: React.FC<Props> = ({ isOpen = true, onClose, children }) => {
  return (
    <CustomSheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={[600 + 56, 300 + 56]}
      initialSnap={1}
    >
      <Sheet.Container>
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
    </CustomSheet>
  );
};

export default ModalSheet;
