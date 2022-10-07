import { HStack } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { Icon, Text } from "~/components/uis"

interface Props {
  children: React.ReactNode
}

const Header = ({ children }: Props) => {
  return (
    <HStack spacing="4px">
      <Icon name="map-pin" color="#FE6D04" />
      <Text
        size="lg"
        strong
        css={css`
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        `}
      >
        {children}
      </Text>
    </HStack>
  )
}

export default Header
