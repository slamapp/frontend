import { Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { useTheme } from "@emotion/react"
import dayjs from "dayjs"
import { CourtItem } from "~/components/domains"
import type { APIReservation } from "~/types/domains/objects"

interface Props {
  reservation: APIReservation
}

const ReservationItem = ({ reservation }: Props) => {
  const theme = useTheme()

  return (
    <VStack
      align="stretch"
      p="16px"
      borderRadius="16px"
      bgColor={theme.colors.white}
    >
      <Flex justify="space-between">
        <CourtItem.Header>{reservation.court.name}</CourtItem.Header>

        <HStack>
          <Text>
            {dayjs(reservation.startTime).format("YYYY년 MM월 DD일")} (
            {dayjs(reservation.startTime).day()})
          </Text>
          <Text>
            {dayjs(reservation.startTime).format("HH:mm")} -{" "}
            {dayjs(reservation.endTime).format("HH:mm")}
          </Text>
        </HStack>
      </Flex>

      <HStack justify="flex-end" spacing="8px" m="16px 0 20px 0">
        <CourtItem.FavoritesToggle courtId={reservation.court.id} />
        <CourtItem.Share court={reservation.court} />
        <CourtItem.ChatLink chatroom={{ id: "1" }} />
        <CourtItem.Map court={reservation.court} type="findRoad" />
      </HStack>
    </VStack>
  )
}

export default ReservationItem
