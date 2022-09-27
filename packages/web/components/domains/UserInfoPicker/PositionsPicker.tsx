import type { ChangeEvent } from "react"
import { Radio } from "~/components/uis/atoms"
import type { positionType } from "~/types/domains/objects/user"
import type { Keyof, ValueOf } from "~/types/helpers"

const positionItems: {
  value: Keyof<typeof positionType>
  text: ValueOf<typeof positionType>
}[] = [
  {
    value: "PF",
    text: "파워포워드",
  },
  {
    value: "SF",
    text: "스몰포워드",
  },
  {
    value: "SG",
    text: "슈팅가드",
  },
  {
    value: "PG",
    text: "포인트가드",
  },
  {
    value: "C",
    text: "센터",
  },
  {
    value: "TBD",
    text: "미정",
  },
]

interface Props {
  selectedValue: Keyof<typeof positionType>[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const PositionsPicker: React.FC<Props> = ({ selectedValue, onChange }) => {
  return (
    <Radio.Group onChange={onChange}>
      {positionItems.map(({ text, value }) => (
        <Radio.Item
          key={value}
          text={text}
          value={value}
          checked={selectedValue.includes(value)}
        />
      ))}
    </Radio.Group>
  )
}

export default PositionsPicker
