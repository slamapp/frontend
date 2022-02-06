import type { ChangeEvent } from "react";
import { useState, useCallback, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { withRouteGuard } from "@hocs/.";
import userApi from "@service/userApi";
import { useNavigationContext, useAuthContext } from "@contexts/hooks";
import { BasketballLoading } from "@components/domain";
import ProfileForm from "@components/domain/ProfileForm/index";
import type { PositionKey, ProficiencyKey } from "@enums/.";
import type { APIUser } from "@domainTypes/tobe";

const UserEditPage: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage("PAGE_USER_EDIT");

  const { updateMyProfile, updateMyProfileImage, deleteMyProfileImage } =
    useAuthContext();

  const [pageUserInfo, setPageUserInfo] = useState<Pick<
    APIUser,
    "nickname" | "profileImage" | "description" | "proficiency" | "positions"
  > | null>(null);

  const lengthLimit = {
    nickname: 15,
    description: 25,
  };

  const getMyProfile = useCallback(async () => {
    try {
      const { data } = await userApi.getMyProfile();

      const { description, nickname, positions, proficiency, profileImage } =
        data.user;

      setPageUserInfo({
        description,
        nickname,
        positions,
        proficiency,
        profileImage,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [selectedProficiency, setSelectedProficiency] =
    useState<ProficiencyKey>(null);
  const [selectedPositions, setSelectedPositions] = useState<PositionKey[]>([]);

  const handleChangeProficiency = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedProficiency(e.target.value as ProficiencyKey);
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
          e.target.value as PositionKey,
        ]);
      }
    },
    [selectedPositions]
  );

  const handleDeleteProfileImage = () => {
    deleteMyProfileImage();
  };

  const handleSubmit = async (
    editedInfo: Pick<
      APIUser,
      "nickname" | "description" | "proficiency" | "positions"
    >,
    editedProfileImage: File
  ) => {
    if (editedProfileImage) {
      await updateMyProfileImage(editedProfileImage);
    }
    await updateMyProfile(editedInfo);
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  if (pageUserInfo === null) {
    return <BasketballLoading />;
  }

  const { nickname, profileImage, description, proficiency, positions } =
    pageUserInfo;

  return (
    <div>
      <Head>
        <title>프로필 편집 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>

      <ProfileForm
        nickname={nickname}
        profileImage={profileImage}
        description={description}
        proficiency={proficiency}
        positions={positions}
        onSubmit={handleSubmit}
        handleDeleteProfileImage={handleDeleteProfileImage}
        lengthLimit={lengthLimit}
        selectedProficiency={selectedProficiency}
        selectedPositions={selectedPositions}
        setSelectedProficiency={setSelectedProficiency}
        setSelectedPositions={setSelectedPositions}
        handleChangePositions={handleChangePositions}
        handleChangeProficiency={handleChangeProficiency}
      />
    </div>
  );
};

export default withRouteGuard("private", UserEditPage);
