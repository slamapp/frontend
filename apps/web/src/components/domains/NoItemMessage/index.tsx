import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@emotion/react'
import { Box, Stack } from '@jsxcss/emotion'
import { Button, Icon } from '~/components/uis'

type Props = {
  title: string
  description: string
  buttonTitle: string
  type: 'reservation' | 'favorite' | 'notification' | 'follow'
}

const NoItemMessage = ({ title, description, buttonTitle, type }: Props) => {
  const theme = useTheme()

  const src =
    type === 'favorite'
      ? '/assets/basketball/fire_off_favorited.gif'
      : type === 'reservation'
      ? '/assets/basketball/fire_off_reservated.gif'
      : type === 'notification'
      ? '/assets/basketball/animation_off_400.png'
      : '/assets/basketball/fire_off_400.gif'

  return (
    <Stack.Vertical align="center" spacing={3}>
      <Image width={90} height={170} unoptimized src={src} alt="basketball" />
      <Stack.Vertical align="center" spacing={1}>
        <Box as="h5" fontSize={16} fontWeight={700}>
          {title}
        </Box>
        <Box color={theme.colors.gray0500} fontSize={12}>
          {description}
        </Box>
      </Stack.Vertical>
      <Link href="/map" passHref>
        <Button fullWidth>
          <Icon name="map" size="sm" color="white" />
          {buttonTitle}
        </Button>
      </Link>
      <Box height={40} />
    </Stack.Vertical>
  )
}

export default NoItemMessage
