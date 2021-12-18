import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Sheet from "react-modal-sheet";
import styled from "@emotion/styled";

import { Input, Spacer, Text, Button, Label, Icon } from "@components/base";
import { Map, GeneralMarker, BottomFixedButton } from "@components/domain";
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

  const handleGetCurrentLocation = useCallback(() => {
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
    handleGetCurrentLocation();
  }, [handleGetCurrentLocation]);

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
          <Sheet.Content
            onViewportBoxUpdate={() => {}}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <MapGuide size="md" strong>
              <DecoIcon name="map-pin" color="#FE6D04" />
              {address ?? `지도에서 위치를 선택해주세요`}
            </MapGuide>
            {!center && <Text>현재 위치를 받아오는 중입니다.</Text>}
            {center && isOpen ? (
              <Map.KakaoMap
                level={level}
                center={center!}
                draggable={true}
                zoomable={true}
                onClick={onClick}
              >
                <Map.ZoomButton
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  bottom={120}
                />
                <Map.CurrentLocationButton
                  onGetCurrentLocation={handleGetCurrentLocation}
                  bottom={120}
                />
                {position ? (
                  <GeneralMarker map={map!} position={position} />
                ) : null}
              </Map.KakaoMap>
            ) : null}
            <BottomFixedButton
              type="button"
              disabled={!center}
              onClick={savedLocation}
            >
              농구장 위치 저장하기
            </BottomFixedButton>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onViewportBoxUpdate={() => {}} />
      </CustomSheet>

      <form onSubmit={handleSubmit}>
        <MainContainer>
          <Spacer gap="lg" type="vertical">
            <div>
              <Input
                label="농구장 이름"
                type="text"
                name="courtName"
                onChange={handleChange}
                value={values.courtName}
                placeholder="ex) 슬램대학교 상경대 앞 농구장"
                isRequired
              />
              <span>{errors.courtName}</span>
            </div>
            <div>
              <Label isRequired>위치</Label>
              <PreviewContainer>
                {savedPosition && !isOpen ? (
                  <div>
                    <AddressGuide>
                      <DecoIcon name="map-pin" color="#FE6D04" size="sm" />
                      {address}
                    </AddressGuide>
                    <div style={{ position: "relative" }}>
                      <Map.KakaoMap
                        level={level}
                        center={savedPosition}
                        draggable={false}
                        zoomable={false}
                        style={{
                          width: "100%",
                          height: "150px",
                        }}
                      >
                        <GeneralMarker map={map!} position={savedPosition} />
                      </Map.KakaoMap>
                      <MoveToMap onClick={() => setOpen(true)} />
                    </div>
                  </div>
                ) : (
                  <PreviewBanner>
                    <Button
                      size="sm"
                      type="button"
                      onClick={() => setOpen(true)}
                      style={{ zIndex: 1 }}
                    >
                      지도에서 위치 찾기
                    </Button>
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
                onChange={handleChange}
                isRequired
                value={values.basketCount}
              />
              <span>{errors.basketCount}</span>
            </div>
          </Spacer>
        </MainContainer>
        <BottomFixedButton type="submit" onClick={() => {}}>
          {isLoading ? "Loading..." : "새 농구장 추가 제안하기"}
        </BottomFixedButton>
      </form>
    </div>
  );
};

export default CreateCourt;

const MainContainer = styled.div`
  padding: ${({ theme }) => `30px ${theme.gaps.base}`};
`;

const PreviewContainer = styled.div`
  width: 100%;
`;

const PreviewBanner = styled.div`
  width: 100%;
  height: 150px;
  background-image: url("https://user-images.githubusercontent.com/84858773/144864259-1d91a4b2-937c-441d-bb96-22758ab90294.png");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: inset 0 0 20px 2px rgba(0, 0, 0, 0.2);
  }
`;

const CustomSheet = styled(Sheet)`
  max-width: 640px;
  margin: auto;
`;

const MapGuide = styled(Text)`
  margin: ${({ theme }) => theme.gaps.md};
  margin-top: 0;
`;

const DecoIcon = styled(Icon)`
  vertical-align: text-bottom;
  margin-right: ${({ theme }) => theme.gaps.xxs};
`;

const AddressGuide = styled.p`
  margin: 12px 0;
`;

const MoveToMap = styled.a`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  cursor: pointer;
`;
