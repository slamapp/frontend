import { Box, Flex, Stack } from '@jsxcss/emotion'
import type { APIReservation } from '@slam/types'
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
    <Stack.Vertical marginTop={16} padding={16} borderRadius={16} backgroundColor="white">
      <Box>
        <Box fontSize="18px" fontWeight="bold">
          {dayjs(reservation.startTime).tz().format('YYYY. MM. DD (dd)')}
        </Box>
        <Box>
          {dayjs(reservation.startTime).tz().format('HH:mm')}-{dayjs(reservation.endTime).tz().format('HH:mm')}
        </Box>
      </Box>

      <Stack.Horizontal align="center">
        <Icon name="map-pin" color="#FE6D04" />
        <Box>{reservation.court.name}</Box>
      </Stack.Horizontal>

      <Stack.Horizontal justify="flex-end" spacing={8} margin="16px 0 20px 0">
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
                  <Flex.Center
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    position="fixed"
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                    backdropFilter="blur(3px)"
                  >
                    <Box
                      onClick={layer.close}
                      position="fixed"
                      top={0}
                      bottom={0}
                      left={0}
                      right={0}
                      backgroundColor="#00000005"
                      zIndex={-1}
                    />
                    <Box
                      width="90%"
                      maxWidth={`${scrollContainer.width - 60}px`}
                      backgroundColor="white"
                      borderRadius={16}
                      padding={16}
                      boxShadow="0 8px 32px -16px #00000020"
                    >
                      <Stack.Vertical align="stretch" spacing={24}>
                        <Box>정말 예약을 삭제할까요? 🤔</Box>
                        <Box>
                          <Box fontSize="18px" fontWeight="bold">
                            {dayjs(reservation.startTime).tz().format('YYYY. MM. DD (dd)')}
                          </Box>
                          <Box>
                            {dayjs(reservation.startTime).tz().format('HH:mm')}-
                            {dayjs(reservation.endTime).tz().format('HH:mm')}
                          </Box>
                        </Box>
                        <Stack.Horizontal align="center">
                          <Icon name="map-pin" color="#FE6D04" />
                          <Box>{reservation.court.name}</Box>
                        </Stack.Horizontal>
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
                      </Stack.Vertical>
                    </Box>
                  </Flex.Center>
                )}
              </AnimatePresence>
            )}
          />
        )}
      </Stack.Horizontal>
    </Stack.Vertical>
  )
}

export default ReservationItem
