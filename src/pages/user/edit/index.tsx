import { useState, useCallback, ChangeEvent } from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "@emotion/styled";

// import UtilRoute from "UtilRoute";
import { useNavigationContext } from "@contexts/NavigationProvider";
import useForm, { Error } from "@hooks/useForm";
import { Avatar, Spacer, Upload } from "@components/base";
import Input from "@components/base/Input";
import {
  PositionKeyUnion,
  ProficiencyKeyUnion,
} from "@components/domain/UserInfoPicker/types";
import {
  PositionsPicker,
  ProficiencyPicker,
} from "../../../components/domain/UserInfoPicker";

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
    profileImage:
      "https://user-images.githubusercontent.com/84858773/145361283-80b23317-3038-42e6-a784-f82015535514.png",
    description: "내 이름은 슬램, 농구인이죠",
    proficiency: "BEGINNER",
    positions: ["PF", "SF"],
  };

  const { nickname, profileImage, description, proficiency, positions } =
    userInfo;

  const [selectedProficiency, setSelectedProficiency] =
    useState<ProficiencyKeyUnion>(proficiency);
  const [selectedPositions, setSelectedPositions] =
    useState<PositionKeyUnion[]>(positions);

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
      validate: ({ nickname }) => {
        const errors: Error<Values> = {};

        if (!nickname) {
          errors.nickname = "닉네임을 한 글자 이상 입력해주세요.";
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

      <Center>
        <Upload>
          <Avatar edit src={profileImage!} shape="circle" __TYPE="Avatar" />
          {/* 에러 임시 처리 */}
        </Upload>
        <button>기본 프로필 이미지로 변경하기</button>
      </Center>
      <form onSubmit={handleSubmit}>
        <Spacer size={24} type="vertical">
          <div>
            <Input
              label="닉네임"
              type="text"
              name="nickname"
              onChange={handleChange}
              value={values.nickname}
              block
            />
            <p>{errors.nickname}</p>
          </div>
          <div>
            <Input
              label="나를 한마디로 표현해주세요"
              type="text"
              name="description"
              onChange={handleChange}
              value={values.description}
              block
            />
            <p>{errors.description}</p>
          </div>
          <div>
            <p>숙련도</p>
            <ProficiencyPicker
              selectedValue={selectedProficiency}
              onChange={handleChangeProficiency}
            />
            <span>{errors.proficiency}</span>
          </div>
          <div>
            <p>포지션</p>
            <PositionsPicker
              selectedValue={selectedPositions}
              onChange={handleChangePositions}
            />
            <span>{errors.positions}</span>
          </div>
        </Spacer>
        <button>프로필 편집 완료하기</button>
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
