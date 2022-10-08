import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import {
  Avatar,
  Box,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
  chakra,
  useCheckbox,
  useCheckboxGroup,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react"
import type {
  UseCheckboxGroupProps,
  UseCheckboxProps,
  UseRadioGroupProps,
  UseRadioProps,
} from "@chakra-ui/react"
import { useTheme } from "@emotion/react"
import { DevTool } from "@hookform/devtools"
import { motion } from "framer-motion"
import { Controller, useForm } from "react-hook-form"
import { Button, Icon, Toast, Upload } from "~/components/uis"
import { DEFAULT_PROFILE_IMAGE_URL } from "~/constants"
import { useNavigationContext } from "~/contexts/hooks"
import {
  useMyProfileMutation,
  useMyProfileQuery,
  useUpdateMyProfileImageMutation,
} from "~/features/users"
import { withRouteGuard } from "~/hocs"
import { BottomFixedGradient, useScrollContainer } from "~/layouts"
import type { APIUser } from "~/types/domains/objects"

const Page = withRouteGuard("private", () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_USER_EDIT")

  const myProfileQuery = useMyProfileQuery()

  if (myProfileQuery.isLoading) {
    return <>loading...</> // TODO: Skeleton
  }

  if (myProfileQuery.isError) {
    return <>error</>
  }

  return <EditForm initialData={myProfileQuery.data} />
})

export default Page

const EditForm = ({ initialData }: { initialData: APIUser }) => {
  const { scrollContainerHeight } = useScrollContainer()
  const router = useRouter()
  const myProfileMutation = useMyProfileMutation()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      description: initialData.description,
      email: initialData.email,
      nickname: initialData.nickname,
      positions: initialData.positions,
      proficiency: initialData.proficiency ?? "BEGINNER",
      profileImage: initialData.profileImage,
    },
  })

  const onSubmit: Parameters<typeof handleSubmit>[0] = ({
    description,
    nickname,
    positions,
    proficiency,
  }) =>
    myProfileMutation.mutateAsync(
      { description, nickname, positions, proficiency },
      {
        onSuccess: async (data) => {
          await router.replace(`/user/${data.id}`)

          Toast.show("성공적으로 내 프로필 정보를 수정했어요", {
            status: "success",
          })
        },
        onError: () => {
          Toast.show("내 프로필 정보를 수정을 실패했습니다.", {
            status: "error",
          })
        },
      }
    )

  return (
    <>
      <Head>
        <title>프로필 편집 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>
      <form>
        <VStack px="16px" spacing="24px">
          <AvatarEdit
            src={initialData.profileImage ?? DEFAULT_PROFILE_IMAGE_URL}
          />
          <FormControl isInvalid={!!errors.nickname}>
            <FormLabel htmlFor="nickname">닉네임</FormLabel>
            <Input
              id="nickname"
              placeholder="ex) 수도권 강백호"
              type="text"
              {...register("nickname", {
                required: "닉네임을 채워주세요",
                minLength: {
                  value: 2,
                  message: "닉네임을 2자 이상 적어주세요",
                },
                maxLength: {
                  value: 15,
                  message: "닉네임을 15자 이하 적어주세요",
                },
              })}
              aria-invalid={errors.nickname ? "true" : "false"}
            />
            <FormErrorMessage>{errors.nickname?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.description}>
            <FormLabel htmlFor="description">
              나를 한 마디로 표현해주세요
            </FormLabel>
            <Input
              id="description"
              placeholder="ex) 슬램에서 한판 기대하고 있을게요"
              type="text"
              {...register("description", {
                required: "한마디를 채워주세요",
                minLength: {
                  value: 2,
                  message: "한마디를 2자 이상로 적어주세요",
                },
                maxLength: {
                  value: 30,
                  message: "한마디를 30자 이하로 적어주세요",
                },
              })}
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="positions">포지션</FormLabel>
            <Controller
              name="positions"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ChipCheckboxGroup
                  options={[
                    { value: "C", label: "센터" },
                    { value: "PF", label: "파워포워드" },
                    { value: "SF", label: "스몰포워드" },
                    { value: "SG", label: "슈팅가드" },
                    { value: "PG", label: "포인트가드" },
                    { value: "TBD", label: "미정" },
                  ]}
                  {...field}
                  onChange={(values) => {
                    field.onChange(
                      (() => {
                        if (values.length === 2 && values[0] === "TBD") {
                          return [values[1]]
                        }

                        if (values.includes("TBD")) {
                          return ["TBD"]
                        }

                        if (values.length > 2) {
                          return [values[1], values[2]]
                        }

                        if (values.length === 0) {
                          return ["TBD"]
                        }

                        return [...values]
                      })()
                    )
                    field.onBlur()
                  }}
                />
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="proficiency">숙련도</FormLabel>
            <Controller
              name="proficiency"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ChipRadioGroup
                  options={[
                    { value: "BEGINNER", label: "뉴비" },
                    { value: "INTERMEDIATE", label: "중수" },
                    { value: "MASTER", label: "고수" },
                  ]}
                  {...field}
                  onChange={(value) => {
                    field.onChange(value)
                    field.onBlur()
                  }}
                />
              )}
            />
          </FormControl>
          <Box h="100px" />
        </VStack>
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
              loading={isSubmitting || isSubmitSuccessful}
              disabled={!isDirty || !isValid || isSubmitSuccessful}
              onClick={handleSubmit(onSubmit)}
              style={{ borderRadius: scrollContainerHeight > 400 ? 16 : 0 }}
            >
              {!isDirty || !isValid
                ? "프로필을 먼저 수정하세요"
                : isSubmitSuccessful
                ? "내 프로필페이지로 이동 중이에요"
                : "프로필 수정 완료하기"}
            </Button>
          </Box>
        </BottomFixedGradient>
      </form>

      <DevTool control={control} />
    </>
  )
}

