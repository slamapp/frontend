import type { ComponentPropsWithoutRef } from "react"
import { useEffect } from "react"
import type { GetServerSideProps } from "next"
import Link from "next/link"
import { Avatar, Flex, HStack, Tag, Text, VStack } from "@chakra-ui/react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Button, Icon } from "~/components/uis"
import { DEFAULT_PROFILE_IMAGE_URL } from "~/constants"
import { useAuthContext, useNavigationContext } from "~/contexts/hooks"
import {
  useFollowCancelMutation,
  useFollowCreateMutation,
} from "~/features/notifications"
import { useMyProfileQuery, useUserProfileQuery } from "~/features/users"
import { withRouteGuard } from "~/hocs"
import type { APICourt, APIUser } from "~/types/domains/objects"
import {
  getTranslatedPositions,
  getTranslatedProficiency,
} from "~/utils/userInfo"

const Page = withRouteGuard<{ userId: APIUser["id"] }>(
  "private",
  ({ userId }) => {
    const { useMountPage, setNavigationTitle } = useNavigationContext()

    const { authProps } = useAuthContext()

    useMountPage("PAGE_USER")

    const isMe = userId === authProps.currentUser?.id

    useEffect(() => {
      if (isMe) {
        setNavigationTitle(authProps.currentUser?.nickname)
      }
    }, [])

    const myProfileQuery = useMyProfileQuery({
      enabled: isMe,
      onSuccess: ({ nickname }) => setNavigationTitle(nickname),
    })
    const userProfileQuery = useUserProfileQuery(userId, {
      enabled: !isMe,
      onSuccess: ({ nickname }) => setNavigationTitle(nickname),
    })

    if (
      (isMe && myProfileQuery.isLoading) ||
      (!isMe && userProfileQuery.isLoading)
    ) {
      return <>loading...</> // TODO: Skeleton
    }

    if (isMe && myProfileQuery.isSuccess) {
      const {
        description,
        followerCount,
        followingCount,
        id,
        nickname,
        positions,
        proficiency,
        profileImage,
      } = myProfileQuery.data

      return (
        <div>
          <MainInfoContainer>
            <MainInfoArea>
              <Avatar
                size="xl"
                src={profileImage ?? DEFAULT_PROFILE_IMAGE_URL}
              />
              <StatBar>
                <div>
                  <Link href={`/user/${id}/following`}>
                    <a>
                      <dt>팔로잉</dt>
                      <dd>
                        <Text fontWeight="bold">{followingCount}</Text>
                      </dd>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href={`/user/${id}/follower`}>
                    <a>
                      <dt>팔로워</dt>
                      <dd>
                        <Text fontWeight="bold">{followerCount}</Text>
                      </dd>
                    </a>
                  </Link>
                </div>
                <div>
                  <dt>평가 점수</dt>
                  <dd
                    onClick={() => alert("개발 예정")}
                    style={{ cursor: "pointer" }}
                  >
                    6.3
                  </dd>
                </div>
              </StatBar>
            </MainInfoArea>
            <Description>{description}</Description>
            <div>
              <Link href="/user/edit" passHref>
                <a>
                  <Button fullWidth secondary>
                    프로필 편집
                  </Button>
                </a>
              </Link>
            </div>
          </MainInfoContainer>

          <VStack align="stretch" spacing="36px" p="24px 20px">
            <VStack align="stretch">
              <Text>포지션</Text>
              <HStack>
                {positions.length ? (
                  getTranslatedPositions(positions).map(
                    ({ english, korean }) => <Tag key={english}>{korean}</Tag>
                  )
                ) : (
                  <Tag>선택한 포지션이 없습니다</Tag>
                )}
              </HStack>
            </VStack>
            <VStack align="stretch">
              <Text>숙련도</Text>
              <HStack>
                <Tag>
                  {proficiency === null
                    ? "미정"
                    : getTranslatedProficiency(proficiency).korean}
                </Tag>
              </HStack>
            </VStack>
            <div>
              <Text>{isMe ? "내가" : `${nickname}님이`} 즐겨찾는 농구장</Text>
              {authProps.favorites.length ? (
                <FavoriteList
                  favoriteCourts={authProps.favorites.map(
                    ({ court: { id, name } }) => ({ id, name })
                  )}
                />
              ) : (
                <Tag>즐겨찾기한 농구장이 없습니다</Tag>
              )}
            </div>
          </VStack>
        </div>
      )
    }

    if (userProfileQuery.isSuccess) {
      const {
        description,
        followerCount,
        followingCount,
        id,
        nickname,
        positions,
        proficiency,
        profileImage,
        favoriteCourts,
        isFollowing,
      } = userProfileQuery.data

      return (
        <div>
          <MainInfoContainer>
            <MainInfoArea>
              <Avatar src={profileImage ?? DEFAULT_PROFILE_IMAGE_URL} />
              <StatBar>
                <div>
                  <Link href={`/user/${id}/following`}>
                    <a>
                      <dt>팔로잉</dt>
                      <dd>
                        <Text fontWeight="bold">{followingCount}</Text>
                      </dd>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href={`/user/${id}/follower`}>
                    <a>
                      <dt>팔로워</dt>
                      <dd>
                        <Text fontWeight="bold">{followerCount}</Text>
                      </dd>
                    </a>
                  </Link>
                </div>
                <div>
                  <dt>평가 점수</dt>
                  <dd
                    onClick={() => alert("개발 예정")}
                    style={{ cursor: "pointer" }}
                  >
                    6.3
                  </dd>
                </div>
              </StatBar>
            </MainInfoArea>
            <Description>{description}</Description>
            {!isMe ? (
              <ButtonContainer>
                <Link href={`/chat/${id}`} passHref>
                  <a style={{ width: "100%" }}>
                    <Button fullWidth secondary>
                      메시지
                    </Button>
                  </a>
                </Link>
                <FollowButton
                  isFollowing={isFollowing}
                  receiverId={id}
                  refetch={() => {
                    userProfileQuery.refetch()
                  }}
                />
              </ButtonContainer>
            ) : (
              <div>
                <Link href="/user/edit" passHref>
                  <a>
                    <Button fullWidth secondary>
                      프로필 편집
                    </Button>
                  </a>
                </Link>
              </div>
            )}
          </MainInfoContainer>

          <VStack align="stretch" spacing="36px" p="24px 20px">
            <VStack align="stretch">
              <Text>포지션</Text>
              <HStack>
                {positions.length ? (
                  getTranslatedPositions(positions).map(
                    ({ english, korean }) => <Tag key={english}>{korean}</Tag>
                  )
                ) : (
                  <Tag>선택한 포지션이 없습니다</Tag>
                )}
              </HStack>
            </VStack>
            <VStack align="stretch">
              <Text>숙련도</Text>
              <HStack>
                <Tag>
                  {proficiency === null
                    ? "미정"
                    : getTranslatedProficiency(proficiency).korean}
                </Tag>
              </HStack>
            </VStack>
            <div>
              <Text>{isMe ? "내가" : `${nickname}님이`} 즐겨찾는 농구장</Text>
              {favoriteCourts.length ? (
                <FavoriteList favoriteCourts={favoriteCourts} />
              ) : (
                <Tag>등록한 농구장이 없습니다</Tag>
              )}
            </div>
          </VStack>
        </div>
      )
    }

    return null
  }
)

