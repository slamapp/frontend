import { ChangeEvent } from "react";
import { Radio } from "@components/base";
import type { SlotValueUnion, SlotKeyUnion } from "./types";

const slotItems: { value: SlotKeyUnion; text: SlotValueUnion }[] = [
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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlotPicker: React.FC<SlotPickerProps> = ({
  selectedSlot,
  className,
  onChange,
}) => {
  return (
    <Radio.Group onChange={onChange} className={className}>
      {slotItems.map(({ text, value }) => (
        <Radio.Item
          key={value}
          text={text}
          value={value}
          checked={selectedSlot === value}
        />
      ))}
    </Radio.Group>
  );
};

export default SlotPicker;
