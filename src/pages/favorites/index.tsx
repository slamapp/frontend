import React, { useEffect } from "react";
import Spacer from "@components/base/Spacer";
import Link from "next/link";
import styled from "@emotion/styled";
import { NextPage } from "next";
import ShareButton from "@components/ShareButton";
import { useNavigationContext } from "@contexts/NavigationProvider";

interface BasketballCourt {
  favoriteId: number;
  courtId: number;
  courtName: string;
  latitude: number;
  longtitude: number;
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
    if (typeof window !== "undefined") {
      window.Kakao.init("c6f32516ffb011a356a9f8ea036ca21f"); // TODO env 파일로 바꾸기
    }
  }, []);
  const basketballCourts = [
    {
      favoriteId: 1,
      courtId: 1,
      courtName: "용왕산 근린 공원 농구장",
      latitude: 523954.0,
      longtitude: 1084098.0,
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
    {
      favoriteId: 2,
      courtId: 2,
      courtName: "백두산 근린 공원 농구장",
      latitude: 533396.88,
      longtitude: 1084098.0,
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
  ];

  if (basketballCourts.length === 0) {
    return (
      <Spacer>
        <div>즐겨찾는 농구장이 없으시네요?</div>
        <Link href="/map">
          <button>내 주변 농구장 찾기</button>
        </Link>
      </Spacer>
    );
  }

  return (
    <Spacer>
      {basketballCourts.map(
        ({ favoriteId, courtName, latitude, longtitude }) => (
          <BorderDiv key={favoriteId}>
            <p>{courtName}</p>
            <button>즐겨찾기</button>
            <Link href="/chat">
              <button>채팅</button>
            </Link>
            <ShareButton />
            <Link href="/reserve">
              <button>예약하기</button>
            </Link>
            <a
              href={`https://map.kakao.com/?urlX=${latitude}&urlY=${longtitude}&name=${courtName}`}
              target="_blank" rel="noreferrer"
            >
              <button>카카오맵</button>
            </a>
          </BorderDiv>
        )
      )}
    </Spacer>
  );
};

const BorderDiv = styled.div`
  border: 1px solid;
  margin-top: 30px;
`;

export default Favorites;
