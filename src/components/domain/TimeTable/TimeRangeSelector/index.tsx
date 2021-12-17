import * as S from "./style";

interface Props {
  unit: number;
  startIndex: number;
  endIndex: number;
}

const RangeSelector: React.FC<Props> = ({ unit, startIndex, endIndex }) => {
  return (
    <>
      <S.StartRangeSelector
        style={{
          width: unit * 4,
          position: "absolute",
          left: unit,
          // TODO: wrapper 추가
          top: unit * (startIndex + 1) - 23,
        }}
      />
      {endIndex && (
        <>
          <div
            style={{
              position: "absolute",
              left: unit,
              top: unit * (startIndex + 1) - 3,
              height: unit * (endIndex + 2) - unit * (startIndex + 1) + 6,
              width: 8,
              backgroundColor: "black",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              left: unit * 5 - 8,
              top: unit * (startIndex + 1) - 3,
              height: unit * (endIndex + 2) - unit * (startIndex + 1) + 6,
              width: 8,
              backgroundColor: "black",
            }}
          ></div>
          <S.EndRangeSelector
            style={{
              width: unit * 4,
              position: "absolute",
              left: unit,
              top: unit * (endIndex + 2),
            }}
          />
        </>
      )}
    </>
  );
};

export default RangeSelector;
