import styled from "@emotion/styled";
import type { ComponentProps } from "react";
import React from "react";

const Paper = (props: ComponentProps<typeof Container>) => {
  return <Container {...props} />;
};

export default Paper;

const Container = styled.div``;
