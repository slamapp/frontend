import { Button, Text } from "@components/base";
import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";

import { BottomFixedContainer } from "../BottomFixedButton";
import Modal from "../Modal";
import ParticipantsPerTime from "./ParticipantsPerTime";
import SelectedTime from "./SelectedTime";
import * as S from "./style";

interface Props {
  timeSlot: string;
  participantsPerBlock: any[];
  reservationId: number;
  onDeleteReservation: (reservationId: number) => void;
  onStartUpdate: () => void;
  requestDisabled: boolean;
}

const ExistedReservationContent = ({
  timeSlot,
  participantsPerBlock,
  reservationId,
  onDeleteReservation,
  onStartUpdate,
  requestDisabled,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickButton = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onClose = () => setIsModalOpen(false);

  return (
    <>
      <S.ModalContent>
        <SelectedTime timeSlot={timeSlot} />
        <ParticipantsPerTime participantsPerBlock={participantsPerBlock} />
      </S.ModalContent>

      <BottomFixedBackground>
        {!requestDisabled ? (
          <div
            style={{
              margin: "0 auto",
              display: "flex",
              position: "relative",
              width: "100%",
              gap: "10px",
            }}
          >
            <Button
              type="button"
              size="lg"
              onClick={handleClickButton}
              secondary
            >
              예약 취소하기
            </Button>
            <Button type="button" size="lg" onClick={onStartUpdate}>
              예약 수정하기
            </Button>
          </div>
        ) : (
          <Text block style={{ margin: "0 auto" }}>
            예약을 수정 또는 취소할 수 없습니다.
          </Text>
        )}
      </BottomFixedBackground>

      <Modal visible={isModalOpen} onClose={onClose}>
        <Modal.Header>예약을 취소하시겠습니까?</Modal.Header>
        <Modal.BottomButtonContainer>
          <Button style={{ flex: 1 }} secondary size="lg" onClick={onClose}>
            아니오
          </Button>
          <Button
            style={{ flex: 1 }}
            size="lg"
            onClick={() => onDeleteReservation(reservationId)}
          >
            네
          </Button>
        </Modal.BottomButtonContainer>
      </Modal>
    </>
  );
};

export default ExistedReservationContent;

const BottomFixedBackground = styled(BottomFixedContainer)`
  display: flex;
  button:first-of-type {
    border: 2px solid black;
  }
`;
