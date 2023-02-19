import { css, useTheme } from '@emotion/react'
import { ErrorMessage } from '~/components/domains'

const Custom500 = () => {
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
      <ErrorMessage title="시스템 문제로 페이지를 표시할 수 없어요 😥" />
    </div>
  )
}

export default Custom500
