import type { ChangeEvent } from "react"
import { Radio } from "~/components/uis/atoms"
import type { ValueOf } from "~/types/common"
import type { APIUser, proficiencyType } from "~/types/domains"

const proficiencyItems: {
  value: APIUser["proficiency"]
  text: ValueOf<typeof proficiencyType>
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
]

interface Props {
  selectedValue: APIUser["proficiency"]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ProficiencyPicker: React.FC<Props> = ({ selectedValue, onChange }) => {
  return (
    <Radio.Group onChange={onChange}>
      {proficiencyItems.map(({ text, value }) => (
        <Radio.Item
          key={value}
          text={text}
          value={value as string}
          checked={selectedValue === value}
        />
      ))}
    </Radio.Group>
  )
}

export default ProficiencyPicker
