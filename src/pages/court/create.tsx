import Input from "@components/base/Input";
import Spacer from "@components/base/Spacer";
import Text from "@components/base/Text";
import Button from "@components/Button";
import type { NextPage } from "next";
import Head from "next/head";

const createCourt: NextPage = () => {
  return (
    <div>
      <Head>
        <title>새 농구장 추가</title>
      </Head>
      <form>
        <Spacer size={24} type="vertical">
          <Input label="농구장 이름" type="text" name="courtName" block />
          <Text>위치</Text>
          <div
            style={{ width: "100%", height: "200px", background: "lightblue" }}
          >
            지도 맵 영역
          </div>
          <Input
            label="골대 개수"
            type="number"
            name="courtCount"
            min="0"
            max="100"
            required
          />
          <Button type="submit">제출하기</Button>
        </Spacer>
      </form>
    </div>
  );
};

export default createCourt;
