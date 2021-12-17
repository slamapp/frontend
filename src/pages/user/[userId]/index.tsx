import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Avatar, Button, Label, Spacer, Chip } from "@components/base";
import { useNavigationContext, useAuthContext } from "@contexts/hooks";
import { ProfileFavoritesListItem } from "@components/domain";

type IUserType = "other" | "me";
type IProficiency = "BEGINNER" | "INTERMEDIATE" | "MASTER" | null;
type IPositions = "PF" | "SF" | "SG" | "PG" | "C" | "TBD";

const User: NextPage = () => {
  const { useMountPage, setNavigationTitle } = useNavigationContext();
  const { authProps } = useAuthContext();
  const { userId: authContextUserId } = authProps.currentUser;

  useMountPage((page) => page.USER);

  const { query } = useRouter();
  const { userId: stringUserId } = query;
  const userId = Number(stringUserId);

  const [userType, setUserType] = useState<IUserType>("other");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // 더미 데이터
  const myUserId = 1; // TODO: AuthContext에서 userId 가져오기
  const userInfo = {
    userId: 1,
    nickname: "슬램",
    followerCount: 500,
    followingCount: 300,
    profileImage:
      "https://user-images.githubusercontent.com/84858773/145361283-80b23317-3038-42e6-a784-f82015535514.png",
    description:
      "저는 농구할 때 파워포워드를 주로 하고, 당산 주변에서 주로 게임해요. 언제든지 연락 주세요.",
    proficiency: null,
    positions: null,
    favoriteCourts: [
      {
        courtId: 1,
        courtName: "용왕산 공원 농구장",
      },
      {
        courtId: 2,
        courtName: "설악산 공원 농구장",
      },
      {
        courtId: 3,
        courtName: "북한산 공원 농구장",
      },
    ],
  };
  const follows = [
    {
      userId: 12345,
    },
    {
      userId: 12346,
    },
  ];

  useEffect(() => {
    // TODO: path의 userId와 AuthContext의 userId 비교하기
    if (userId === myUserId) {
      setUserType("me");
      setNavigationTitle(`${nickname}`);
    } else {
      // TODO: 유저 정보 조회 API 통신으로 해당 유저 정보 받아오기
      setNavigationTitle(`${nickname}`);
    }

    // TODO: 내가 팔로우한 유저 목록 받아오기
    if (follows.some((followUser) => userId === followUser.userId)) {
      setIsFollowing(true);
    }
  }, [userId]);

  const {
    nickname,
    followerCount,
    followingCount,
    profileImage,
    description,
    proficiency,
  } = userInfo;

  const positions = userInfo.positions ?? ["TBD"];
  const favoriteCourts = userInfo.favoriteCourts ?? [];

  const proficiencyToKorean = (proficiency: IProficiency) => {
    switch (proficiency) {
      case "BEGINNER":
        return "뉴비";
      case "INTERMEDIATE":
        return "중수";
      case "MASTER":
        return "고수";
      default:
        return "정보 없음";
    }
  };

  const positionsToKorean = (positions: IPositions) => {
    switch (positions) {
      case "PF":
        return "파워포워드";
      case "SF":
        return "스몰포워드";
      case "SG":
        return "슈팅가드";
      case "PG":
        return "포인트가드";
      case "C":
        return "센터";
      default:
        return "미정";
    }
  };

  const handleFollow = () => {
    if (isFollowing) {
      // TODO: 팔로우 취소 API 보내기
      setIsFollowing(false);
    } else {
      // TODO: 팔로우 맺기 API 보내기
      setIsFollowing(true);
    }
  };

  return (
    <div>
      <Head>
        <title>{nickname}님의 프로필 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>

      <MainInfoContainer>
        <MainInfoArea>
          <Avatar src={profileImage} shape="circle" />
          <StatBar>
            <div>
              <dt>팔로잉</dt>
              <dd>{followingCount}</dd>
            </div>
            <div>
              <dt>팔로워</dt>
              <dd>{followerCount}</dd>
            </div>
            <div>
              <dt>평가 점수</dt>
              <dd>?</dd>
            </div>
          </StatBar>
        </MainInfoArea>
        <Description>{description}</Description>
        {userType === "other" ? (
          <ButtonContainer>
            <Button fullWidth secondary>
              <Link href={`/chat/${userId}`} passHref>
                <a>메시지</a>
              </Link>
            </Button>
            <Button fullWidth tertiary={isFollowing} onClick={handleFollow}>
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
      <AdditionalInfoContainer gap="base" type="vertical">
        <div>
          <Label>포지션</Label>
          <Spacer gap="xs">
            {positions.map((position, index) => (
              <Chip key={index} secondary>
                {positionsToKorean(position as IPositions)}
              </Chip>
            ))}
          </Spacer>
        </div>
        <div>
          <Label>숙련도</Label>
          <Chip secondary>
            {proficiencyToKorean(proficiency as IProficiency)}
          </Chip>
        </div>
        <div>
          <Label>
            {userType === "me" ? "내가" : `${nickname}님이`} 즐겨찾는 농구장
          </Label>
          {favoriteCourts.length < 1 ? (
            <Chip secondary>정보 없음</Chip>
          ) : (
            favoriteCourts.map(({ courtId, courtName }) => (
              <ProfileFavoritesListItem key={courtId} courtId={courtId}>
                {courtName}
              </ProfileFavoritesListItem>
            ))
          )}
        </div>
      </AdditionalInfoContainer>
    </div>
  );
};

export default User;

const MainInfoContainer = styled.div`
  ${({ theme }) => css`
    padding: ${theme.gaps.lg} ${theme.gaps.base} ${theme.gaps.md};
    background: ${theme.colors.white};
  `}
`;

const AdditionalInfoContainer = styled(Spacer)`
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
