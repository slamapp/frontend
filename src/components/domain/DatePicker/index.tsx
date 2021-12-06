import Flicking from "@egjs/react-flicking";
import styled from "@emotion/styled";
import DateChild from "./Date";

const DAY_RANGE = 14;

const StyledFlicking = styled(Flicking)`
  .flicking-camera {
    display: flex;
  }
`;

const DatePicker: React.FC<any> = ({ onClick, selectedDate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <StyledFlicking moveType="freeScroll" bound={true}>
      {[
        new Date(today),
        ...Array.from(
          { length: DAY_RANGE - 1 },
          () => new Date(today.setDate(today.getDate() + 1))
        ),
      ].map((date, i) => (
        <DateChild
          key={i}
          date={date}
          onClick={onClick}
          selected={date.getTime() === selectedDate.getTime()}
        />
      ))}
    </StyledFlicking>
  );
};

export default DatePicker;
