import { css, useTheme } from '@emotion/react'
import { ErrorMessage } from '~/components/domains'

const Custom404 = () => {
  const theme = useTheme()

  return (
    <div
      css={css`
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 ${theme.gaps.base};
      `}
    >
      <ErrorMessage title="원하시는 페이지를 찾을 수 없어요 🤔" />
    </div>
  )
}

export default Custom404
