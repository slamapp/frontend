import { useCallback, useState } from "react"
import styled from "@emotion/styled"
import dayjs from "dayjs"
import { Spacer, Button, Text } from "~/components/uis/atoms"
import { useReservationContext } from "~/contexts/hooks"
import {
  getTimeFromIndex,
  getTimezoneDateStringFromDate,
  week,
} from "~/utils/date"
import { DayOfTheWeek } from ".."
import Modal from "../Modal"

interface Props {
  visible: boolean
  onClose: () => void
  onDecideBall: (hasBall: boolean) => void
}

const steps = {
  CONFIRM_RESERVATION: 1,
  DECIDE_BALL: 2,
}

const HasBallDecisionModal = ({ visible, onClose, onDecideBall }: Props) => {
  const {
    reservation: { courtName, startIndex, endIndex, date },
  } = useReservationContext()

  const [step, setStep] = useState(1)

  const handleClickNext = useCallback(() => {
    setStep((prev) => prev + 1)
  }, [])

  const handleClose = useCallback(() => {
    setStep(1)
    onClose()
  }, [onClose])

  return (
    <Modal visible={visible} onClose={handleClose}>
      <Spacer type="horizontal" gap="xs">
        {step === steps.CONFIRM_RESERVATION && (
          <>
            <Modal.Header strong style={{ paddingBottom: 30 }}>
              예약하시겠습니까?
            </Modal.Header>
            <Content>
              <Spacer type="horizontal" gap="xs">
                <Spacer type="horizontal" gap="xxs">
                  <Label>선택한 농구장</Label>
                  <Text size="lg">{courtName}</Text>
                </Spacer>
                <Spacer type="horizontal" gap="xxs">
                  <Label>선택한 시간</Label>
                  <Spacer
                    type="horizontal"
                    gap="xs"
                    style={{ paddingBottom: 40 }}
                  >
                    <Text size="lg">
                      {getTimezoneDateStringFromDate(
                        dayjs(date),
                        undefined,
                        "YYYY년 MM월 DD일"
                      )}{" "}
                      (
                      <DayOfTheWeek index={dayjs(date).day()} size="lg">
                        {week[dayjs(date).day()]}
                      </DayOfTheWeek>
                      ),
                    </Text>

                    <Text size="lg">{`${getTimeFromIndex(
                      startIndex
                    )} - ${getTimeFromIndex(endIndex + 1)}`}</Text>
                  </Spacer>
                </Spacer>
              </Spacer>
              <Modal.BottomButtonContainer>
                <HalfButton size="lg" secondary onClick={handleClose}>
                  닫기
                </HalfButton>
                <HalfButton size="lg" onClick={handleClickNext}>
                  예약하기
                </HalfButton>
              </Modal.BottomButtonContainer>
            </Content>
          </>
        )}

        {step === steps.DECIDE_BALL && (
          <>
            <Modal.Header>
              <Text block strong>
                농구공을 가져 가시나요?
              </Text>
              <SubText block size="xs">
                * 농구공 유무 선택을 통해 예약이 확정됩니다.
              </SubText>
            </Modal.Header>
            <Spacer type="horizontal" gap="xs">
              <Button size="lg" onClick={() => onDecideBall(true)}>
                네 🏀
              </Button>
              <Button size="lg" onClick={() => onDecideBall(false)}>
                아니오 ❌
              </Button>
            </Spacer>
          </>
        )}
      </Spacer>
    </Modal>
  )
}

export default HasBallDecisionModal

const HalfButton = styled(Button)`
  flex: 1;
  box-sizing: content-box;
  line-height: 1.3;
`

const Label = styled(Text)`
  color: ${({ theme }) => theme.previousTheme.colors.gray700};
  font-size: ${({ theme }) => theme.previousTheme.fontSizes.sm};
`

const SubText = styled(Text)`
  color: ${({ theme }) => theme.previousTheme.colors.gray600};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.previousTheme.gaps.sm};
  margin-bottom: 10px;
`
