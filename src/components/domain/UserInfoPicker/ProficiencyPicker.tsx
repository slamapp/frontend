import { ChangeEvent } from "react";
import { Radio } from "@components/base";
import { ProficiencyKeyUnion, ProficiencyValueUnion } from "@domainTypes/.";

const proficiencyItems: {
  value: ProficiencyKeyUnion;
  text: ProficiencyValueUnion;
}[] = [
  {
    value: "BEGINNER",
    text: "뉴비",
  },
  {
    value: "INTERMEDIATE",
    text: "중수",
  },
  {
    value: "MASTER",
    text: "고수",
  },
];

interface Props {
  selectedValue: ProficiencyKeyUnion;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProficiencyPicker: React.FC<Props> = ({ selectedValue, onChange }) => {
  return (
    <Radio.Group onChange={onChange}>
      {proficiencyItems.map(({ text, value }) => (
        <Radio.Item
          key={value}
          text={text}
          value={value as string}
          checked={selectedValue === (value as ProficiencyKeyUnion)}
        />
      ))}
    </Radio.Group>
  );
};

export default ProficiencyPicker;
