import type { NextPage } from "next"
import { Spinner } from "@chakra-ui/react"
import { css } from "@emotion/react"

const Page: NextPage = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    `}
  >
    <Spinner />
  </div>
)

export default Page
