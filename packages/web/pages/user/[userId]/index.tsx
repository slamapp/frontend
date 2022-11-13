import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Avatar, Box, Flex, HStack, Tag, Text, VStack } from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Icon, Skeleton } from "~/components/uis"
import { DEFAULT_PROFILE_IMAGE_URL } from "~/constants"
import { key } from "~/features"
import { useGetFavoritesQuery } from "~/features/favorites"
import {
  useFollowCancelMutation,
  useFollowCreateMutation,
} from "~/features/notifications"
import {
  useCurrentUserQuery,
  useMyProfileQuery,
  useUserProfileQuery,
} from "~/features/users"
import { withSuspense } from "~/hocs"
import { Navigation } from "~/layouts/Layout/navigations"
import type { APICourt, APIUser } from "~/types/domains/objects"
import type {
  positionType,
  proficiencyType,
} from "~/types/domains/objects/user"
import type { Keyof, ValueOf } from "~/types/helpers"

const Page = withSuspense(
  () => {
    const router = useRouter()
    const userId = router.query.userId as string

    const queryClient = useQueryClient()
    const currentUserQuery = useCurrentUserQuery()
    const getFavoritesQuery = useGetFavoritesQuery()

    const isMe =
      currentUserQuery.isSuccess && userId === currentUserQuery.data.id

    const myProfileQuery = useMyProfileQuery({
      enabled: !currentUserQuery.isLoading && isMe,
    })

    const userProfileQuery = useUserProfileQuery(userId, {
      enabled: !currentUserQuery.isLoading && !isMe,
    })

    const followCreateMutation = useFollowCreateMutation()
    const followCancelMutation = useFollowCancelMutation()

    if (isMe && myProfileQuery.isSuccess && getFavoritesQuery.isSuccess) {
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
        <PageContents
          user={{
            id,
            profileImage,
            description,
            nickname,
            positions,
            proficiency,
          }}
          followerCount={followerCount}
          followingCount={followingCount}
          favoriteCourts={getFavoritesQuery.data.contents.map(({ court }) => ({
            id: court.id,
            name: court.name,
          }))}
          buttonArea={
            <Link href="/user/edit" passHref>
              <Button fullWidth>프로필 편집</Button>
            </Link>
          }
        />
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
        <PageContents
          user={{
            id,
            profileImage,
            description,
            nickname,
            positions,
            proficiency,
          }}
          followerCount={followerCount}
          followingCount={followingCount}
          favoriteCourts={favoriteCourts}
          buttonArea={
            <Flex gap="8px">
              <Link href={`/chat/${id}`} passHref style={{ width: "100%" }}>
                <Button fullWidth>메시지</Button>
              </Link>
              <Button
                fullWidth
                loading={
                  followCreateMutation.isLoading ||
                  followCancelMutation.isLoading
                }
                disabled={
                  followCreateMutation.isLoading ||
                  followCancelMutation.isLoading
                }
                scheme={isFollowing ? "black" : "white"}
                onClick={() =>
                  (isFollowing
                    ? followCancelMutation
                    : followCreateMutation
                  ).mutate(
                    { receiverId: userId },
                    {
                      onSuccess: () =>
                        queryClient.invalidateQueries({
                          queryKey: key.users.otherProfile(userId),
                          exact: true,
                        }),
                    }
                  )
                }
              >
                {isFollowing ? `팔로잉` : `팔로우`}
              </Button>
            </Flex>
          }
        />
      )
    }

    return null
  },
  () => {
    const theme = useTheme()

    return (
      <VStack
        align="stretch"
        p={`${theme.gaps.lg} ${theme.gaps.base} ${theme.gaps.md}`}
      >
        <Flex justify="space-between" align="center">
          <Skeleton.Circle size={96} />
          <HStack spacing="16px">
            <VStack>
              <Skeleton.Box width={30} height={14} />
              <Skeleton.Box width={42} height={20} />
            </VStack>
            <VStack>
              <Skeleton.Box width={30} height={14} />
              <Skeleton.Box width={42} height={20} />
            </VStack>
          </HStack>
        </Flex>
        <Skeleton.Box width="100%" height={32} />
        <VStack align="stretch" spacing="36px" p="24px 20px">
          <VStack align="stretch">
            <Skeleton.Box width={30} height={14} />
            <HStack>
              <Skeleton.Box width={42} height={20} />
              <Skeleton.Box width={42} height={20} />
            </HStack>
          </VStack>
          <VStack align="stretch">
            <Skeleton.Box width={30} height={14} />
            <HStack>
              <Skeleton.Box width={42} height={20} />
            </HStack>
          </VStack>
          <VStack align="stretch">
            <Skeleton.Box width={30} height={14} />
            <HStack>
              <Skeleton.Circle size={36} />
              <Box flex={1}>
                <Skeleton.Paragraph line={1} />
              </Box>
              <Skeleton.Box width={42} height={20} />
            </HStack>
            <HStack>
              <Skeleton.Circle size={36} />
              <Box flex={1}>
                <Skeleton.Paragraph line={1} />
              </Box>
              <Skeleton.Box width={42} height={20} />
            </HStack>
            <HStack>
              <Skeleton.Circle size={36} />
              <Box flex={1}>
                <Skeleton.Paragraph line={1} />
              </Box>
              <Skeleton.Box width={42} height={20} />
            </HStack>
            <HStack>
              <Skeleton.Circle size={36} />
              <Box flex={1}>
                <Skeleton.Paragraph line={1} />
              </Box>
              <Skeleton.Box width={42} height={20} />
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    )
  }
)

