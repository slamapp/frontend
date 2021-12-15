import { NextPage } from "next";
import { Spacer } from "@components/base";

const Hanna: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      수평
      <Spacer gap="base">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Spacer>
      <br />
      수직
      <Spacer gap="base" type="vertical">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Spacer>
    </div>
  );
};

export default Hanna;
