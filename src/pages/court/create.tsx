import Input from "@components/base/Input";
import Spacer from "@components/base/Spacer";
import Text from "@components/base/Text";
import Button from "@components/Button";
import type { NextPage } from "next";
import Head from "next/head";
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
            <Button type="button" onClick={() => alert("//TODO: 모달 띄우기")}>
              지도 맵 영역
            </Button>
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
    </div>
  );
};

export default createCourt;
