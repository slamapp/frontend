import React from "react"
import type { ReactNode, HTMLAttributes } from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import { Spacer, Text, Icon, Button } from "~/components/uis/atoms"
import type { APIFavorite } from "~/types/domains"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  courtId: APIFavorite["court"]["id"]
}

const ProfileFavoritesListItem: React.FC<Props> = ({
  children,
  className,
  courtId,
}) => {
  return (
    <ListItem className={className}>
      <Spacer type="horizontal" gap={10} style={{ alignItems: "center" }}>
        <Icon name="map-pin" color="#FE6D04" />
        <Text size="base">{children}</Text>
      </Spacer>
      <div>
        <Button secondary>
          <Link href={`/courts?courtId=${courtId}`} passHref>
            <a>지도 보기</a>
          </Link>
        </Button>
      </div>
    </ListItem>
  )
}

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.gaps.xs} 0;
`

export default ProfileFavoritesListItem
