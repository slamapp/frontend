import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import dayjs from "dayjs"
import { CourtItem } from "~/components/domains"
import { Icon } from "~/components/uis"
import { useGetFavoritesQuery } from "~/features/favorites"
import type { APIReservation } from "~/types/domains/objects"

interface Props {
  reservation: APIReservation
}

const ReservationItem = ({ reservation }: Props) => {
  const getFavoritesQuery = useGetFavoritesQuery()

  return (
    <VStack
      mt="16px"
      align="stretch"
      p="16px"
      borderRadius="16px"
      backgroundColor="white"
    >
      <Box>
        <Text fontSize="18px" fontWeight="bold">
          {dayjs(reservation.startTime).format("YYYY. MM. DD (dd)")}
        </Text>
        <Text>
          {dayjs(reservation.startTime).format("HH:mm")}-
          {dayjs(reservation.endTime).format("HH:mm")}
        </Text>
      </Box>

      <HStack>
        <Icon name="map-pin" color="#FE6D04" />
        <Text>{reservation.court.name}</Text>
      </HStack>

      <HStack justify="flex-end" spacing="8px" m="16px 0 20px 0">
        {getFavoritesQuery.isSuccess && (
          <CourtItem.FavoritesToggle
            courtId={reservation.court.id}
            favoriteId={
              getFavoritesQuery.data.contents.find(
                (favorite) => favorite.court.id === reservation.court.id
              )?.id || null
            }
          />
        )}
        <CourtItem.Share court={reservation.court} />
        <CourtItem.ChatLink chatroom={{ id: "1" }} />
        <CourtItem.Map court={reservation.court} type="findRoad" />
      </HStack>
    </VStack>
  )
}

export default ReservationItem
