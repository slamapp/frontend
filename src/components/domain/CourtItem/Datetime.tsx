import { useMemo } from "react";

import { Spacer, Text } from "@components/base";
import { weekdays } from "@utils/date";
import * as S from "./style";

interface Props {
  startDatetime: string;
  endDatetime: string;
}

const Datetime: React.FC<Props> = ({ startDatetime, endDatetime }) => {
  const startDate = useMemo(() => new Date(startDatetime), [startDatetime]);
  const endDate = useMemo(() => new Date(endDatetime), [endDatetime]);

  return (
    <S.SubHeaderArea>
      <Spacer gap="xxs" type="vertical">
        <Text strong>
          {startDate.getFullYear()}년{" "}
          {(startDate.getMonth() + 1).toString().padStart(2, "0")}월{" "}
          {startDate.getDate().toString().padStart(2, "0")}일 (
          <S.DayOfTheWeek index={startDate.getDay()}>
            {weekdays[startDate.getDay()]}
          </S.DayOfTheWeek>
          )
        </Text>
        <Text strong>
          {startDate.getHours().toString().padStart(2, "0")}:
          {startDate.getMinutes().toString().padStart(2, "0")} -{" "}
          {endDate.getHours().toString().padStart(2, "0")}:
          {endDate.getMinutes().toString().padStart(2, "0")}
        </Text>
      </Spacer>
    </S.SubHeaderArea>
  );
};

export default Datetime;
