import type { ReactNode } from "react"
import Link from "next/link"
import { Box, HStack, Text } from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"
import { Icon, IconButton } from "~/components/uis"
import {
  useCancelFavoriteMutation,
  useCreateFavoriteMutation,
  useGetFavoritesQuery,
} from "~/features/favorites"
import { useCurrentUserQuery } from "~/features/users"
import { withShareClick } from "~/hocs"
import type { APIChatRoom, APICourt } from "~/types/domains/objects"

const CourtItem = {
  Share: ({
    court,
  }: {
    court: Pick<APICourt, "id" | "name" | "longitude" | "latitude">
  }) =>
    withShareClick("court", { court })(({ onClick }) => (
      <IconButton icon={{ name: "share-2" }} onClick={onClick} />
    )),
  FavoritesToggle: ({ courtId }: { courtId: APICourt["id"] }) => {
    const currentUserQuery = useCurrentUserQuery()
    const getFavoritesQuery = useGetFavoritesQuery()
    const createFavoriteMutation = useCreateFavoriteMutation()
    const cancelFavoriteMutation = useCancelFavoriteMutation()

    if (!currentUserQuery.isSuccess || !getFavoritesQuery.isSuccess) {
      return null
    }

    const foundFavorite = getFavoritesQuery.data.contents.find(
      (favorite) => favorite.court.id === courtId
    )

    return (
      <IconButton
        icon={{ name: "star", color: "#FFC700", fill: !!foundFavorite }}
        onClick={() => {
          if (!foundFavorite) {
            createFavoriteMutation.mutate({ courtId })
          } else {
            cancelFavoriteMutation.mutate({ favoriteId: foundFavorite.id })
          }
        }}
      />
    )
  },

  ChatLink: ({ chatroom }: { chatroom: Pick<APIChatRoom, "id"> }) => (
    <Link href={`/chat/${chatroom.id}`} passHref>
      <a>
        <IconButton icon={{ name: "message-circle" }} />
      </a>
    </Link>
  ),

  Map: ({
    court,
    type = "information",
  }: {
    court: Pick<APICourt, "latitude" | "longitude" | "name">
    type?: "information" | "findRoad"
  }) => (
    <Link
      href={
        type === "information"
          ? `https://map.kakao.com/link/map/${court.name},${court.latitude},${court.longitude}`
          : `https://map.kakao.com/link/to/${court.name},${court.latitude},${court.longitude}`
      }
      passHref
    >
      <a target="_blank" rel="noreferrer">
        <IconButton icon={{ name: "map" }} />
      </a>
    </Link>
  ),

  Header: ({ children }: { children: ReactNode }) => {
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
  },
  Address: ({ children }: { children: ReactNode }) => {
    const theme = useTheme()

    return (
      <Box h="50px">
        <Text
          color={theme.colors.gray0700}
          css={css`
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            display: -webkit-box;
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
