import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import {
  Box,
  Center,
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
} from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"
import { DevTool } from "@hookform/devtools"
import { motion } from "framer-motion"
import { Controller, useForm } from "react-hook-form"
import type { api } from "~/api"
import { Map } from "~/components/kakaos"
import { Button, Icon, Toast } from "~/components/uis"
import { useNavigationContext } from "~/contexts/hooks"
import { useCourtCreateMutation } from "~/features/courts"
import { withRouteGuard } from "~/hocs"
import { BottomFixedGradient, useScrollContainer } from "~/layouts"
import type { APICourt } from "~/types/domains/objects/court"

type FieldValues = Pick<
  Parameters<typeof api.courts.createNewCourt>[0],
  "basketCount" | "image" | "name" | "texture"
> & {
  position: Pick<
    Parameters<typeof api.courts.createNewCourt>[0],
    "latitude" | "longitude"
  > | null
}

const Page = withRouteGuard("private", () => {
  const router = useRouter()
  const courtCreateMutation = useCourtCreateMutation()

  const { scrollContainerHeight } = useScrollContainer()
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_COURT_CREATE")

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FieldValues>({
    mode: "all",
    defaultValues: {
      basketCount: 1,
      image: null,
      position: null,
      name: "",
      texture: "ETC",
    },
  })

  return (
    <>
      <Head>
        <title>새 농구장 추가</title>
      </Head>

      <form>
        <VStack mx="16px" mt="24px" spacing="24px">
          <Controller
            name="position"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl w="100%" isInvalid={!!errors[field.name]}>
                <FormLabel htmlFor={field.name}>농구장 위치</FormLabel>
                <Input
                  display="none"
                  id={field.name}
                  {...register(field.name, {
                    required: "농구장 위치를 등록해주세요",
                  })}
                />
                <MapEditor
                  onChange={(courtPosition) => {
                    field.onChange(courtPosition)
                    field.onBlur()
                  }}
                />
                <FormErrorMessage>{errors.position?.message}</FormErrorMessage>
              </FormControl>
            )}
          />

          <FormControl w="100%" isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">농구장 이름</FormLabel>
            <Input
              id="name"
              placeholder="ex) 서울 광화문역 앞 농구장"
              type="text"
              {...register("name", {
                required: "농구장 이름을 적어주세요",
                minLength: { value: 2, message: "2자 이상으로 적어주세요" },
                maxLength: { value: 15, message: "15자 이하로 적어주세요" },
              })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl w="100%" isInvalid={!!errors.basketCount}>
            <FormLabel htmlFor="basketCount">골대 개수</FormLabel>
            <InputGroup>
              <Input
                id="basketCount"
                type="number"
                {...register("basketCount", {
                  required: "농구장에 있는 골대개수를 적어주세요",
                  max: { value: 10, message: "골대 개수는 10개 이하여야 해요" },
                  min: { value: 1, message: "골대 개수는 1개 이상여야 해요" },
                })}
              />
              <InputRightElement>
                <Text>개</Text>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.basketCount?.message}</FormErrorMessage>
          </FormControl>
        </VStack>
      </form>
      <BottomFixedGradient>
        <Box
          as={motion.div}
          initial={{ padding: 16 }}
          animate={
            scrollContainerHeight > 400 ? { padding: 16 } : { padding: 0 }
          }
        >
          <Button
            loading={isSubmitting}
            onClick={handleSubmit(
              async ({ basketCount, image, name, position, texture }) => {
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
                    "/map" // TODO: 내가 제안한 농구장 리스트 페이지 만들면 그 페이지로 라우팅)
                  )

                  Toast.show(
                    `농구장을 잘 등록했어요 (${data.name}, 골대 개수: ${data.basketCount})`,
                    { status: "success", marginBottom: "bottomFixedGradient" }
                  )
                }
              }
            )}
            fullWidth
            size="lg"
            style={{ borderRadius: scrollContainerHeight > 400 ? 16 : 0 }}
          >
            새 농구장 추가 제안하기
          </Button>
        </Box>
      </BottomFixedGradient>
      <Box h="160px" />

      <DevTool control={control} />
    </>
  )
})

