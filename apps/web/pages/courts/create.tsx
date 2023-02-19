import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import { DevTool } from '@hookform/devtools'
import { APICourt } from '@slam/types'
import { motion } from 'framer-motion'
import { Controller, useForm } from 'react-hook-form'
import { api } from '~/api'
import { Map } from '~/components/kakaos'
import { Button, Icon, IconButton, Toast } from '~/components/uis'
import { useCourtCreateMutation } from '~/features/courts'
import { BottomFixedGradient, useScrollContainer } from '~/layouts'
import { Navigation } from '~/layouts/Layout/navigations'

const Page = () => {
  const router = useRouter()
  const courtCreateMutation = useCourtCreateMutation()
  const scrollContainer = useScrollContainer()

  const { control, formState, handleSubmit, register, watch } = useForm<
    Pick<Parameters<typeof api.courts.createNewCourt>[0], 'basketCount' | 'image' | 'name' | 'texture'> & {
      position: Pick<Parameters<typeof api.courts.createNewCourt>[0], 'latitude' | 'longitude'> | null
    }
  >({
    mode: 'all',
    defaultValues: {
      basketCount: 1,
      image: null,
      position: null,
      name: '',
      texture: 'ETC',
    },
  })

  return (
    <Navigation
      top={{
        title: '새 농구장 추가',
        isBack: true,
      }}
    >
      <Head>
        <title>새 농구장 추가</title>
      </Head>

      <form>
        <VStack as={motion.div} layout mx="16px" mt="24px" spacing="24px">
          <Controller
            name="position"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl isRequired w="100%" isInvalid={!!formState.errors[field.name]}>
                <FormLabel htmlFor={field.name}>농구장 위치</FormLabel>
                <MapEditor
                  onChange={(courtPosition) => {
                    field.onChange(courtPosition)
                    field.onBlur()
                  }}
                />
                <FormErrorMessage>{formState.errors.position?.message}</FormErrorMessage>
              </FormControl>
            )}
          />
          {watch('position') && (
            <FormControl
              isRequired
              as={motion.div}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              w="100%"
              isInvalid={!!formState.errors.basketCount}
            >
              <FormLabel htmlFor="basketCount">골대 개수</FormLabel>
              <InputGroup>
                <Input
                  id="basketCount"
                  type="number"
                  {...register('basketCount', {
                    required: '농구장에 있는 골대개수를 적어주세요',
                    max: {
                      value: 10,
                      message: '골대 개수는 10개 이하여야 해요',
                    },
                    min: {
                      value: 1,
                      message: '골대 개수는 1개 이상여야 해요',
                    },
                  })}
                />
                <InputRightElement>
                  <Text>개</Text>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formState.errors.basketCount?.message}</FormErrorMessage>
            </FormControl>
          )}
          {watch('position') && (
            <FormControl
              isRequired
              as={motion.div}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              w="100%"
              isInvalid={!!formState.errors.name}
            >
              <FormLabel htmlFor="name">농구장 이름</FormLabel>
              <Input
                id="name"
                placeholder="ex) 서울 광화문역 앞 농구장"
                type="text"
                {...register('name', {
                  required: '농구장 이름을 적어주세요',
                  minLength: { value: 2, message: '2자 이상으로 적어주세요' },
                  maxLength: { value: 15, message: '15자 이하로 적어주세요' },
                })}
              />
              <FormErrorMessage>{formState.errors.name?.message}</FormErrorMessage>
            </FormControl>
          )}

          <Box h="100px" />
        </VStack>
      </form>
      <BottomFixedGradient>
        <Box
          as={motion.div}
          initial={{ padding: 16 }}
          animate={scrollContainer.height > 400 ? { padding: 16 } : { padding: 0 }}
        >
          <Button
            loading={formState.isSubmitting}
            onClick={handleSubmit(async ({ basketCount, image, name, position, texture }) => {
              if (position) {
                const { latitude, longitude } = position
                const { data } = await courtCreateMutation.mutateAsync({
                  basketCount,
                  image,
                  latitude,
                  longitude,
                  name,
                  texture,
                })

                await router.replace(
                  '/map' // TODO: 내가 제안한 농구장 리스트 페이지 만들면 그 페이지로 라우팅)
                )

                Toast.show(`농구장을 잘 등록했어요 (${data.name}, 골대 개수: ${data.basketCount})`, {
                  status: 'success',
                  marginBottom: 'bottomFixedGradient',
                })
              }
            })}
            fullWidth
            size="lg"
            style={{ borderRadius: scrollContainer.height > 400 ? 16 : 0 }}
          >
            새 농구장 추가 제안하기
          </Button>
        </Box>
      </BottomFixedGradient>

      <DevTool control={control} />
    </Navigation>
  )
}

