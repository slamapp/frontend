import * as S from "./style";
import { ActionTimeBlockUnitProps } from "../type";
import Hour from "./Hour";

const ActionTimeBlockUnit: React.FC<ActionTimeBlockUnitProps> = ({
  height,
  rowRef,
  previous,
  next,
  disabled,
}) => (
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
        <S.NavigationBlock>
          {previous ? "전 날 예약 보기" : "다음 날 예약보기"}
        </S.NavigationBlock>
      )}
    </S.FourSixthColumn>
    <S.VerticalDivider />
    <S.OneSixthColumn className="time-block__action" />
  </S.TimeBlockUnitWrapper>
);

export default ActionTimeBlockUnit;
