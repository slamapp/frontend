import { css, Global } from "@emotion/react"
import normalize from "emotion-normalize"

const GlobalCSS = () => {
  return (
    <Global
      styles={css`
        ${normalize}

        h1,
        h2,
        h3,
        h4,
        h5, 
        h6 {
          font-size: 1em;
          font-weight: normal;
          margin: 0;
        }
        body {
          font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
            Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
            "Noto Sans KR", "Malgun Gothic", sans-serif;
          box-sizing: border-box;
        }

        a {
          color: inherit;
          text-decoration: none;
          cursor: pointer;
        }

        *:focus {
          -webkit-tap-highlight-color: transparent;
          outline: none;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
        }

        input,
        textarea,
        button,
        select,
        div,
        a {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
      `}
    />
  )
}

export default GlobalCSS
