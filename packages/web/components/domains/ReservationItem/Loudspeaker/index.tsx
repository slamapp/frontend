import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { Button } from "~/components/uis"
import { useSocketContext } from "~/contexts/hooks"
import type { APICourt, APIReservation } from "~/types/domains/objects"

const ONE_HOUR_SECONDS = 3600

// 확성기가 켜지기까지 남은 시간?
const getRestTimeBeforeActivate = (startTime: any) => {
  const timeDiff = new Date(startTime).getTime() - new Date().getTime()

  return timeDiff - ONE_HOUR_SECONDS * 1000
}

interface Props {
  startTime: string
  courtId: APICourt["id"]
  reservationId: APIReservation["id"]
}

const Loudspeaker = ({ startTime, courtId, reservationId }: Props) => {
  const { sendLoudSpeaker } = useSocketContext()

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (new Date(startTime).getTime() < new Date().getTime()) {
      setIsActive(false)
    } else {
      const restTIme = getRestTimeBeforeActivate(startTime)

      const timerId = setTimeout(() => {
        setIsActive(true)
      }, restTIme)

      return () => {
        if (timerId) {
          clearTimeout(timerId)
        }
      }
    }
  }, [])

  return (
    <div
      onClick={() => {
        sendLoudSpeaker({ courtId, startTime, reservationId })
      }}
    >
      {isActive ? <StyledButton>🔈</StyledButton> : null}
    </div>
  )
}

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.previousTheme.buttonHeights.lg};
  height: ${({ theme }) => theme.previousTheme.buttonHeights.lg};
  background: ${({ theme }) => theme.previousTheme.colors.activeGradientColor};
`

export default Loudspeaker
