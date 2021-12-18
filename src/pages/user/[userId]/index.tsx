import { useEffect, useState, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import userApi from "@service/userApi";
import UtilRoute from "UtilRoute";
import {
  Avatar,
  Button,
  Label,
  Spacer,
  Chip,
  LinkStrong,
} from "@components/base";
import { useNavigationContext, useAuthContext } from "@contexts/hooks";
import {
  ProfileFavoritesListItem,
  ProficiencyKeyUnion,
  PositionKeyUnion,
} from "@components/domain";
import { getTranslatedPositions } from "@utils/userInfo";

type ResponseUserProfile = {
  createdAt: string;
  updatedAt: string;
  userId: number;
  nickname: string;
  followerCount: number;
  followingCount: number;
  profileImage: string;
  description: string;
  proficiency: string;
  positions: PositionKeyUnion[];
  favoriteCourts: [
    {
      courtId: number;
      courtName: string;
    },
    {
      courtId: number;
      courtName: string;
    }
  ];
};

const User: NextPage = UtilRoute("private", () => {
  const {
    navigationProps,
    useMountPage,
    setNavigationTitle,
    useDisableTopTransparent,
  } = useNavigationContext();

  const { authProps } = useAuthContext();

  const { userId, nickname: myNickname } = authProps.currentUser;

  useMountPage((page) => page.USER);
  useDisableTopTransparent();

  const { query } = useRouter();
  const { userId: stringQueryUserId } = query;
  const queryUserId = Number(stringQueryUserId);

  const [isMe, setIsMe] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [pageUserInfo, setPageUserInfo] = useState<ResponseUserProfile | null>(
    null
  );
  const [isServerError, setIsServerError] = useState(false);

  const getMyProfile = useCallback(async () => {
    try {
      const data = await userApi.getMyProfile<ResponseUserProfile>();
      setPageUserInfo(data);
    } catch (error) {
      setIsServerError(true);
      console.error(error);
    }
  }, []);

  const getOtherProfile = useCallback(async () => {
    try {
      const data = await userApi.getUserProfile<ResponseUserProfile>(
        queryUserId
      );
      setPageUserInfo(data);
    } catch (error) {
      setIsServerError(true);
      console.error(error);
    }
  }, [queryUserId]);

  useEffect(() => {
    setNavigationTitle(`${pageUserInfo?.nickname}`);
  }, [pageUserInfo?.nickname, setNavigationTitle]);

  useEffect(() => {
    if (queryUserId === userId) {
      getMyProfile();
    } else {
      getOtherProfile();
    }
  }, [userId, getMyProfile, getOtherProfile, queryUserId]);

  if (isServerError) {
    return <>네트워크에 문제가 있습니다. 나중에 다시 접속해주세요</>;
  }

  if (pageUserInfo === null) {
    return <>Loading</>;
  }

  const {
    nickname,
    profileImage,
    followingCount,
    followerCount,
    description,
    positions,
  } = pageUserInfo;

  return (
    <div>
      <Head>
        <title>{nickname}님의 프로필 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>

      <MainInfoContainer
        isBackgroundTransparent={navigationProps.isTopTransparent}
      >
        <MainInfoArea>
          <Avatar src={profileImage} shape="circle" />
          <StatBar>
            <div>
              <dt>팔로잉</dt>
              <dd>
                <LinkStrong href={`user/${userId}/following`}>
                  {followingCount}
                </LinkStrong>{" "}
              </dd>
            </div>
            <div>
              <dt>팔로워</dt>
              <dd>{followerCount}</dd>
            </div>
            <div>
              <dt>평가 점수</dt>
              <dd
                onClick={() => alert("개발 예정")}
                style={{ cursor: "pointer" }}
              >
                ?
              </dd>
            </div>
          </StatBar>
        </MainInfoArea>
        <Description>{description}</Description>
        {!isMe ? (
          <ButtonContainer>
            <Button fullWidth secondary>
              <Link href={`/chat/${userId}`} passHref>
                <a>메시지</a>
              </Link>
            </Button>
            <Button fullWidth tertiary={isFollowing}>
              {isFollowing ? `팔로잉` : `팔로우`}
            </Button>
          </ButtonContainer>
        ) : (
          <div>
            <Button fullWidth secondary>
              <Link href={`/user/edit`} passHref>
                <a>프로필 편집</a>
              </Link>
            </Button>
          </div>
        )}
      </MainInfoContainer>
      <AdditionalInfoSpacer gap="base" type="vertical">
        <div>
          <Label>포지션</Label>
          <Spacer gap="xs">
            {getTranslatedPositions(positions).map(({ english, korean }) => {
              console.log(english, korean);

              return (
                <Chip key={english} secondary>
                  {korean}
                </Chip>
              );
            })}
          </Spacer>
        </div>
        <div>
          <Label>숙련도</Label>
          <Chip secondary>
            {/* {proficiencyToKorean(proficiency as ProficiencyKeyUnion)} */}
          </Chip>
        </div>
        <div>
          <Label>{isMe ? "내가" : `${nickname}님이`} 즐겨찾는 농구장</Label>
          {/* {favoriteCourts.length < 1 ? (
            <Chip secondary>정보 없음</Chip>
          ) : (
            favoriteCourts.map(({ courtId, courtName }) => (
              <ProfileFavoritesListItem key={courtId} courtId={courtId}>
                {courtName}
              </ProfileFavoritesListItem>
            ))
          )} */}
        </div>
      </AdditionalInfoSpacer>
    </div>
  );
});

export default User;

const MainInfoContainer = styled.div<{ isBackgroundTransparent: boolean }>`
  ${({ theme, isBackgroundTransparent }) => css`
    padding: ${theme.gaps.lg} ${theme.gaps.base} ${theme.gaps.md};
    background: rgba(255, 255, 255, ${isBackgroundTransparent ? 0 : 1});
    transition: background 200ms;
  `}
`;

const AdditionalInfoSpacer = styled(Spacer)`
  ${({ theme }) => css`
    padding: ${theme.gaps.md} ${theme.gaps.base};
  `}
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainInfoArea = styled(FlexContainer)`
  ${({ theme }) => css`
    padding: 0 ${theme.gaps.xs};
  `}
`;

const ButtonContainer = styled(FlexContainer)`
  ${({ theme }) => css`
    gap: 0 ${theme.gaps.xs};
  `}
`;

const StatBar = styled.dl`
  ${({ theme }) => css`
    display: flex;
    text-align: center;
    margin: 0;
    flex-grow: 1;
    margin-left: ${theme.gaps.lg};
    justify-content: space-evenly;

    dd {
      box-sizing: border-box;
      margin: 0;
      font-weight: bold;
      padding: ${theme.gaps.xs} 0;
    }
  `}
`;

const Description = styled.div`
  ${({ theme }) => css`
    margin: ${theme.gaps.md} 0;
    line-height: 1.4;
  `}
`;
