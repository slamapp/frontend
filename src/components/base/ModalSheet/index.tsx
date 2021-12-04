import { ReactChild } from "react";
import Sheet from "react-modal-sheet";

interface Props {
  children: ReactChild;
  onClose: () => void;
  isOpen: boolean;
}

const ModalSheet = ({
  isOpen = true,
  onClose,
  children,
}: Props): JSX.Element => {
  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={onClose}
        snapPoints={[600, 300]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default ModalSheet;