export default Page

export const getServerSideProps: GetServerSideProps<
  ComponentPropsWithoutRef<typeof Page>
> = async ({ query }) => ({
  props: { userId: query.userId as APIUser["id"] },
})

const FavoriteList = ({
  favoriteCourts,
}: {
  favoriteCourts: Pick<APICourt, "id" | "name">[]
}) => {
  return (
    <>
      {favoriteCourts.map((court) => (
        <Flex key={court.id} justify="space-between" align="center" py="8px">
          <HStack spacing="10px">
            <Icon name="map-pin" color="#FE6D04" />
            <Text size="base">{court.name}</Text>
          </HStack>

          <Link
            href={{ pathname: "/map", query: { courtId: court.id } }}
            passHref
          >
            <a>
              <Button secondary>지도 보기</Button>
            </a>
          </Link>
        </Flex>
      ))}
    </>
  )
}

const FollowButton = ({
  isFollowing,
  receiverId,
  refetch,
}: {
  isFollowing: boolean
  receiverId: APIUser["id"]
  refetch: () => void
}) => {
  const followCreateMutation = useFollowCreateMutation()
  const followCancelMutation = useFollowCancelMutation()

  return (
    <Button
      fullWidth
      loading={followCreateMutation.isLoading || followCancelMutation.isLoading}
      disabled={
        followCreateMutation.isLoading || followCancelMutation.isLoading
      }
      tertiary={isFollowing}
      onClick={() => {
        if (isFollowing) {
          followCancelMutation.mutate({ receiverId }, { onSuccess: refetch })
        } else {
          followCreateMutation.mutate({ receiverId }, { onSuccess: refetch })
        }
      }}
    >
      {isFollowing ? `팔로잉` : `팔로우`}
    </Button>
  )
}

const MainInfoContainer = styled.div`
  ${({ theme }) => css`
    padding: ${theme.gaps.lg} ${theme.gaps.base} ${theme.gaps.md};
    transition: background 200ms;
  `}
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MainInfoArea = styled(FlexContainer)`
  ${({ theme }) => css`
    padding: 0 ${theme.gaps.xs};
  `}
`

const ButtonContainer = styled(FlexContainer)`
  ${({ theme }) => css`
    gap: 0 ${theme.gaps.xs};
  `}
`

const StatBar = styled.dl`
  ${({ theme }) => css`
    display: flex;
    text-align: center;
    margin: 0;
    flex-grow: 1;
    margin-left: ${theme.gaps.lg};
    justify-content: space-evenly;

    dd {
      box-sizing: border-box;
      margin: 0;
      font-weight: bold;
      padding: ${theme.gaps.xs} 0;
    }
  `}
`

const Description = styled.div`
  ${({ theme }) => css`
    margin: ${theme.gaps.md} 0;
    line-height: 1.4;
  `}
`
