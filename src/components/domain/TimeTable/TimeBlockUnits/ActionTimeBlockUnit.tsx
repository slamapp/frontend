import Link from "next/link";
import { useRouter } from "next/router";
import { getDateStringFromDate } from "@utils/timeTable";
import * as S from "./style";
import { ActionTimeBlockUnitProps } from "../type";
import Hour from "./Hour";

const getNextDay = (date: string) => {
  const currentDate = new Date(date);
  currentDate.setDate(currentDate.getDate() + 1);

  return getDateStringFromDate(currentDate);
};

const getPrevDay = (date: string) => {
  const currentDate = new Date(date);
  currentDate.setDate(currentDate.getDate() - 1);

  return getDateStringFromDate(currentDate);
};

const ActionTimeBlockUnit: React.FC<ActionTimeBlockUnitProps> = ({
  height,
  rowRef,
  previous,
  next,
  disabled,
}) => {
  const {
    query: { courtId, date },
  } = useRouter();

  return (
    <S.TimeBlockUnitWrapper
      height={height}
      isEven={next}
      previous={previous}
      next={next}
      disabled={disabled}
    >
      {next ? (
        <S.HourColumn className="time-block__hour">
          <Hour hour={24} />
        </S.HourColumn>
      ) : (
        <S.OneSixthColumn ref={rowRef} />
      )}
      <S.FourSixthColumn
        className="time-block__action"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!disabled && (
          <Link
            href={`/courts/${courtId}/${
              previous ? getPrevDay(date as string) : getNextDay(date as string)
            }`}
            passHref
          >
            <S.NavigationBlock>
              {previous ? "전 날 예약 보기" : "다음 날 예약보기"}
            </S.NavigationBlock>
          </Link>
        )}
      </S.FourSixthColumn>
      <S.VerticalDivider />
      <S.OneSixthColumn className="time-block__action" />
    </S.TimeBlockUnitWrapper>
  );
};

export default ActionTimeBlockUnit;
