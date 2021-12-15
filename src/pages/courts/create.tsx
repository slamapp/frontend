import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Sheet from "react-modal-sheet";
import styled from "@emotion/styled";

import { Input, Spacer, Text, Button } from "@components/base";
import { KakaoMap, GeneralMarker } from "@components/domain";
import { useForm, Error } from "@hooks/.";
import { getCurrentLocation } from "@utils/geolocation";
import { useMapContext, useNavigationContext } from "@contexts/hooks";
import { Coord } from "../../types/map";

interface Values {
  longitude?: number;
  latitude?: number;
  image: string | null;
  texture: string | null;
  basketCount: number;
  courtName: string;
}

interface Geocoder extends kakao.maps.services.Geocoder {
  coord2Address: (
    latitude: number,
    longitude: number,
    callback?: (result: any, status: any) => void
  ) => string;
  addressSearch: (
    address: string,
    callback?: (result: any, status: any) => void
  ) => void;
}

const CreateCourt: NextPage = () => {
  const { map } = useMapContext();

  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.COURT_CREATE);

  const [isOpen, setOpen] = useState(false);
  const [isAddressLoading, setIsAddressLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(3);
  const [center, setCenter] = useState<Coord>();
  const [position, setPosition] = useState<Coord>();
  const [savedPosition, setSavedPosition] = useState<Coord>();
  const [address, setAddress] = useState<string>();

  const searchAddrFromCoords = ([latitude, longitude]: Coord) => {
    const geocoder = new kakao.maps.services.Geocoder();

    setIsAddressLoading(true);
    const callback = (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        // 도로명 주소
        if (result[0].road_address) {
          setAddress(result[0].road_address.address_name);
        }
        // 법정 주소
        else if (result[0].address.address_name) {
          setAddress(result[0].address.address_name);
        }
        // 주소가 없는 경우
        else {
          setAddress("주소가 존재하지 않습니다.");
        }
      }

      setIsAddressLoading(false);
    };

    (geocoder as Geocoder).coord2Address(longitude, latitude, callback);
  };

  const onClick = (
    _: kakao.maps.Map,
    mouseEvent: kakao.maps.event.MouseEvent
  ) => {
    const { latLng } = mouseEvent;

    if (latLng) {
      setPosition([latLng.getLat(), latLng.getLng()]);
      searchAddrFromCoords([latLng.getLat(), latLng.getLng()]);
    }
  };

  const handleInitCenter = useCallback(() => {
    getCurrentLocation(([latitude, longitude]) => {
      setCenter([latitude, longitude]);
    });
  }, []);

  const handleZoomIn = useCallback(() => {
    setLevel((level) => level - 1);
  }, []);

  const handleZoomOut = useCallback(() => {
    setLevel((level) => level + 1);
  }, []);

  const savedLocation = () => {
    setOpen(false);
    setSavedPosition(position);
    setCenter(position);
  };

  useEffect(() => {
    if (center) {
      return;
    }
    handleInitCenter();
  }, [handleInitCenter]);

  const { values, errors, isLoading, handleChange, handleSubmit } =
    useForm<Values>({
      initialValues: {
        image: null,
        texture: null,
        basketCount: 1,
        courtName: "",
      },
      onSubmit: (values) => {
        if (position) {
          const [longitude, latitude] = position;
          const valuesWithPosition = {
            longitude,
            latitude,
            ...values,
          };
          alert(JSON.stringify(valuesWithPosition));
        }
      },
      validate: ({ basketCount, courtName }) => {
        const errors: Error<Values> = {};

        if (!courtName) {
          errors.courtName = "농구장 이름을 입력해주세요.";
        }
        if (!basketCount) {
          errors.basketCount = "골대 개수를 입력해주세요.";
        }
        if (!savedPosition) {
          errors.longitude = "위치를 지정해주세요.";
        }

        return errors;
      },
    });

  return (
    <div>
      <Head>
        <title>새 농구장 추가</title>
      </Head>

      <CustomSheet
        isOpen={isOpen}
        disableDrag={true}
        onClose={() => setOpen(false)}
      >
        <Sheet.Container onViewportBoxUpdate={() => {}}>
          <Sheet.Header onViewportBoxUpdate={() => {}} />
          <Sheet.Content onViewportBoxUpdate={() => {}}>
            <p style={{ textAlign: "center" }}>
              {address ?? <span>위치를 지정해주세요.</span>}
            </p>
            <button type="button" onClick={handleInitCenter}>
              현재 내 위치 받아오기
            </button>
            <button type="button" onClick={handleZoomIn}>
              확대(줌 레벨 -1)
            </button>
            <button type="button" onClick={handleZoomOut}>
              축소(줌 레벨 +1)
            </button>
            <MapContainer>
              {isOpen ? (
                <KakaoMap
                  level={level}
                  center={center!}
                  draggable={true}
                  zoomable={true}
                  onClick={onClick}
                >
                  {position ? (
                    <GeneralMarker map={map!} position={position} />
                  ) : null}
                </KakaoMap>
              ) : null}
            </MapContainer>
            <button type="button" onClick={savedLocation}>
              저장하기
            </button>
          </Sheet.Content>
        </Sheet.Container>
      </CustomSheet>

      <form onSubmit={handleSubmit}>
        <Spacer gap="md" type="vertical">
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
            <PreviewContainer>
              {savedPosition && !isOpen ? (
                <div>
                  <p>{address}</p>
                  <button type="button" onClick={() => setOpen(true)}>
                    위치 수정하기
                  </button>
                  <KakaoMap
                    level={level}
                    center={savedPosition}
                    draggable={false}
                    zoomable={false}
                    style={{ width: "100%", height: "200px" }}
                  >
                    <GeneralMarker map={map!} position={savedPosition} />
                  </KakaoMap>
                </div>
              ) : (
                <PreviewBanner>
                  <button type="button" onClick={() => setOpen(true)}>
                    위치 등록하기
                  </button>
                  {errors.longitude}
                </PreviewBanner>
              )}
            </PreviewContainer>
          </div>
          <div>
            <Input
              label="골대 개수"
              type="number"
              name="basketCount"
              min="1"
              max="99"
              onChange={handleChange}
              value={values.basketCount}
              required
            />
            <span>{errors.basketCount}</span>
          </div>
          <Button type="submit" onClick={() => {}}>
            {isLoading ? "Loading..." : "제출하기"}
          </Button>
        </Spacer>
      </form>
    </div>
  );
};

export default CreateCourt;

const PreviewContainer = styled.div`
  width: 100%;
`;

const PreviewBanner = styled.div`
  width: 100%;
  height: 100px;
  background-image: url("https://user-images.githubusercontent.com/84858773/144864259-1d91a4b2-937c-441d-bb96-22758ab90294.png");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: contrast(70%);
`;

const MapContainer = styled.div`
  height: 70%;
`;

const CustomSheet = styled(Sheet)`
  max-width: 640px;
  margin: auto;
`;
