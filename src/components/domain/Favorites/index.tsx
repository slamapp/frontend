import React, { useEffect } from "react";
import Spacer from "@components/base/Spacer";
import Link from "next/link";
import { NextPage } from "next";
import styled from "@emotion/styled";

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
      courtId: 1,
      courtName: "용왕산 근린 공원 농구장",
      latitude: 523954.0,
      longitude: 1084098.0,
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
    {
      favoriteId: 2,
      courtId: 2,
      courtName: "백두산 근린 공원 농구장",
      latitude: 533396.88,
      longitude: 1084098.0,
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
  ];

  if (basketballCourts.length === 0) {
    return (
      <Spacer gap="base">
        <div>즐겨찾는 농구장이 없으시네요?</div>
        <Link href="/courts">
          <button>내 주변 농구장 찾기</button>
        </Link>
      </Spacer>
    );
  }

  return (
    <Spacer gap="base" type="vertical">
      {basketballCourts.map(
        ({ favoriteId, courtName, courtId, latitude, longitude }) => (
          <FavoriteItem key={favoriteId}>
            <CourtItem.Header
              courtName={courtName}
              address={
                "실제 주소로 대체실제 주소로 대체실제 주소로 대체실제 주소로 대체실제 주소로 대체실제 주소로 대체실제 주소로 대체대체실제 주소로 대체실제 주소로 대체대체실제 주소로 대체실제 주소로 대체대체실제 주소로 대체실제 주소로 대체대체실제 주소로 대체실제 주소로 대체대체실제 주소로 대체실제 주소로 대체대체실제 주소로 대체실제 주소로 대체"
              }
            />
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

export default Favorites;
