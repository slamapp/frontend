import { Global, css } from "@emotion/react"

const GlobalCSS = () => {
  return (
    <Global
      styles={css`
        * {
          user-select: none;
        }

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
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
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
