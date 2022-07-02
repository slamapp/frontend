import { useMemo } from "react"
import styled from "@emotion/styled"
import dayjs from "dayjs"
import { DayOfTheWeek } from "~/components/domains"
import { Spacer, Text } from "~/components/uis/atoms"
import { week } from "~/utils/date"

interface Props {
  startDatetime: string
  endDatetime: string
}

const Datetime: React.FC<Props> = ({ startDatetime, endDatetime }) => {
  const startDate = useMemo(() => dayjs(startDatetime), [startDatetime])
  const endDate = useMemo(() => dayjs(endDatetime), [endDatetime])

  return (
    <S.SubHeaderArea>
      <Spacer gap="xxs" type="horizontal">
        <Text strong>
          {startDate.format("YYYY년 MM월 DD일")} (
          <DayOfTheWeek index={startDate.day()}>
            {week[startDate.day()]}
          </DayOfTheWeek>
          )
        </Text>
        <Text strong>
          {startDate.format("HH:mm")} - {endDate.format("HH:mm")}
        </Text>
      </Spacer>
    </S.SubHeaderArea>
  )
}

export default Datetime

const S = {
  SubHeaderArea: styled.div`
    height: 50px;
  `,
}
