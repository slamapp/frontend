import { useState, useCallback } from "react";
import Input from "@components/base/Input";
import Spacer from "@components/base/Spacer";
import Text from "@components/base/Text";
import Button from "@components/Button";
import type { NextPage } from "next";
import Head from "next/head";
import Sheet from "react-modal-sheet";
import KakaoMap from "@components/KakaoMap";
import styled from "@emotion/styled";
import { DEFAULT_POSITION } from "@utils/geolocation";
import useForm from "../../hooks/useForm";

interface Values {
  longitude: number;
  latitude: number;
  image: string | null;
  texture: string | null;
  basketCount: string; // TODO: 백엔드에 string으로 수정 요청
  courtName: string;
}

const createCourt: NextPage = () => {
  const [isOpen, setOpen] = useState(false);
  const [level, setLevel] = useState<number>(3);
  const [center, setCenter] = useState<Coord>(DEFAULT_POSITION);
  const [position, setPosition] = useState<Coord>();

  const onClick = (
    _: kakao.maps.Map,
    mouseEvent: kakao.maps.event.MouseEvent
  ) => {
    const { latLng } = mouseEvent;

    if (latLng) {
      setPosition([latLng.getLat(), latLng.getLng()]);
    }
  };

  const { values, errors, isLoading, handleChange, handleSubmit } =
    useForm<Values>({
      initialValues: {
        longitude: 0,
        latitude: 0,
        image: null,
        texture: null,
        basketCount: "1",
        courtName: "",
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values));
      },
      validate: ({
        // longitude,
        // latitude,
        // image,
        // texture,
        basketCount,
        courtName,
      }) => {
        const errors: Partial<Values> = {};

        if (!courtName) {
          errors.courtName = "농구장 이름을 입력해주세요.";
        }
        if (!basketCount) {
          errors.basketCount = "골대 개수를 입력해주세요.";
        }

        return errors;
      },
    });

  return (
    <div>
      <Head>
        <title>새 농구장 추가</title>
      </Head>

      <form onSubmit={handleSubmit}>
        <Spacer size={24} type="vertical">
          <div>
            <Input
              label="농구장 이름"
              type="text"
              name="courtName"
              onChange={handleChange}
              value={values.courtName}
            />
            <span>{errors.courtName}</span>
          </div>
          <div>
            <Text>위치</Text>
            <MapContainer>
              {values.longitude && values.latitude ? (
                <KakaoMap level={level} center={center} />
              ) : (
                <div>
                  <button type="button" onClick={() => setOpen(true)}>
                    지도 맵 영역
                  </button>
                </div>
              )}
            </MapContainer>
          </div>
          <div>
            <Input
              label="골대 개수"
              type="number"
              name="courtCount"
              min="0"
              max="100"
              onChange={handleChange}
              value={values.basketCount}
              required
            />
            <span>{errors.basketCount}</span>
          </div>
          <Button type="submit">{isLoading ? "Loading..." : "제출하기"}</Button>
        </Spacer>
      </form>

      <CustomSheet
        isOpen={isOpen}
        disableDrag={true}
        springConfig={{ from: 0 }}
        onClose={() => setOpen(false)}
      >
        <Sheet.Container>
          <Sheet.Content>
            {/* <KakaoMap></KakaoMap> */}
            <div style={{ height: "70%" }}>모달</div>
            <button type="button" onClick={() => setOpen(false)}>
              저장하기
            </button>
          </Sheet.Content>
        </Sheet.Container>
      </CustomSheet>
    </div>
  );
};

export default createCourt;

const MapContainer = styled.div`
  width: 100%;
  height: 100px;

  & > div {
    width: 100%;
    height: 100%;
    background-image: url("https://user-images.githubusercontent.com/84858773/144864259-1d91a4b2-937c-441d-bb96-22758ab90294.png");
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: contrast(70%);
  }
`;

const CustomSheet = styled(Sheet)`
  max-width: 640px;
  margin: auto;

  .react-modal-sheet-container {
    box-shadow: none !important;
    border-radius: 0 !important;
    background-color: #fafafa !important;
    height: 100vh !important;
  }import { DEFAULT_POSITION } from '@utils/geolocation';
import { DEFAULT_POSITION } from '@utils/geolocation';

`;
