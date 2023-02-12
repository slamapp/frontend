import Image from 'next/image'
import Link from 'next/link'
import { Text, VStack } from '@chakra-ui/react'
import { Button, Icon } from '~/components/uis'

interface Props {
  title: string
}

const ErrorMessage = ({ title }: Props) => (
  <VStack>
    <VStack spacing="0">
      <Image src="/assets/error.svg" alt="error" width={60} height={60} />
      <Text fontSize="lg">{title}</Text>
    </VStack>

    <Link href="/map" passHref>
      <Button size="lg">
        <Icon name="map" size="sm" color="white" />
        지도에서 내 주변 농구장 찾기
      </Button>
    </Link>
    <Text fontSize="sm">내 주변 농구장을 찾으러 가보는 건 어떨까요?</Text>
  </VStack>
)

export default ErrorMessage
