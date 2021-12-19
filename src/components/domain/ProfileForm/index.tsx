import { FormEvent, useEffect } from "react";
import styled from "@emotion/styled";

import useForm, { Error } from "@hooks/useForm";
import { Avatar, Spacer, Upload, Button, Label, Input } from "@components/base";
import {
  BottomFixedButton,
  PositionsPicker,
  ProficiencyPicker,
  ValidationNoticeBar,
  PositionKeyUnion,
  ProficiencyKeyUnion,
} from "@components/domain";

type ResponseUserProfile = {
  nickname: string;
  profileImage: string | null;
  description: string | null;
  proficiency: ProficiencyKeyUnion;
  positions: PositionKeyUnion[];
};

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
}: any) => {
  // 임시 방편
  useEffect(() => {
    setSelectedProficiency(proficiency);
    setSelectedPositions(positions);
  }, []);

  const { values, errors, isLoading, handleChange, handleSubmit } = useForm<
    ResponseUserProfile,
    HTMLButtonElement
  >({
    initialValues: {
      nickname,
      profileImage,
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

      try {
        onSubmit(filledUserProfile);
      } catch (error) {
        console.log(error);
      }
    },
    validate: ({ nickname, description }) => {
      const errors: Error<ResponseUserProfile> = {};

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
      if (!selectedPositions) {
        errors.positions = "포지션 2개 혹은 미정을 선택해주세요.";
      }

      return errors;
    },
  });

  return (
    <form>
      <Center>
        <Spacer gap="xs" type="vertical">
          <Upload style={{ textAlign: "center" }}>
            <Avatar isEdit src={profileImage} shape="circle" __TYPE="Avatar" />
          </Upload>
          <Button onClick={handleDeleteProfileImage} type="button" secondary>
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
          <ValidationNoticeBar errors={errors.positions}></ValidationNoticeBar>
        </div>
        <div>
          <Label isRequired>숙련도</Label>
          <ProficiencyPicker
            selectedValue={selectedProficiency}
            onChange={handleChangeProficiency}
          />
          <ValidationNoticeBar
            errors={errors.proficiency}
          ></ValidationNoticeBar>
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
