import React, { useEffect } from "react";
import Spacer from "@components/base/Spacer";
import Link from "next/link";
import styled from "@emotion/styled";
import { NextPage } from "next";
import ShareButton from "@components/ShareButton";
import { useNavigationContext } from "@contexts/NavigationProvider";

interface BasketballCourt {
  id: number;
  name: string;
  address: string;
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
      id: 1,
      name: "용왕산 근린 공원 농구장",
      address: "서울 양천구 신곡 2동 3002번지 19번지 19번지 19번지 199-51",
    },
    {
      id: 2,
      name: "백두산 근린 공원 농구장",
      address: "서울 양천구 신곡 2동 3002번지 19번지 19번지 19번지 199-51",
    },
    {
      id: 3,
      name: "북한산 근린 공원 농구장",
      address: "서울 양천구 신곡 2동 3002번지 19번지 19번지 19번지 199-51",
    },
  ];

  if (basketballCourts.length === 0) {
    return (
      <Spacer>
        <div>즐겨찾는 농구장이 없으시네요?</div>
        <Link href="/map">
          <button>나의 농구장 찾기</button>
        </Link>
      </Spacer>
    );
  }

  return (
    <Spacer>
      {basketballCourts.map(({ id, name, address }) => (
        <BorderDiv key={id}>
          <p>{name}</p>
          <p>{address}</p>
          <button>즐겨찾기</button>
          <Link href="/chat">
            <button>채팅</button>
          </Link>
          <ShareButton />
          <Link href="/reserve">
            <button>예약하기</button>
          </Link>
        </BorderDiv>
      ))}
    </Spacer>
  );
};

const BorderDiv = styled.div`
  border: 1px solid;
  margin-top: 30px;
`;

export default Favorites;