const ChipCheckboxGroup = ({
  options,
  ...props
}: UseCheckboxGroupProps & {
  options: { value: string; label: string }[]
}) => {
  const { getCheckboxProps } = useCheckboxGroup(props)

  return (
    <Flex wrap="wrap" width="100%" gap="8px">
      {options.map(({ value, label }) => (
        <ChipCheckbox key={value} {...getCheckboxProps({ value })}>
          {label}
        </ChipCheckbox>
      ))}
    </Flex>
  )
}

const ChipCheckbox = ({
  children,
  ...props
}: UseCheckboxProps & { children: ReactNode }) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props)

  const theme = useTheme()

  return (
    <chakra.label {...htmlProps}>
      <input value={props.value} {...getInputProps()} hidden />
      <Box
        cursor="pointer"
        border="2px solid"
        borderColor={
          state.isChecked ? theme.colors.black : theme.colors.gray0100
        }
        borderRadius="full"
        bgColor={state.isChecked ? theme.colors.black : "transparent"}
        color={state.isChecked ? theme.colors.white : theme.colors.black}
        px="16px"
        py="4px"
        {...getCheckboxProps()}
      >
        <Text {...getLabelProps()} whiteSpace="nowrap">
          {children}
        </Text>
      </Box>
    </chakra.label>
  )
}

const ChipRadioGroup = ({
  options,
  ...props
}: UseRadioGroupProps & {
  options: { value: string; label: string }[]
}) => {
  const { getRadioProps } = useRadioGroup(props)

  return (
    <Flex wrap="wrap" width="100%" gap="8px">
      {options.map(({ value, label }) => (
        <ChipRadio key={value} {...getRadioProps({ value })}>
          {label}
        </ChipRadio>
      ))}
    </Flex>
  )
}

const ChipRadio = ({
  children,
  ...props
}: UseRadioProps & { children: ReactNode }) => {
  const { getCheckboxProps, getInputProps, getLabelProps, htmlProps, state } =
    useRadio(props)

  const theme = useTheme()

  return (
    <chakra.label {...htmlProps}>
      <input value={props.value} {...getInputProps()} hidden />
      <Box
        cursor="pointer"
        border="2px solid"
        borderColor={
          state.isChecked ? theme.colors.black : theme.colors.gray0100
        }
        borderRadius="full"
        bgColor={state.isChecked ? theme.colors.black : "transparent"}
        color={state.isChecked ? theme.colors.white : theme.colors.black}
        px="16px"
        py="4px"
        {...getCheckboxProps()}
      >
        <Text {...getLabelProps()} whiteSpace="nowrap">
          {children}
        </Text>
      </Box>
    </chakra.label>
  )
}

const AvatarEdit = ({ src }: { src: string }) => {
  const theme = useTheme()

  const updateMyProfileImageMutation = useUpdateMyProfileImageMutation()
  const [file, setFile] = useState<File>()

  useEffect(() => {
    const fileReaderDataURL = new FileReader()
    if (file) {
      fileReaderDataURL.readAsDataURL(file)
    }

    fileReaderDataURL.addEventListener("load", async (e) => {
      const newSrc =
        typeof e.target?.result === "string" ? e.target?.result : undefined

      if (file && newSrc) {
        await updateMyProfileImageMutation.mutateAsync(file)
        Toast.show("프로필 사진을 성공적으로 바꿨어요", { status: "success" })
      }
    })
  }, [file])

  return (
    <Box pt="24px">
      <Upload droppable value={file} onChange={(file) => setFile(file)}>
        {({ dragging }) => (
          <Box pointerEvents="none" pos="relative">
            <Avatar
              size="xl"
              src={src}
              border={dragging ? "5px solid black" : undefined}
            />
            <Center pos="absolute" top={0} right={0} left={0} bottom={0}>
              <Icon name="plus" color={theme.colors.gray0900} />
            </Center>
          </Box>
        )}
      </Upload>
    </Box>
  )
}
