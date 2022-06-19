import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import styled from "@emotion/styled"
import { CourtItem, NoItemMessage } from "~/components/domains"
import { Button, Spacer } from "~/components/uis/atoms"
import { useAuthContext } from "~/contexts/hooks"
import favoriteAPI from "~/service/favoriteApi"

const SkeletonParagraph = dynamic(
  () => import("~/components/uis/atoms/Skeleton/Paragraph"),
  { ssr: false }
)

const FavoriteList = () => {
  const { authProps } = useAuthContext()

  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<
    Awaited<ReturnType<typeof favoriteAPI["getMyFavorites"]>>["data"]
  >([])

  const getPageFavorites = async () => {
    try {
      const { data } = await favoriteAPI.getMyFavorites()
      setFavorites(data)
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
      <Spacer gap="base" type="vertical">
        {[0, 1, 2].map((key) => (
          <FavoriteItem key={key}>
            <SkeletonParagraph
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
        title={"즐겨찾는 농구장이 없으시네요? 🤔"}
        type="favorite"
        description={"즐겨찾기하면 더 빠르게 예약하실 수 있어요"}
        buttonTitle={"즐겨찾는 농구장 등록하기"}
      />
    )
  }

  return (
    <Spacer
      gap="base"
      type="vertical"
      style={{
        marginTop: 56,
      }}
    >
      {favorites.map(({ id, court }) => (
        <FavoriteItem key={id}>
          <Spacer gap="xs" type="vertical">
            <CourtItem.Header>{court.name}</CourtItem.Header>
            {/* <CourtItem.Address>{"주소 넣기"}</CourtItem.Address> */}
          </Spacer>

          <Actions gap="xs">
            <ActionsLeftButtons gap="xs">
              <CourtItem.FavoritesToggle courtId={court.id} />
              <CourtItem.Share
                court={{
                  id: court.id,
                  latitude: court.latitude,
                  longitude: court.longitude,
                  name: court.name,
                }}
              />
              <CourtItem.ChatLink
                chatroomId={
                  // TODO: Court에 chatroomId 포함시키기
                  "1"
                }
              />
              <CourtItem.KakaoMapLink
                latitude={court.latitude}
                longitude={court.longitude}
                courtName={court.name}
              />
            </ActionsLeftButtons>
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

const ActionsLeftButtons = styled(Spacer)``

const FavoriteItem = styled.div`
  background-color: ${({ theme }) => theme.previousTheme.colors.white};
  border-radius: ${({ theme }) => theme.previousTheme.borderRadiuses.lg};
  padding: 20px;
`

export default FavoriteList
