import { useState, useCallback, ChangeEvent, MouseEvent } from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "@emotion/styled";

import useForm, { Error } from "@hooks/useForm";
import { useNavigationContext } from "@contexts/hooks";
import { Avatar, Spacer, Upload, Button, Label, Input } from "@components/base";
import {
  BottomFixedButton,
  PositionsPicker,
  ProficiencyPicker,
  ValidationNoticeBar,
  PositionKeyUnion,
  ProficiencyKeyUnion,
} from "@components/domain";

interface Values {
  nickname: string;
  profileImage: string | null;
  description: string;
  proficiency: ProficiencyKeyUnion;
  positions: PositionKeyUnion[];
}

const UserEditPage: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.USER_EDIT);

  // 더미 데이터
  const userInfo: Values = {
    nickname: "slam",
    profileImage: null,
    description: "내 이름은 슬램, 농구인이죠",
    proficiency: "BEGINNER",
    positions: ["PF", "SF"],
  };

  const baseProfileImageUrl = "/assets/default_profile.svg";

  const { nickname, profileImage, description, proficiency, positions } =
    userInfo;

  const [selectedProficiency, setSelectedProficiency] =
    useState<ProficiencyKeyUnion>(proficiency);
  const [selectedPositions, setSelectedPositions] =
    useState<PositionKeyUnion[]>(positions);

  const lengthLimit = {
    nickname: 15,
    description: 25,
  };

  const handleChangeProficiency = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedProficiency(e.target.value as ProficiencyKeyUnion);
    },
    []
  );

  const handleChangePositions = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "TBD") {
        setSelectedPositions([e.target.value]);
      } else {
        setSelectedPositions([
          selectedPositions[1],
          e.target.value as PositionKeyUnion,
        ]);
      }
    },
    [selectedPositions]
  );

  const handleDeleteProfileImage = (e: MouseEvent<HTMLButtonElement>) => {
    alert("프로필 이미지 삭제 API");
  };

  const { values, errors, isLoading, handleChange, handleSubmit } =
    useForm<Values>({
      initialValues: {
        nickname,
        profileImage,
        description,
        proficiency,
        positions,
      },
      onSubmit: (values) => {
        const valueWithPosition = {
          ...values,
          proficiency: selectedProficiency,
          positions: selectedPositions,
        };
        alert(JSON.stringify(valueWithPosition));
      },
      validate: ({ nickname, description }) => {
        const errors: Error<Values> = {};

        if (!nickname) {
          errors.nickname = "닉네임은 비워둘 수 없습니다.";
        }
        if (nickname.length > lengthLimit.nickname) {
          errors.nickname = "15자 이내로 입력해주세요.";
        }
        if (description.length > lengthLimit.description) {
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
    <div>
      <Head>
        <title>프로필 편집 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>

      <form onSubmit={handleSubmit}>
        <Center>
          <Spacer gap="xs" type="vertical">
            <Upload style={{ textAlign: "center" }}>
              <Avatar
                isEdit
                src={profileImage ?? baseProfileImageUrl}
                shape="circle"
                __TYPE="Avatar"
              />
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
              value={values.description}
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
            <Label isRequired>숙련도</Label>
            <ProficiencyPicker
              selectedValue={selectedProficiency}
              onChange={handleChangeProficiency}
            />
            <ValidationNoticeBar
              errors={errors.proficiency}
            ></ValidationNoticeBar>
          </div>
          <div>
            <Label isRequired>포지션</Label>
            <PositionsPicker
              selectedValue={selectedPositions}
              onChange={handleChangePositions}
            />
            <ValidationNoticeBar
              errors={errors.positions}
            ></ValidationNoticeBar>
          </div>
        </Container>
        <BottomFixedButton type="submit" onClick={() => {}}>
          프로필 편집 완료하기
        </BottomFixedButton>
      </form>
    </div>
  );
};

export default UserEditPage;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled(Spacer)`
  padding: ${({ theme }) => `30px ${theme.gaps.base} 120px`};
`;
