import { HStack, Text } from "@chakra-ui/react"
import { Icon } from "~/components/uis"

interface Props {
  children: React.ReactNode
}

const Header = ({ children }: Props) => {
  return (
    <HStack spacing="4px">
      <Icon name="map-pin" color="#FE6D04" />
      <Text
        fontSize="22px"
        fontWeight="bold"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {children}
      </Text>
    </HStack>
  )
}

export default Header
