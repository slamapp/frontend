import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";

import { useNavigationContext } from "@contexts/NavigationProvider";
import { Avatar } from "@components/base";

type IUserType = "other" | "me";
type ISkill = "BEGINNER" | "INTERMEDIATE" | "MASTER";
type IPosition = "PF" | "SF" | "SG" | "PG" | "C" | "UNDEFINED";

const User: NextPage = () => {
  const { useMountPage, changeNavigation } = useNavigationContext();
  useMountPage((page) => page.USER);

  const { asPath } = useRouter();
  const userId = Number(asPath.split("/")[2]);

  const [userType, setUserType] = useState<IUserType>("other");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // 더미 데이터
  const myUserId = 1234; // TODO: AuthContext에서 userId 가져오기
  const userInfo = {
    nickname: "slam",
    followerCount: 500,
    followingCount: 300,
    profileImage:
      "https://user-images.githubusercontent.com/84858773/145361283-80b23317-3038-42e6-a784-f82015535514.png",
    description: "내 이름은 슬램, 농구인이죠",
    skill: "BEGINNER",
    position: "PF",
    favoriteCourt: ["설악산", "한강공원", "굴다리"],
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
      changeNavigation({
        title: "내 프로필",
        isProfile: false,
      });
    } else {
      // TODO: 유저 정보 조회 API 통신으로 해당 유저 정보 받아오기
      changeNavigation({
        title: `${nickname}님의 프로필`,
      });
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
    skill,
    position,
    favoriteCourt,
  } = userInfo;

  const skillToKorean = (skill: ISkill) => {
    switch (skill) {
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

  const positionToKorean = (position: IPosition) => {
    switch (position) {
      case "PF":
        return "파워 포워드(PF)";
      case "SF":
        return "스몰 포워드(SF)";
      case "SG":
        return "슈팅 가드(SG)";
      case "PG":
        return "포인트 가드(PG)";
      case "C":
        return "센터(C)";
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

      <Center>
        <Avatar src={profileImage} shape="circle" />
        <p>{nickname}</p>
        <p>{description}</p>

        <Table>
          <thead>
            <tr>
              <th>팔로워</th>
              <th>팔로잉</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{followerCount}</td>
              <td>{followingCount}</td>
            </tr>
          </tbody>
        </Table>
        {userType === "other" ? (
          <div>
            <button onClick={handleFollow}>
              {isFollowing ? `언팔로우` : `팔로우`}
            </button>
            <button>
              <Link href={`/chat/${userId}`} passHref>
                <a>메시지</a>
              </Link>
            </button>
          </div>
        ) : (
          <div>
            <button>
              <Link href={`/user/${userId}/edit`} passHref>
                <a>프로필 편집</a>
              </Link>
            </button>
          </div>
        )}
      </Center>
      <p>숙련도</p>
      <Tag>{skillToKorean(skill as ISkill)}</Tag>
      <p>포지션</p>
      <Tag>{positionToKorean(position as IPosition)}</Tag>
      {userType === "other" ? (
        <div>
          <p>즐겨찾기 농구장</p>
          {favoriteCourt.map((court, index) => (
            <Tag key={index}>{court}</Tag>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default User;

const Tag = styled.span`
  background-color: lightgray;
  margin-right: 10px;
`;

const Center = styled.div`
  text-align: center;
`;

const Table = styled.table`
  text-align: center;
  margin: 0 auto;
`;
