import * as S from "./style";
import { ActionTimeBlockUnitProps } from "./type";
import Hour from "./Hour";

const ActionTimeBlockUnit: React.FC<ActionTimeBlockUnitProps> = ({
  height,
  rowRef,
  previous,
  next,
}) => (
  <S.TimeBlockUnitWrapper
    height={height}
    isEven={next}
    previous={previous}
    next={next}
  >
    {next ? (
      <S.HourColumn className="time-block__hour">
        <Hour hour={24} />
      </S.HourColumn>
    ) : (
      <S.OneSixthColumn ref={rowRef} />
    )}
    <S.FourSixthColumn className="time-block__action">
      <div>{previous ? "이전으로 가기" : "다음으로 가기"}</div>
    </S.FourSixthColumn>
    <S.VerticalDivider />
    <S.OneSixthColumn className="time-block__action" />
  </S.TimeBlockUnitWrapper>
);

export default ActionTimeBlockUnit;
