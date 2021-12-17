import { Button } from "@components/base";
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
      <Button
        style={{ flex: 1 }}
        secondary
        size="lg"
        onClick={() => onDecideBall(false)}
      >
        아니오
      </Button>
      <Button style={{ flex: 1 }} size="lg" onClick={() => onDecideBall(true)}>
        네, 농구공을 가져갑니다
      </Button>
    </Modal.BottomButtonContainer>
  </Modal>
);

export default HasBallDecisionModal;