export default Page

const MapEditor = ({
  onChange,
}: {
  onChange?: (position: Pick<APICourt, 'latitude' | 'longitude'> | null) => void
}) => {
  const theme = useTheme()

  const [courtPosition, setCourtPosition] = useState<Pick<APICourt, 'latitude' | 'longitude'> | null>(null)

  const clearCourtPosition = () => {
    setCourtPosition(null)
    onChange?.(null)
  }

  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    const searchAddrFromCoords = ({ latitude, longitude }: Pick<APICourt, 'latitude' | 'longitude'>) => {
      setAddress(null)
      const geocoder = new kakao.maps.services.Geocoder()

      geocoder.coord2Address(longitude, latitude, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          // 도로명 주소
          if (result[0].road_address) {
            setAddress(result[0].road_address.address_name as string)
          }
          // 법정 주소
          else if (result[0].address) {
            setAddress(result[0].address.address_name as string)
          }
          // 주소가 없는 경우
          else {
            setAddress('주소가 존재하지 않습니다.')
          }
        }
      })
    }

    if (courtPosition) {
      searchAddrFromCoords(courtPosition)
    }
  }, [courtPosition])

  const isEdited = !!courtPosition

  return (
    <Map
      center={courtPosition ? { ...courtPosition } : undefined}
      style={{
        height: isEdited ? 200 : 400,
        borderRadius: 16,
        zIndex: 0,
      }}
      onBoundChange={(map) => {
        map.relayout()
      }}
      onClick={(_, e) => {
        const newCourtPosition = {
          latitude: e.latLng.getLat(),
          longitude: e.latLng.getLng(),
        }

        setCourtPosition(newCourtPosition)
        onChange?.(newCourtPosition)
      }}
    >
      {!isEdited && <Map.Button.CurrentLocation />}
      {!isEdited && <Map.Button.ZoomInOut />}
      {isEdited && (
        <IconButton
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          icon={{ name: 'x' }}
          style={{
            color: '#6B94E5',
            backgroundColor: 'white',
            border: 'none',
            position: 'absolute',
            boxShadow: '0 0 32px rgba(0,0,0,0.3)',
            zIndex: 1,
            top: 15,
            right: 15,
          }}
          onClick={clearCourtPosition}
        />
      )}

      {isEdited && (
        <Map.Marker.CustomMarkerOverlay
          position={{
            latitude: courtPosition.latitude,
            longitude: courtPosition.longitude,
          }}
        >
          <motion.div
            css={css`
              width: 50;
              height: 50;
            `}
          >
            <Flex
              as={motion.div}
              initial={{ opacity: 0, scale: 10, y: -40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 50,
                height: 50,
                position: 'relative',
                borderRadius: 25,
                cursor: 'pointer',
              }}
              justify="center"
            >
              <Box
                style={{
                  position: 'absolute',
                  bottom: -4,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  filter: 'blur(4px)',
                  width: 45,
                  height: 45,
                  borderRadius: 25,
                  overflow: 'visible',
                }}
              />
              <img
                src="/assets/basketball/animation_off_400.png"
                style={{
                  position: 'absolute',
                  bottom: -8,
                  minWidth: 100,
                  minHeight: 150,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
                alt="basketball_animation_off"
              />
              {address && (
                <HStack
                  as={motion.div}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  pos="absolute"
                  bottom="-34px"
                  whiteSpace="nowrap"
                  textAlign="center"
                  bgColor="#00000095"
                  backdropFilter="blur(2px)"
                  color="white"
                  borderRadius="8px"
                  py="4px"
                  px="8px"
                  pointerEvents="none"
                  boxShadow="0 0 16px #00000040"
                >
                  <Icon name="map-pin" size={12} color={theme.colors.orange0600} />
                  <Text fontSize="12px" fontWeight="bold">
                    {address}
                  </Text>
                </HStack>
              )}
            </Flex>
          </motion.div>
        </Map.Marker.CustomMarkerOverlay>
      )}
    </Map>
  )
}
