import type { ChangeEvent } from "react";
import { Radio } from "@components/base";
import type { SlotValueUnion, SlotKeyUnion } from "@enums/timeSlotType";

export const slotItems: {
  value: SlotKeyUnion;
  text: SlotValueUnion;
}[] = [
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

interface SlotPickerProps {
  selectedSlot: SlotKeyUnion;
  className?: string;
  currentDateTimeSlot: SlotKeyUnion | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlotPicker: React.FC<SlotPickerProps> = ({
  selectedSlot,
  className,
  onChange,
  currentDateTimeSlot,
}) => {
  const limit = slotItems.findIndex(
    ({ value }) => value === currentDateTimeSlot
  );

  return (
    <Radio.Group onChange={onChange} className={className}>
      {slotItems.map(({ text, value }, index) => (
        <Radio.Item
          key={value}
          text={text}
          value={value}
          checked={selectedSlot === value}
          disabled={index < limit}
        />
      ))}
    </Radio.Group>
  );
};

export default SlotPicker;
