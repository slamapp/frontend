import styled from "@emotion/styled";

interface SlotItemProps {
  // TODO: 중복 없애기 (type Slot으로 대체하기)
  value: "dawn" | "morning" | "afternoon" | "night";
  text: "새벽" | "아침" | "낮" | "밤";
  checked: boolean;
}

const StyledRadio = styled.input`
  display: none;

  & + span {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  &:checked + span {
    background-color: black;
    color: white;
  }
`;

const SlotItem: React.FC<SlotItemProps> = ({ value, text, checked }) => {
  return (
    <label style={{ marginRight: 10 }}>
      <StyledRadio type="radio" value={value} checked={checked} />
      <span>{text}</span>
    </label>
  );
};

const slotItems: Pick<SlotItemProps, "value" | "text">[] = [
  {
    value: "dawn",
    text: "새벽",
  },
  {
    value: "morning",
    text: "아침",
  },
  {
    value: "afternoon",
    text: "낮",
  },
  {
    value: "night",
    text: "밤",
  },
];

const SlotPicker: React.FC<any> = ({ selectedSlot, onChange }) => {
  return (
    <div onChange={onChange}>
      {slotItems.map(({ text, value }) => (
        <SlotItem
          key={value}
          text={text}
          value={value}
          checked={selectedSlot === value}
        />
      ))}
    </div>
  );
};

export default SlotPicker;
