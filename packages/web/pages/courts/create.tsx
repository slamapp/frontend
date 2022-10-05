import { useEffect, useState } from "react"
import Head from "next/head"
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react"
import { css } from "@emotion/react"
import { DevTool } from "@hookform/devtools"
import { AnimatePresence, motion } from "framer-motion"
import { Controller, useForm } from "react-hook-form"
import type { api } from "~/api"
import { BottomFixedGradient } from "~/components/domains"
import { useScrollContainer } from "~/components/domains/layout/DefaultLayout/ScrollContainer"
import Map from "~/components/kakaos/Map/Map"
import { Button, Icon } from "~/components/uis/atoms"
import { useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"
import type { APICourt } from "~/types/domains/objects/court"

const Page = withRouteGuard("private", () => {
  const { scrollContainerHeight } = useScrollContainer()
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_COURT_CREATE")

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<
    Pick<
      Parameters<typeof api.courts.createNewCourt>[0],
      "basketCount" | "image" | "name" | "texture"
    > & {
      position: Pick<
        Parameters<typeof api.courts.createNewCourt>[0],
        "latitude" | "longitude"
      > | null
    }
  >({
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
              <FormControl w="100%" isInvalid={!!errors.position}>
                <FormLabel htmlFor="position">농구장 위치</FormLabel>
                <Input
                  display="none"
                  id="position"
                  {...register("position", {
                    required: "농구장 위치를 등록해주세요",
                  })}
                />
                <MapEditor
                  onChange={(courtPosition) => field.onChange(courtPosition)}
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
            fullWidth
            size="lg"
            style={{ borderRadius: scrollContainerHeight > 400 ? 16 : 0 }}
          >
            새 농구장 추가 제안하기
          </Button>
        </Box>
      </BottomFixedGradient>
      <Box h="100px" />

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
  const [mode, setMode] = useState<"beforeEdit" | "editing" | "complete">(
    "beforeEdit"
  )

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
          pointerEvents: mode === "complete" ? "none" : "all",
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
              secondary
              type="button"
              style={{
                boxShadow: "0 0 32px rgba(0,0,0,0.3)",
                zIndex: 1,
              }}
              onClick={() => setMode("editing")}
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
        {courtPosition && (
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
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
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
              </Flex>
            </motion.div>
          </Map.Marker.CustomMarkerOverlay>
        )}

        {courtPosition && mode === "editing" && (
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
              secondary
              type="button"
              style={{
                boxShadow: "0 0 32px rgba(0,0,0,0.3)",
                zIndex: 1,
                bottom: 0,
              }}
              loading={address === null}
              disabled={address === null}
              onClick={() => {
                setCourtPosition((prev) => (prev ? { ...prev } : prev))
                setMode("complete")
              }}
            >
              {address ? (
                <>
                  <Icon name="map-pin" size="sm" />
                  {address}로 정하기
                </>
              ) : (
                address
              )}
            </Button>
          </Flex>
        )}
        {mode === "complete" && (
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
              secondary
              type="button"
              style={{
                boxShadow: "0 0 32px rgba(0,0,0,0.3)",
                zIndex: 1,
                bottom: 0,
              }}
            >
              <Icon name="map-pin" size="sm" />
              {address}
            </Button>
          </Flex>
        )}
      </Map>
    </>
  )
}
