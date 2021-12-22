import { Button } from "@components/base";
import styled from "@emotion/styled";
import Modal from "../Modal";

interface Props {
  visible: boolean;
  onClose: () => void;
  onDecideBall: (hasBall: boolean) => void;
}

const HasBallDecisionModal = ({ visible, onClose, onDecideBall }: Props) => (
  <Modal visible={visible} onClose={onClose}>
    <Modal.Header>농구공을 가지고 예약에 참여하시나요?</Modal.Header>
    <Modal.BottomButtonContainer>
      <ConfirmButton secondary size="lg" onClick={() => onDecideBall(false)}>
        아니오
      </ConfirmButton>
      <ConfirmButton size="lg" onClick={() => onDecideBall(true)}>
        네, 농구공을
        <br />
        가져갑니다
      </ConfirmButton>
    </Modal.BottomButtonContainer>
  </Modal>
);

export default HasBallDecisionModal;

const ConfirmButton = styled(Button)`
  flex: 1;
  padding: ${({ theme }) => theme.gaps.xs};
  box-sizing: content-box;
  line-height: 1.3;
`;