export default Page

const MapEditor = ({
  onChange,
}: {
  onChange?: (position: Pick<APICourt, "latitude" | "longitude">) => void
}) => {
  const theme = useTheme()
  const [mode, setMode] = useState<"beforeEdit" | "editing">("beforeEdit")

  const [courtPosition, setCourtPosition] =
    useState<Pick<APICourt, "latitude" | "longitude">>()

  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    const searchAddrFromCoords = ({
      latitude,
      longitude,
    }: Pick<APICourt, "latitude" | "longitude">) => {
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
            setAddress("주소가 존재하지 않습니다.")
          }
        }
      })
    }

    if (courtPosition) {
      searchAddrFromCoords(courtPosition)
    }
  }, [courtPosition])

  return (
    <>
      <Map
        zoomable={mode === "editing"}
        draggable={mode === "editing"}
        maxLevel={6}
        center={courtPosition}
        style={{
          height: 400,
          borderRadius: 16,
          zIndex: 0,
        }}
        onClick={
          mode === "editing"
            ? (_, e) => {
                const newCourtPosition = {
                  latitude: e.latLng.getLat(),
                  longitude: e.latLng.getLng(),
                }

                setCourtPosition(newCourtPosition)
                onChange?.(newCourtPosition)
              }
            : undefined
        }
      >
        {mode === "beforeEdit" && (
          <Center width="100%" height="100%">
            <Button
              scheme="white"
              style={{
                boxShadow: "0 0 32px rgba(0,0,0,0.3)",
                zIndex: 1,
              }}
              onClick={() => {
                setMode("editing")
                Toast.show("농구장이 있는 위치를 지도에서 클릭하세요", {
                  marginBottom: "bottomFixedGradient",
                })
              }}
            >
              <Icon name="map" size="sm" />
              지도에서 위치 찾기
            </Button>
          </Center>
        )}

        {mode === "editing" && (
          <>
            <Map.Button.CurrentLocation />
            <Map.Button.ZoomInOut />
          </>
        )}

        {mode === "editing" && courtPosition && (
          <>
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
                    position: "relative",
                    borderRadius: 25,
                    cursor: "pointer",
                  }}
                  justify="center"
                >
                  <Box
                    style={{
                      position: "absolute",
                      bottom: -4,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      filter: "blur(4px)",
                      width: 45,
                      height: 45,
                      borderRadius: 25,
                      overflow: "visible",
                    }}
                  />
                  <img
                    src="/assets/basketball/animation_off_400.png"
                    style={{
                      position: "absolute",
                      bottom: -8,
                      minWidth: 100,
                      minHeight: 150,
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
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
                      <Icon
                        name="map-pin"
                        size={12}
                        color={theme.colors.orange0600}
                      />
                      <Text fontSize="12px" fontWeight="bold">
                        {address}
                      </Text>
                    </HStack>
                  )}
                </Flex>
              </motion.div>
            </Map.Marker.CustomMarkerOverlay>
            <Flex
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              direction="column"
              justify="flex-end"
              width="100%"
              height="100%"
              p="8px"
            >
              <Button
                scheme="white"
                style={{
                  boxShadow: "0 0 32px rgba(0,0,0,0.3)",
                  zIndex: 1,
                  bottom: 0,
                }}
                loading={address === null}
                disabled={address === null}
                onClick={() => {
                  setCourtPosition((prev) => (prev ? { ...prev } : prev))
                }}
              >
                {address && (
                  <>
                    <Icon name="map-pin" size="sm" />
                    농구장 위치로 돌아가기
                  </>
                )}
              </Button>
            </Flex>
          </>
        )}
      </Map>
    </>
  )
}
