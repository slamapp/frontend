import type { ComponentType } from 'react'
import { Fragment } from 'react'

interface Props {
  title?: string
  description?: string
  imageUrl?: string
  container?: ComponentType<any>
}

/**
 * @name OpenGraph
 * @description
 * 현재 페이지에 [OpenGraph](https://nowonbun.tistory.com/517) (공유 시 타이틀, 설명, 이미지) 를 적용할 수 있도록 하는 컴포넌트입니다.
 * @example
 * <OpenGraph
 *    title="같이 농구할 사람을 가장 빠르게 찾아보세요 🏀"
 *    description="가장 가까운 농구장에서 예약이 가능해요."
 *    imageUrl="https://static.slams.app/assets/basketball/200.png"
 * />
 */
const OpenGraph = ({ title, description, imageUrl, container: Container = Fragment }: Props) => {
  return (
    <Container>
      {title !== undefined && (
        <>
          <meta property="og:title" content={title} />
        </>
      )}
      {description !== undefined && (
        <>
          <meta property="og:description" content={description} />
        </>
      )}
      {imageUrl !== undefined && (
        <>
          <meta property="og:image" content={imageUrl} />
        </>
      )}
    </Container>
  )
}

export default OpenGraph
