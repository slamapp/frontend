import type { ChangeEvent } from "react"
import { useCallback, useRef, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { css, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import { api } from "~/api"
import {
  BottomFixedGradient,
  PositionsPicker,
  ProficiencyPicker,
  BasketballLoading,
  LeadToLoginModal,
} from "~/components/domains"
import { Text, Button, Spacer, Upload } from "~/components/uis/atoms"
import { Toast, Label, Avatar } from "~/components/uis/molecules"
import { Input } from "~/components/uis/organisms"
import { DEFAULT_PROFILE_IMAGE_URL } from "~/constants"
import { useAuthContext } from "~/contexts/hooks"
import useForm from "~/hooks/useForm"
import type { Error } from "~/hooks/useForm"
import type { APIUser } from "~/types/domains/objects"
import type {
  positionType,
  proficiencyType,
} from "~/types/domains/objects/user"
import type { Keyof } from "~/types/helpers"
import { appendImageFileToFormData } from "~/utils"

const LENGTH_LIMIT_NICKNAME = 15
const LENGTH_LIMIT_DESCRIPTION = 25

const ProfileForm = () => {
  const {
    authProps,
    deleteMyProfileImage,
    updateMyProfileImage,
    updateMyProfile,
  } = useAuthContext()

  const theme = useTheme()
  const router = useRouter()

  const [isFetching, setIsFetching] = useState(true)

  const [profileImage, setProfileImage] = useState<string | null>(
    DEFAULT_PROFILE_IMAGE_URL
  )
  const [isOpenDefaultImageModal, setIsOpenDefaultImageModal] = useState(false)
  const [isOpenEditConfirmModal, setIsOpenEditConfirmModal] = useState(false)

  const profileImageRef = useRef<HTMLInputElement>(null)

  const { values, errors, isLoading, setValues, handleSubmit } = useForm<
    Pick<APIUser, "nickname" | "description" | "proficiency" | "positions">,
    HTMLButtonElement
  >({
    initialValues: {
      nickname: "",
      description: "",
      proficiency: null,
      positions: [],
    },
    onSubmit: async (values) => {
      if (authProps.currentUser) {
        const profileImageInputRef = profileImageRef?.current ?? null
        const editedProfileImageFiles = profileImageInputRef?.files ?? null
        const editedProfileImage = editedProfileImageFiles
          ? appendImageFileToFormData(editedProfileImageFiles[0], "image")
          : null

        try {
          if (editedProfileImage) {
            await updateMyProfileImage(editedProfileImage)
          }
          await updateMyProfile(values)
          router.replace(`/user/${authProps.currentUser.id}`)
          Toast.show("성공적으로 사용자 정보를 변경했습니다. 🥳")
        } catch (error) {
          console.error(error)
        }
      }
    },
    validate: ({ nickname, description, positions, proficiency }) => {
      const errors: Error<
        Pick<APIUser, "nickname" | "description" | "proficiency" | "positions">
      > = {}

      if (!nickname) {
        errors.nickname = "닉네임은 비워둘 수 없습니다."
      }
      if (nickname.length > LENGTH_LIMIT_NICKNAME) {
        errors.nickname = `${LENGTH_LIMIT_NICKNAME}자 이내로 입력해주세요.`
      }
      if (description !== null) {
        if (description.length > LENGTH_LIMIT_DESCRIPTION) {
          errors.description = `${LENGTH_LIMIT_DESCRIPTION}자 이내로 입력해주세요.`
        }
      }
      if (!proficiency) {
        errors.proficiency = "숙련도를 선택해주세요."
      }
      if (positions.length < 1) {
        errors.positions = "포지션 2개 혹은 미정을 선택해주세요."
      }

      return { ...errors }
    },
  })

  const getMyProfile = useCallback(async () => {
    try {
      const {
        data: { description, nickname, positions, proficiency, profileImage },
      } = await api.users.getMyProfile()

      setValues({ description, nickname, positions, proficiency })
      setProfileImage(profileImage)

      setIsFetching(false)
    } catch (error) {
      console.error(error)
    }
  }, [setValues])

  useEffect(() => {
    getMyProfile()
  }, [getMyProfile])

  const handleChangeProficiency = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const proficiency = target.value as Keyof<typeof proficiencyType>
      setValues((prev) => ({ ...prev, proficiency }))
    },
    []
  )

  const handleChangePositions = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedPosition = e.target.value as Keyof<typeof positionType>

      setValues((prev) => {
        switch (selectedPosition) {
          case "C":
          case "PF":
          case "PG":
          case "SF":
          case "SG":
            return {
              ...prev,
              positions: [prev.positions[1], selectedPosition],
            }
          case "TBD":
            return { ...prev, positions: [selectedPosition] }
          default:
            return { ...prev }
        }
      })
    },
    []
  )

  if (isFetching || isLoading) {
    return (
      <div style={{ height: "90vh" }}>
        <BasketballLoading />
      </div>
    )
  }

  return (
    <div>
      <form>
        <Center>
          <Spacer gap="xs">
            <UploadableArea
              inputRef={profileImageRef}
              onChangeFileSrc={(fileSrc) => setProfileImage(fileSrc)}
            >
              <Avatar
                isEdit
                src={profileImage || DEFAULT_PROFILE_IMAGE_URL}
                shape="circle"
                __TYPE="Avatar"
              />
            </UploadableArea>
            {profileImage && (
              <Button
                onClick={() => setIsOpenDefaultImageModal(true)}
                type="button"
                secondary
              >
                기본 프로필 이미지로 변경하기
              </Button>
            )}
          </Spacer>
        </Center>
        <Spacer
          gap="md"
          style={{ padding: `30px ${theme.previousTheme.gaps.base} 120px` }}
        >
          <div>
            <Input
              autoFocus
              label="닉네임"
              type="text"
              name="nickname"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              value={values.nickname}
              isRequired
              placeholder="15자 이내의 닉네임을 입력해주세요"
              max={LENGTH_LIMIT_NICKNAME + 1}
            />
            <LetterCount>
              {values.nickname.length}/{LENGTH_LIMIT_NICKNAME}
            </LetterCount>
            <ErrorMessage size="sm" block>
              {errors.nickname}
            </ErrorMessage>
          </div>
          <div>
            <Input
              label="나를 한마디로 표현해주세요"
              type="text"
              name="description"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              value={values.description ?? ""}
              placeholder="ex) 저는 주로 파워포워드로 뛰고, 당산 주변에서 게임해요. 언제든 연락주세요."
              max={LENGTH_LIMIT_DESCRIPTION + 1}
            />
            <LetterCount>
              {values.description ? values.description.length : 0}/
              {LENGTH_LIMIT_DESCRIPTION}
            </LetterCount>
            <ErrorMessage size="sm" block>
              {errors.description}
            </ErrorMessage>
          </div>
          <div>
            <Label isRequired>포지션</Label>
            <PositionsPicker
              selectedValue={values.positions}
              onChange={handleChangePositions}
            />
            <ErrorMessage size="sm" block>
              {errors.positions}
            </ErrorMessage>
          </div>
          <div>
            <Label isRequired>숙련도</Label>
            <ProficiencyPicker
              selectedValue={values.proficiency}
              onChange={handleChangeProficiency}
            />
            <ErrorMessage size="sm" block>
              {errors.proficiency}
            </ErrorMessage>
          </div>
        </Spacer>
        <BottomFixedGradient
          disabled={!!Object.keys(errors).length}
          type="submit"
          onClick={() => setIsOpenEditConfirmModal(true)}
        >
          프로필 편집 완료하기
        </BottomFixedGradient>
      </form>

      <LeadToLoginModal
        headerContent={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
            }}
          >
            기본 프로필 이미지로 변경하시겠어요?
          </div>
        }
        isOpen={isOpenDefaultImageModal}
        cancel={{
          content: "닫기",
          handle: () => {
            setIsOpenDefaultImageModal(false)
          },
        }}
        confirm={{
          content: "변경하기",
          handle: async () => {
            try {
              await deleteMyProfileImage()
              setIsOpenDefaultImageModal(false)
              setProfileImage(null)
            } catch (error) {
              console.error(error)
            }
          },
        }}
      />

      <LeadToLoginModal
        headerContent={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
            }}
          >
            프로필을 수정하시겠어요?
          </div>
        }
        isOpen={isOpenEditConfirmModal}
        cancel={{
          content: "닫기",
          handle: () => {
            setIsOpenEditConfirmModal(false)
          },
        }}
        confirm={{
          content: "수정 완료하기",
          handle: (e) => {
            try {
              handleSubmit(e)
              setIsOpenEditConfirmModal(false)
              router.replace("/user/edit")
            } catch (error) {
              console.error(error)
            }
          },
        }}
      />
    </div>
  )
}

export default ProfileForm

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const UploadableArea = styled(Upload)`
  text-align: center;
`

const LetterCount = styled(Text)`
  ${({ theme }) => css`
    &.error {
      color: ${theme.previousTheme.colors.red.strong};
    }
  `}
`

const ErrorMessage = styled(Text)`
  ${({ theme }) => css`
    text-align: right;
    flex-grow: 1;
    color: ${theme.previousTheme.colors.red.strong};
  `}
`
