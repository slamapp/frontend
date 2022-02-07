import type { ChangeEvent, FormEvent } from "react";
import { useCallback, useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import type { Error } from "@hooks/useForm";
import useForm from "@hooks/useForm";
import { Avatar, Spacer, Upload, Button, Label, Input } from "@components/base";
import {
  BottomFixedButton,
  PositionsPicker,
  ProficiencyPicker,
  ValidationNoticeBar,
} from "@components/domain";
import type { APIUser } from "@domainTypes/tobe";
import { appendImageFileToFormData } from "@utils/.";
import { DEFAULT_PROFILE_IMAGE_URL } from "@constants/.";
import { useAuthContext } from "@contexts/hooks";
import type { ProficiencyKey } from "@enums/proficiencyType";
import type { PositionKey } from "@enums/positionType";
import { userApi } from "@service/.";
import LeadToLoginModal from "../LeadToLoginModal";
import BasketballLoading from "../BasketballLoading";

const lengthLimit = {
  nickname: 15,
  description: 25,
};

const ProfileForm = () => {
  const { deleteMyProfileImage, updateMyProfileImage, updateMyProfile } =
    useAuthContext();

  const router = useRouter();

  const [isFetching, setIsFetching] = useState(true);

  const [profileImage, setProfileImage] = useState<string | null>(
    DEFAULT_PROFILE_IMAGE_URL
  );
  const [isOpenDefaultImageModal, setIsOpenDefaultImageModal] = useState(false);
  const [isOpenEditConfirmModal, setIsOpenEditConfirmModal] = useState(false);

  const profileImageRef = useRef<HTMLInputElement>(null);

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
      const profileImageInputRef = profileImageRef?.current ?? null;
      const editedProfileImageFiles = profileImageInputRef?.files ?? null;
      const editedProfileImage = editedProfileImageFiles
        ? appendImageFileToFormData(editedProfileImageFiles[0], "image")
        : null;

      try {
        if (editedProfileImage) {
          console.log(editedProfileImage);

          await updateMyProfileImage(editedProfileImage);
        }
        await updateMyProfile(values);
      } catch (error) {
        console.error(error);
      }
    },
    validate: ({ nickname, description, positions, proficiency }) => {
      const errors: Error<
        Pick<APIUser, "nickname" | "description" | "proficiency" | "positions">
      > = {};

      if (!nickname) {
        errors.nickname = "닉네임은 비워둘 수 없습니다.";
      }
      if (nickname.length > lengthLimit.nickname) {
        errors.nickname = "15자 이내로 입력해주세요.";
      }
      if (description !== null) {
        if (description.length > lengthLimit.description) {
          errors.description = "25자 이내로 입력해주세요.";
        }
      }
      if (!proficiency) {
        errors.proficiency = "숙련도를 선택해주세요.";
      }
      if (positions.length < 1) {
        errors.positions = "포지션 2개 혹은 미정을 선택해주세요.";
      }

      return { ...errors };
    },
  });

  const getMyProfile = useCallback(async () => {
    try {
      const { data } = await userApi.getMyProfile();
      const { description, nickname, positions, proficiency, profileImage } =
        data.user;

      setValues({
        description,
        nickname,
        positions,
        proficiency,
      });

      setProfileImage(profileImage);

      setIsFetching(false);
    } catch (error) {
      console.error(error);
    }
  }, [setValues]);

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  const handleChangeProficiency = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const proficiency = target.value as ProficiencyKey;
      setValues((prev) => ({ ...prev, proficiency }));
    },
    []
  );

  const handleChangePositions = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedPosition = e.target.value as PositionKey;

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
            };
          case "TBD":
            return { ...prev, positions: [selectedPosition] };
          default:
            return { ...prev };
        }
      });
    },
    []
  );

  if (isFetching || isLoading) {
    return (
      <div style={{ height: "90vh" }}>
        <BasketballLoading />
      </div>
    );
  }

  return (
    <div>
      <form>
        <Center>
          <Spacer gap="xs" type="vertical">
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
        <Container gap="md" type="vertical">
          <div>
            <Input
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
            />
            <ValidationNoticeBar
              hasCount
              value={values.nickname}
              limit={lengthLimit.nickname}
              errors={errors.nickname}
            />
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
            />
            <ValidationNoticeBar
              hasCount
              value={values.description}
              limit={lengthLimit.description}
              errors={errors.description}
            />
          </div>
          <div>
            <Label isRequired>포지션</Label>
            <PositionsPicker
              selectedValue={values.positions}
              onChange={handleChangePositions}
            />
            <ValidationNoticeBar errors={errors.positions} />
          </div>
          <div>
            <Label isRequired>숙련도</Label>
            <ProficiencyPicker
              selectedValue={values.proficiency}
              onChange={handleChangeProficiency}
            />
            <ValidationNoticeBar errors={errors.proficiency} />
          </div>
        </Container>
        <BottomFixedButton
          disabled={!!Object.keys(errors).length}
          type="submit"
          onClick={() => setIsOpenEditConfirmModal(true)}
        >
          프로필 편집 완료하기
        </BottomFixedButton>
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
            setIsOpenDefaultImageModal(false);
          },
        }}
        confirm={{
          content: "변경하기",
          handle: async () => {
            try {
              await deleteMyProfileImage();
              setIsOpenDefaultImageModal(false);
              setProfileImage(null);
            } catch (error) {
              console.error(error);
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
            setIsOpenEditConfirmModal(false);
          },
        }}
        confirm={{
          content: "수정 완료하기",
          handle: (e) => {
            try {
              handleSubmit(e);
              setIsOpenEditConfirmModal(false);
              router.replace("/user/edit");
            } catch (error) {
              console.error(error);
            }
          },
        }}
      />
    </div>
  );
};

export default ProfileForm;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled(Spacer)`
  padding: ${({ theme }) => `30px ${theme.gaps.base} 120px`};
`;

const UploadableArea = styled(Upload)`
  text-align: center;
`;
