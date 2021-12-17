import React, { useEffect } from "react";
import Spacer from "@components/base/Spacer";
import Link from "next/link";
import { NextPage } from "next";
import styled from "@emotion/styled";
import { Button, Icon, Image, Text } from "@components/base";
import { useNavigationContext } from "@contexts/hooks";
import CourtItem from "../CourtItem";

interface BasketballCourt {
  favoriteId: number;
  courtId: number;
  courtName: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}
declare global {
  interface Window {
    Kakao: any;
  }
}

type BasketballCourts = BasketballCourt[];

const Favorites: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.FAVORITES);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.Kakao.isInitialized()) {
      window.Kakao.init("c6f32516ffb011a356a9f8ea036ca21f"); // TODO env 파일로 바꾸기
    }
  }, []);
  const basketballCourts = [
    {
      favoriteId: 1,
      courtId: 3,
      courtName: "용왕산 근린 공원 농구장",
      latitude: 34.567234,
      longitude: 12.493048,
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
    {
      favoriteId: 2,
      courtId: 4,
      courtName: "한강공원 농구장",
      latitude: 34.567234,
      longitude: 12.493048,
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
  ];

  if (basketballCourts.length === 0) {
    return (
      <WrapperSpacer gap="base" type="vertical">
        <Image
          width={200}
          height={200}
          mode="contain"
          src="assets/basketball/animation_off_400.png"
        ></Image>
        <Text size="md">즐겨찾는 농구장이 없으시네요? 🤔</Text>
        <TextGray size="xs">
          농구장을 즐겨찾기하시면 더 빠르게 예약하실 수 있어요
        </TextGray>
        <Link href="/courts">
          <SearchButton fullWidth>
            <SearchIcon name="compass" size="sm" color="white"></SearchIcon>내
            주변 농구장 찾기
          </SearchButton>
        </Link>
      </WrapperSpacer>
    );
  }

  return (
    <Spacer gap="base" type="vertical">
      {basketballCourts.map(
        ({ favoriteId, courtName, courtId, latitude, longitude }) => (
          <FavoriteItem key={favoriteId}>
            <Spacer gap="xs" type="vertical">
              <CourtItem.Header>{courtName}</CourtItem.Header>
              <CourtItem.Address>{"주소 넣기"}</CourtItem.Address>
            </Spacer>
            <Actions gap="xs">
              <CourtItem.FavoritesToggle courtId={courtId} />
              <CourtItem.ShareButton />
              <CourtItem.ChatLink courtId={courtId} />
              <CourtItem.KakaoMapLink
                latitude={latitude}
                longitude={longitude}
                courtName={courtName}
              />
            </Actions>
            <Link href="/">
              <LinkButton size="md">예약하러 가기</LinkButton>
            </Link>
          </FavoriteItem>
        )
      )}
    </Spacer>
  );
};

const Actions = styled(Spacer)`
  margin-top: 40px;
`;

const FavoriteItem = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadiuses.lg};
  padding: 20px;
`;

const TextGray = styled(Text)`
  color: ${({ theme }) => theme.colors.gray500};
`;

const SearchButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIcon = styled(Icon)`
  margin-right: 5px;
`;

const WrapperSpacer = styled(Spacer)`
  align-items: center;
`;

const LinkButton = styled(Button)`
  width: 225px;
  margin-top: 8px;
`;
export default Favorites;
