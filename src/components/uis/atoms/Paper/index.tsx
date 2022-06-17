import type { ComponentProps } from "react"
import React from "react"
import styled from "@emotion/styled"

const Paper = (props: ComponentProps<typeof Container>) => {
  return <Container {...props} />
}

export default Paper

const Container = styled.div``
