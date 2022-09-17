import styled from "@emotion/styled"
import { Text } from "~/components/uis/atoms"

interface Props {
  title?: string
  index?: string
  active?: boolean
  [x: string]: any
}

const TabItem = ({ title, index, active = false, ...props }: Props) => {
  return (
    <TabItemWrapper active={active} {...props}>
      <Text strong={active}>{title}</Text>
    </TabItemWrapper>
  )
}

const TabItemWrapper = styled.div<{
  active?: boolean
}>`
  flex-grow: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 50px;
  cursor: pointer;
  transition: background 200ms;

  :hover {
    background: ${({ theme }) => theme.previousTheme.colors.gray200};
  }
`

TabItem.defaultProps = {
  __TYPE: "Tab.Item",
}

export default TabItem
