import { useRef, FormEvent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import useForm, { Error } from "@hooks/useForm";
import { Avatar, Spacer, Upload, Button, Label, Input } from "@components/base";
import {
  BottomFixedButton,
  PositionsPicker,
  ProficiencyPicker,
  ValidationNoticeBar,
} from "@components/domain";

import { appendImageFileToFormData } from "@utils/.";
import { APIUser } from "@domainTypes/tobe/user";
import { DEFAULT_PROFILE_IMAGE_URL } from "@constants/.";
import LeadToLoginModal from "../LeadToLoginModal";

interface Props
  extends Pick<
    APIUser,
    "nickname" | "profileImage" | "description" | "proficiency" | "positions"
  > {
  onSubmit: any;
  handleDeleteProfileImage: any;
  lengthLimit: any;
  selectedProficiency: any;
  selectedPositions: any;
  setSelectedProficiency: any;
  setSelectedPositions: any;
  handleChangePositions: any;
  handleChangeProficiency: any;
}

const ProfileForm = ({
  nickname,
  profileImage,
  description,
  proficiency,
  positions,
  onSubmit,
  handleDeleteProfileImage,
  lengthLimit,
  selectedProficiency,
  selectedPositions,
  setSelectedProficiency,
  setSelectedPositions,
  handleChangePositions,
  handleChangeProficiency,
}: Props) => {
  // TODO: 리팩토링

  const router = useRouter();

  const [isOpenDeleteImageConfirmModal, setIsOpenDeleteImageConfirmModal] =
    useState<boolean>(false);
  const [isOpenEditConfirmModal, setIsOpenEditConfirmModal] =
    useState<boolean>(false);

  const profileImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedProficiency(proficiency);
    setSelectedPositions(positions);
  }, []);

  const { values, errors, isLoading, handleChange, handleSubmit } = useForm<
    Pick<APIUser, "nickname" | "description" | "proficiency" | "positions">,
    HTMLButtonElement
  >({
    initialValues: {
      nickname,
      description: description ?? "",
      proficiency,
      positions,
    },
    onSubmit: (values) => {
      const filledUserProfile = {
        ...values,
        proficiency: selectedProficiency,
        positions: selectedPositions,
      };

      const profileImageInputRef = profileImageRef?.current ?? null;
      const editedProfileImageFiles = profileImageInputRef?.files ?? null;
      const editedProfileImage = editedProfileImageFiles
        ? appendImageFileToFormData(editedProfileImageFiles[0], "image")
        : null;

      try {
        onSubmit(filledUserProfile, editedProfileImage);
      } catch (error) {
        console.log(error);
      }
    },
    validate: ({ nickname, description }) => {
      const errors: Error<
        Pick<APIUser, "nickname" | "description" | "proficiency" | "positions">
      > = {};

      if (!nickname) {
        errors.nickname = "닉네임은 비워둘 수 없습니다.";
      }
      if (nickname.length > lengthLimit.nickname) {
        errors.nickname = "15자 이내로 입력해주세요.";
      }
      if (description!.length > lengthLimit.description) {
        errors.description = "25자 이내로 입력해주세요.";
      }
      if (!selectedProficiency) {
        errors.proficiency = "숙련도를 선택해주세요.";
      }
      if (selectedPositions.length < 1) {
        errors.positions = "포지션 2개 혹은 미정을 선택해주세요.";
      }

      return errors;
    },
    confirmModal: {
      isOpenConfirmModal: isOpenEditConfirmModal,
      setIsOpenConfirmModal: setIsOpenEditConfirmModal,
    },
  });

  return (
    <div>
      <form>
        <Center>
          <Spacer gap="xs" type="vertical">
            <UploadableArea inputRef={profileImageRef}>
              {(file: File, fileSrc: string) => (
                <Avatar
                  isEdit
                  src={(fileSrc || profileImage) ?? DEFAULT_PROFILE_IMAGE_URL}
                  shape="circle"
                  __TYPE="Avatar"
                />
              )}
            </UploadableArea>
            <Button
              onClick={() => setIsOpenDeleteImageConfirmModal(true)}
              type="button"
              secondary
            >
              기본 프로필 이미지로 변경하기
            </Button>
          </Spacer>
        </Center>
        <Container gap="md" type="vertical">
          <div>
            <Input
              label="닉네임"
              type="text"
              name="nickname"
              onChange={handleChange}
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
              onChange={handleChange}
              value={values.description!}
              placeholder="ex) 저는 주로 파워포워드로 뛰고, 당산 주변에서 게임해요. 언제든 연락주세요."
            />
            <ValidationNoticeBar
              hasCount
              value={values.description!}
              limit={lengthLimit.description}
              errors={errors.description}
            />
          </div>
          <div>
            <Label isRequired>포지션</Label>
            <PositionsPicker
              selectedValue={selectedPositions}
              onChange={handleChangePositions}
            />
            <ValidationNoticeBar errors={errors.positions} />
          </div>
          <div>
            <Label isRequired>숙련도</Label>
            <ProficiencyPicker
              selectedValue={selectedProficiency}
              onChange={handleChangeProficiency}
            />
            <ValidationNoticeBar errors={errors.proficiency} />
          </div>
        </Container>
        <BottomFixedButton
          type="submit"
          onClick={(e: FormEvent<HTMLButtonElement>) => {
            handleSubmit(e);
          }}
        >
          프로필 편집 완료하기
        </BottomFixedButton>
      </form>

      <LeadToLoginModal
        headerContent={`기본 프로필 이미지로 변경하시겠어요?`}
        isOpen={isOpenDeleteImageConfirmModal}
        cancel={{
          content: "닫기",
          handle: () => {
            setIsOpenDeleteImageConfirmModal(false);
          },
        }}
        confirm={{
          content: "변경하기",
          handle: (e) => {
            try {
              handleDeleteProfileImage();
              setIsOpenDeleteImageConfirmModal(false);
              router.replace("/user/edit");
            } catch (error) {
              console.error(error);
            }
          },
        }}
      />

      <LeadToLoginModal
        headerContent={`프로필을 수정하시겠어요?`}
        isOpen={isOpenEditConfirmModal}
        cancel={{
          content: "닫기",
          handle: () => {
            setIsOpenEditConfirmModal(false);
          },
        }}
        confirm={{
          content: "수정하기",
          handle: (e) => {
            try {
              handleSubmit(e);
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
