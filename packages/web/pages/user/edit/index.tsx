import type { ReactNode } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import {
  useCheckboxGroup,
  Text,
  Box,
  FormControl,
  Input,
  useCheckbox,
  VStack,
  chakra,
  Flex,
  useRadioGroup,
  useRadio,
  Avatar,
} from "@chakra-ui/react"
import type {
  UseCheckboxGroupProps,
  UseRadioGroupProps,
  UseCheckboxProps,
  UseRadioProps,
} from "@chakra-ui/react"
import { useTheme } from "@emotion/react"
import { useForm, Controller } from "react-hook-form"
import { BottomFixedGradient } from "~/components/domains"
import LoadingIndicator from "~/components/kakaos/Map/LoadingIndicator"
import { Button } from "~/components/uis/atoms"
import { Toast } from "~/components/uis/molecules"
import { DEFAULT_PROFILE_IMAGE_URL } from "~/constants"
import { useNavigationContext } from "~/contexts/hooks"
import { useMyProfileMutation, useMyProfileQuery } from "~/features/users"
import { withRouteGuard } from "~/hocs"
import type { APIUser } from "~/types/domains/objects"

const Page = withRouteGuard("private", () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_USER_EDIT")

  const myProfileQuery = useMyProfileQuery()

  if (myProfileQuery.isLoading) {
    return <LoadingIndicator />
  }

  if (myProfileQuery.isError) {
    return <>error</>
  }

  return <EditForm initialData={myProfileQuery.data} />
})

export default Page

const EditForm = ({ initialData }: { initialData: APIUser }) => {
  const router = useRouter()
  const myProfileMutation = useMyProfileMutation()

  const { register, control, handleSubmit, formState } = useForm({
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
  }) => {
    myProfileMutation.mutate(
      { description, nickname, positions, proficiency },
      {
        onSuccess: (data) => {
          router.replace(`/user/${data.id}`)
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
  }

  return (
    <>
      <Head>
        <title>프로필 편집 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>
      <form>
        <VStack px="16px" spacing="24px">
          <Box pt="24px">
            <Avatar size="lg" src={DEFAULT_PROFILE_IMAGE_URL} />
          </Box>
          <FormControl>
            <label htmlFor="nickname">닉네임</label>
            <Input
              id="nickname"
              placeholder="ex) 수도권 강백호"
              type="text"
              {...register("nickname", {
                required: "닉네임을 채워주세요",
                minLength: 2,
                maxLength: 15,
              })}
              aria-invalid={formState.errors.nickname ? "true" : "false"}
            />
            {formState.errors.nickname?.type === "required" && (
              <p>{formState.errors.nickname.message}</p>
            )}
            {(formState.errors.nickname?.type === "minLength" ||
              formState.errors.nickname?.type === "maxLength") && (
              <p>닉네임을 2자에서 15자를 적어주세요</p>
            )}
          </FormControl>

          <FormControl>
            <label htmlFor="description">나를 한 마디로 표현해주세요</label>
            <Input
              id="description"
              placeholder="ex) 슬램에서 한판 기대하고 있을게요"
              type="text"
              {...register("description", {
                required: "한마디를 채워주세요",
                minLength: 3,
                maxLength: 30,
              })}
            />
            {formState.errors.description?.type === "required" && (
              <p>{formState.errors.description.message}</p>
            )}
            {(formState.errors.description?.type === "minLength" ||
              formState.errors.description?.type === "maxLength") && (
              <p>닉네임을 3자에서 30자를 적어주세요</p>
            )}
          </FormControl>

          <FormControl>
            <label htmlFor="positions">포지션</label>
            <Controller
              name="positions"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ChipCheckboxGroup
                  {...field}
                  options={[
                    { value: "C", label: "센터" },
                    { value: "PF", label: "파워포워드" },
                    { value: "SF", label: "스몰포워드" },
                    { value: "SG", label: "슈팅가드" },
                    { value: "PG", label: "포인트가드" },
                    { value: "TBD", label: "미정" },
                  ]}
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
                  }}
                />
              )}
            />
          </FormControl>

          <FormControl>
            <label htmlFor="proficiency">숙련도</label>
            <Controller
              name="proficiency"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ChipRadioGroup
                  {...field}
                  options={[
                    { value: "BEGINNER", label: "뉴비" },
                    { value: "INTERMEDIATE", label: "중수" },
                    { value: "MASTER", label: "고수" },
                  ]}
                />
              )}
            />
          </FormControl>
          <Box h="100px" />
        </VStack>
      </form>

      <BottomFixedGradient>
        <Box p="16px">
          <Button
            fullWidth
            size="lg"
            disabled={Object.keys(formState.errors).length >= 1}
            onClick={handleSubmit(onSubmit)}
          >
            프로필 수정 완료하기
          </Button>
        </Box>
      </BottomFixedGradient>
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
          state.isChecked ? theme.colors.gray0900 : theme.colors.gray0100
        }
        borderRadius="full"
        bgColor={state.isChecked ? theme.colors.gray0900 : "transparent"}
        color={state.isChecked ? theme.colors.white : theme.colors.gray0900}
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
          state.isChecked ? theme.colors.gray0900 : theme.colors.gray0100
        }
        borderRadius="full"
        bgColor={state.isChecked ? theme.colors.gray0900 : "transparent"}
        color={state.isChecked ? theme.colors.white : theme.colors.gray0900}
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
