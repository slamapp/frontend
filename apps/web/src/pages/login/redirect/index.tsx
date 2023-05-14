import type { NextPage } from 'next'
import { css } from '@emotion/react'
import { Spinner } from '~/components/common'

const Page: NextPage = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    `}
  >
    <Spinner />
  </div>
)

export default Page
