import React, { useEffect, useState } from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import { CourtItem, NoItemMessage } from "~/components/domains"
import { Button, Skeleton, Spacer } from "~/components/uis/atoms"
import { useAuthContext } from "~/contexts/hooks"
import favoriteAPI from "~/service/favoriteApi"
import type { APIFavorite } from "~/types/domains"

const FavoriteList = () => {
  const { authProps } = useAuthContext()

  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<APIFavorite[]>([])

  const getPageFavorites = async () => {
    try {
      const { data } = await favoriteAPI.getMyFavorites()
      setFavorites(data.contents)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (authProps.currentUser) {
      getPageFavorites()
    }
  }, [authProps.currentUser])

  if (!authProps.currentUser) {
    return null
  }

  if (isLoading) {
    return (
      <Spacer gap="base" style={{ marginTop: 24 }}>
        {[0, 1, 2].map((key) => (
          <FavoriteItem key={key}>
            <Skeleton.Paragraph
              line={4}
              fontSize={20}
              lineHeight={2.0}
              lineBreak={1}
            />
          </FavoriteItem>
        ))}
      </Spacer>
    )
  }

  if (favorites.length === 0) {
    return (
      <NoItemMessage
        title="즐겨찾는 농구장이 없으시네요? 🤔"
        type="favorite"
        description="즐겨찾기하면 더 빠르게 예약하실 수 있어요"
        buttonTitle="즐겨찾는 농구장 등록하기"
      />
    )
  }

  return (
    <Spacer gap="base" style={{ marginTop: 24 }}>
      {favorites.map(({ id, court }) => (
        <FavoriteItem key={id}>
          <CourtItem.Header>{court.name}</CourtItem.Header>

          <Actions gap="xs" type="horizontal">
            <Spacer gap="xs" type="horizontal">
              <CourtItem.FavoritesToggle courtId={court.id} />
              <CourtItem.Share
                court={{
                  id: court.id,
                  latitude: court.latitude,
                  longitude: court.longitude,
                  name: court.name,
                }}
              />
              {/* <CourtItem.ChatLink
                chatroomId={
                  // TODO: Court에 chatroomId 포함시키기
                  "1"
                }
              /> */}
              <CourtItem.KakaoMapLink
                latitude={court.latitude}
                longitude={court.longitude}
                courtName={court.name}
              />
            </Spacer>
            <Link href={`/courts?courtId=${court.id}`} passHref>
              <a style={{ flex: 1, display: "flex" }}>
                <Button size="lg" style={{ flex: 1 }}>
                  예약하기
                </Button>
              </a>
            </Link>
          </Actions>
        </FavoriteItem>
      ))}
    </Spacer>
  )
}

const Actions = styled(Spacer)`
  margin-top: 40px;
  flex-flow: row wrap;
`

const FavoriteItem = styled.div`
  background-color: ${({ theme }) => theme.previousTheme.colors.white};
  border-radius: ${({ theme }) => theme.previousTheme.borderRadiuses.lg};
  padding: 20px 12px 12px 12px;
`

export default FavoriteList