export default Page

const PageContents = ({
  user,
  followingCount,
  followerCount,
  favoriteCourts,
  buttonArea,
}: {
  user: Pick<
    APIUser,
    | "profileImage"
    | "id"
    | "description"
    | "positions"
    | "proficiency"
    | "nickname"
  >
} & {
  followingCount: number
  followerCount: number
  favoriteCourts: Pick<APICourt, "id" | "name">[]
  buttonArea: ReactNode
}) => {
  const theme = useTheme()

  return (
    <Navigation top={{ isBack: true, isMenu: true, title: user.nickname }}>
      <VStack
        align="stretch"
        p={`${theme.gaps.lg} ${theme.gaps.base} ${theme.gaps.md}`}
      >
        <VStack align="stretch">
          <Flex justify="space-between" align="center">
            <Avatar
              size="xl"
              src={user.profileImage ?? DEFAULT_PROFILE_IMAGE_URL}
            />
            <Flex
              textAlign="center"
              flexGrow={1}
              justify="space-evenly"
              css={css`
                dd {
                  box-sizing: border-box;
                  margin: 0;
                  font-weight: bold;
                  padding: ${theme.gaps.xs} 0;
                }
              `}
            >
              <div>
                <Link href={`/user/${user.id}/following`}>
                  <dt>팔로잉</dt>
                  <dd>
                    <Text fontWeight="bold">{followingCount}</Text>
                  </dd>
                </Link>
              </div>
              <div>
                <Link href={`/user/${user.id}/follower`}>
                  <dt>팔로워</dt>
                  <dd>
                    <Text fontWeight="bold">{followerCount}</Text>
                  </dd>
                </Link>
              </div>
            </Flex>
          </Flex>
          <div
            css={css`
              margin: ${theme.gaps.md} 0;
              line-height: 1.4;
            `}
          >
            {user.description}
          </div>
        </VStack>
        {buttonArea}
        <VStack align="stretch" spacing="36px" pt="24px">
          <VStack align="stretch">
            <Text>포지션</Text>
            <HStack>
              {user.positions.length ? (
                getTranslatedPositions(user.positions).map(
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
                {user.proficiency === null
                  ? "미정"
                  : getTranslatedProficiency(user.proficiency).korean}
              </Tag>
            </HStack>
          </VStack>
          <VStack align="stretch">
            <Text>즐겨찾는 농구장</Text>
            {favoriteCourts.length === 0 ? (
              <HStack>
                <Tag>등록한 농구장이 없습니다</Tag>
              </HStack>
            ) : (
              <VStack spacing="4px" align="stretch">
                {favoriteCourts.map((court) => (
                  <Flex
                    key={court.id}
                    justify="space-between"
                    align="center"
                    py="8px"
                  >
                    <HStack spacing="10px">
                      <Icon name="map-pin" color="#FE6D04" />
                      <Text size="base">{court.name}</Text>
                    </HStack>

                    <Link
                      href={{ pathname: "/map", query: { courtId: court.id } }}
                      passHref
                    >
                      <Button>지도 보기</Button>
                    </Link>
                  </Flex>
                ))}
              </VStack>
            )}
          </VStack>
        </VStack>
      </VStack>
    </Navigation>
  )
}

const getTranslatedProficiency = (
  englishProficiency: Keyof<typeof proficiencyType>
): {
  english: Keyof<typeof proficiencyType>
  korean: ValueOf<typeof proficiencyType>
} => {
  switch (englishProficiency) {
    case "BEGINNER":
      return {
        english: englishProficiency,
        korean: "뉴비",
      }

    case "INTERMEDIATE":
      return {
        english: englishProficiency,
        korean: "중수",
      }
    case "MASTER":
      return {
        english: englishProficiency,
        korean: "고수",
      }

    default:
      return {
        english: englishProficiency,
        korean: "뉴비",
      }
  }
}

const getKoreanPosition = (englishPosition: Keyof<typeof positionType>) => {
  switch (englishPosition) {
    case "C":
      return "센터"
    case "PF":
      return "파워포워드"
    case "SF":
      return "스몰포워드"
    case "PG":
      return "포인트가드"
    case "SG":
      return "슈팅가드"
    default:
      return "미정"
  }
}

export const getTranslatedPositions = (
  englishPositions: Keyof<typeof positionType>[]
): {
  english: Keyof<typeof positionType>
  korean: ValueOf<typeof positionType>
}[] =>
  englishPositions.map((english) => ({
    english,
    korean: getKoreanPosition(english),
  }))
