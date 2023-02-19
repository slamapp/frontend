import { Box, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { APIReservation } from '@slam/types'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import { CourtItem } from '~/components/domains'
import { Button, Icon, IconButton, LayerOver, Toast } from '~/components/uis'
import { key } from '~/features'
import { useGetFavoritesQuery } from '~/features/favorites'
import { useDeleteReservationMutation } from '~/features/reservations'
import { useScrollContainer } from '~/layouts'

interface Props {
  reservation: APIReservation
}

const ReservationItem = ({ reservation }: Props) => {
  const scrollContainer = useScrollContainer()
  const getFavoritesQuery = useGetFavoritesQuery()
  const deleteReservationMutation = useDeleteReservationMutation()
  const queryClient = useQueryClient()

  return (
    <VStack mt="16px" align="stretch" p="16px" borderRadius="16px" backgroundColor="white">
      <Box>
        <Text fontSize="18px" fontWeight="bold">
          {dayjs(reservation.startTime).tz().format('YYYY. MM. DD (dd)')}
        </Text>
        <Text>
          {dayjs(reservation.startTime).tz().format('HH:mm')}-{dayjs(reservation.endTime).tz().format('HH:mm')}
        </Text>
      </Box>

      <HStack>
        <Icon name="map-pin" color="#FE6D04" />
        <Text>{reservation.court.name}</Text>
      </HStack>

      <HStack justify="flex-end" spacing="8px" m="16px 0 20px 0">
        <CourtItem.FavoritesToggle
          courtId={reservation.court.id}
          favoriteId={
            getFavoritesQuery.data.contents.find((favorite) => favorite.court.id === reservation.court.id)?.id || null
          }
        />
        <CourtItem.Share court={reservation.court} />
        {/* <CourtItem.ChatLink chatroom={{ id: "1" }} /> */}
        <CourtItem.Map court={reservation.court} type="findRoad" />
        {dayjs(reservation.startTime).diff(dayjs()) > 0 && (
          <LayerOver
            trigger={(layer) => <IconButton icon={{ name: 'x' }} onClick={layer.open} />}
            layer={(layer) => (
              <AnimatePresence mode="wait">
                {layer.isOpen && (
                  <Center
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    pos="fixed"
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                    backdropFilter="blur(3px)"
                  >
                    <Box
                      onClick={layer.close}
                      pos="fixed"
                      top={0}
                      bottom={0}
                      left={0}
                      right={0}
                      bgColor="#00000005"
                      zIndex={-1}
                    />
                    <Box
                      width="90%"
                      maxWidth={`${scrollContainer.width - 60}px`}
                      bgColor="white"
                      borderRadius="16px"
                      p="16px"
                      boxShadow="0 8px 32px -16px #00000020"
                    >
                      <VStack align="stretch" spacing="24px">
                        <Text>정말 예약을 삭제할까요? 🤔</Text>
                        <Box>
                          <Text fontSize="18px" fontWeight="bold">
                            {dayjs(reservation.startTime).tz().format('YYYY. MM. DD (dd)')}
                          </Text>
                          <Text>
                            {dayjs(reservation.startTime).tz().format('HH:mm')}-
                            {dayjs(reservation.endTime).tz().format('HH:mm')}
                          </Text>
                        </Box>
                        <HStack>
                          <Icon name="map-pin" color="#FE6D04" />
                          <Text>{reservation.court.name}</Text>
                        </HStack>
                        <Flex justify="space-between">
                          <Button scheme="white" onClick={layer.close}>
                            닫기
                          </Button>
                          <Button
                            disabled={deleteReservationMutation.isLoading}
                            loading={deleteReservationMutation.isLoading}
                            onClick={() => {
                              deleteReservationMutation.mutate(reservation.id, {
                                onSuccess: async () => {
                                  await queryClient.invalidateQueries(key.reservations.upcoming())
                                  layer.close()
                                  Toast.show('성공적으로 예약을 삭제했어요', {
                                    status: 'info',
                                    marginBottom: 'bottomNavigation',
                                  })
                                },
                              })
                            }}
                          >
                            삭제하기
                          </Button>
                        </Flex>
                      </VStack>
                    </Box>
                  </Center>
                )}
              </AnimatePresence>
            )}
          />
        )}
      </HStack>
    </VStack>
  )
}

export default ReservationItem
