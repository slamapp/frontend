import styled from "@emotion/styled"
import { Spacer, Icon, Text } from "~/components/uis/atoms"

const Header: React.FC = ({ children }) => {
  return (
    <Spacer gap="xxs" type="horizontal">
      <Icon name="map-pin" color="#FE6D04" />
      <HeaderText size="lg" strong>
        {children}
      </HeaderText>
    </Spacer>
  )
}

export default Header

const HeaderText = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
