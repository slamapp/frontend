import { ChangeEvent } from "react";
import type { SlotValueUnion, SlotKeyUnion } from "./types";
import SlotItem from "./SlotItem";

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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlotPicker: React.FC<SlotPickerProps> = ({ selectedSlot, onChange }) => {
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
