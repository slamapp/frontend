import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";

import UtilRoute from "UtilRoute";
import userApi from "@service/userApi";
import { useNavigationContext, useAuthContext } from "@contexts/hooks";
import { BasketballLoading } from "@components/domain";
import ProfileForm from "@components/domain/ProfileForm/index";
import { PositionKeyUnion, ProficiencyKeyUnion } from "@domainTypes/.";

type ResponseUserProfile = {
  nickname: string;
  profileImage: string | null;
  description: string;
  proficiency: ProficiencyKeyUnion;
  positions: PositionKeyUnion[];
};

const UserEditPage: NextPage = UtilRoute("private", () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.USER_EDIT);

  const { updateMyProfile, updateMyProfileImage, deleteMyProfileImage } =
    useAuthContext();

  const [pageUserInfo, setPageUserInfo] = useState<ResponseUserProfile | null>(
    null
  );

  const lengthLimit = {
    nickname: 15,
    description: 25,
  };

  const getMyProfile = useCallback(async () => {
    try {
      const { data } = await userApi.getMyProfile();
      setPageUserInfo(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [selectedProficiency, setSelectedProficiency] =
    useState<ProficiencyKeyUnion>(null);
  const [selectedPositions, setSelectedPositions] = useState<
    PositionKeyUnion[]
  >([]);

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

  const handleDeleteProfileImage = () => {
    deleteMyProfileImage();
  };

  const handleSubmit = async (
    editedInfo: Omit<ResponseUserProfile, "profileImage">,
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
});

export default UserEditPage;
