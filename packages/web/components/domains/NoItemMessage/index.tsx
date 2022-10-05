import Image from "next/image"
import Link from "next/link"
import { Heading, Text, VStack } from "@chakra-ui/react"
import { Button, Icon } from "~/components/uis/atoms"

type Props = {
  title: string
  description: string
  buttonTitle: string
  type: "reservation" | "favorite" | "notification" | "follow"
}

const NoItemMessage = ({ title, description, buttonTitle, type }: Props) => {
  const src =
    type === "favorite"
      ? "/assets/basketball/fire_off_favorited.gif"
      : type === "reservation"
      ? "/assets/basketball/fire_off_reservated.gif"
      : type === "notification"
      ? "/assets/basketball/animation_off_400.png"
      : "/assets/basketball/fire_off_400.gif"

  return (
    <VStack spacing={3}>
      <Image width={90} height={170} unoptimized src={src} alt="basketball" />
      <VStack spacing={1}>
        <Heading as="h5" fontSize="16px">
          {title}
        </Heading>
        <Text color="gray.500" fontSize="12px">
          {description}
        </Text>
      </VStack>
      <Link href="/map" passHref>
        <a>
          <Button fullWidth>
            <Icon name="map" size="sm" color="white" />
            {buttonTitle}
          </Button>
        </a>
      </Link>
      <div style={{ height: 40 }}></div>
    </VStack>
  )
}

export default NoItemMessage
