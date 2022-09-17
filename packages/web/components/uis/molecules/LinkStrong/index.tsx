import type { UrlObject } from "url"
import type { ReactNode } from "react"
import Link from "next/link"
import styled from "@emotion/styled"

interface Props {
  href: string | UrlObject
  children: ReactNode
}

const LinkStrong = ({ href, children }: Props) => (
  <Link href={href} passHref>
    <a>
      <Strong>{children}</Strong>
    </a>
  </Link>
)

export default LinkStrong

const Strong = styled.strong`
  :hover {
    cursor: pointer;
  }
`
