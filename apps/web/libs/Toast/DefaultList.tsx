import type { ReactNode } from "react"

type Props = {
  templates: ReactNode
  options: {
    marginBottom: number
  }
}

const DefaultList = ({ templates, options: { marginBottom } }: Props) => (
  <div
    style={{
      marginBottom,
      transition: "marginBottom 200ms",
    }}
  >
    {templates}
  </div>
)

export default DefaultList
