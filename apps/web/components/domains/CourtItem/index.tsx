import { ReactNode } from 'react'
import Link from 'next/link'
import { Box, HStack, Text } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import { Icon, IconButton } from '~/components/uis'
import { useCancelFavoriteMutation, useCreateFavoriteMutation } from '~/features/favorites'
import { withShareClick } from '~/hocs'
import { APIChatRoom, APICourt, APIFavorite } from '~/types/domains/objects'

const CourtItem = {
  Share: ({ court }: { court: Pick<APICourt, 'id' | 'name' | 'longitude' | 'latitude'> }) =>
    withShareClick('court', { court })(({ onClick }) => <IconButton icon={{ name: 'share-2' }} onClick={onClick} />),
  FavoritesToggle: ({ courtId, favoriteId }: { courtId: APICourt['id']; favoriteId: APIFavorite['id'] | null }) => {
    const createFavoriteMutation = useCreateFavoriteMutation()
    const cancelFavoriteMutation = useCancelFavoriteMutation()

    return (
      <IconButton
        icon={{ name: 'star', color: '#FFC700', fill: !!favoriteId }}
        onClick={() => {
          if (!favoriteId) {
            createFavoriteMutation.mutate({ courtId })
          } else {
            cancelFavoriteMutation.mutate({ favoriteId })
          }
        }}
      />
    )
  },

  ChatLink: ({ chatroom }: { chatroom: Pick<APIChatRoom, 'id'> }) => (
    <Link href={`/chat/${chatroom.id}`} passHref>
      <IconButton icon={{ name: 'message-circle' }} />
    </Link>
  ),

  Map: ({
    court,
    type = 'information',
  }: {
    court: Pick<APICourt, 'latitude' | 'longitude' | 'name'>
    type?: 'information' | 'findRoad'
  }) => (
    <Link
      href={
        type === 'information'
          ? `https://map.kakao.com/link/map/${court.name},${court.latitude},${court.longitude}`
          : `https://map.kakao.com/link/to/${court.name},${court.latitude},${court.longitude}`
      }
      passHref
      target="_blank"
      rel="noreferrer"
    >
      <IconButton icon={{ name: 'map' }} />
    </Link>
  ),

  Header: ({ children }: { children: ReactNode }) => {
    return (
      <HStack spacing="4px">
        <Icon name="map-pin" color="#FE6D04" />
        <Text fontSize="22px" fontWeight="bold" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          {children}
        </Text>
      </HStack>
    )
  },
  Address: ({ children }: { children: ReactNode }) => {
    const theme = useTheme()

    return (
      <Box>
        <Text
          color={theme.colors.gray0700}
          css={css`
            display: box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          `}
        >
          {children}
        </Text>
      </Box>
    )
  },
}

export default CourtItem
