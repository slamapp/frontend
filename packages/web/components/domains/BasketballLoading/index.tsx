import type { FC, ReactNode } from "react"
import { css } from "@emotion/react"
import Lottie from "lottie-react"
import * as animationData from "../../../public/assets/lottie/loader-basketball.json"

type Props = {
  children?: ReactNode
}

const BasketballLoading: FC<Props> = ({ children }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 1000;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.6);
      `}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: -90,
        }}
      >
        <div
          css={css`
            width: 150px;
            height: 150px;
            z-index: 1;
          `}
        >
          <Lottie animationData={animationData} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default BasketballLoading
