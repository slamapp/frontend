import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button, Icon, Spacer } from "@components/base";
import FollowListItem from "../FollowListItem";

interface PlayerList {
  followId: number;
  userId: number;
  nickname: string;
  isFollowed: boolean;
  profileImage: string;
}

type PlayerLists = PlayerList[];
// 리스트를 받으면 밖에서 렌더링을

const Participants = () => {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([
    {
      followId: 3,
      userId: 2,
      nickname: "hey",
      isFollowed: true,
      profileImage: "https://picsum.photos/250/250",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
    {
      userId: 4,
      nickname: "florar",
      isFollowed: false,
      profileImage: "https://a3.com",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
    {
      userId: 5,
      nickname: "jelli",
      isFollowed: false,
      profileImage: "https://a3.com",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
  ]);

  const toggleIsFollow = (userId: number) => {
    const newState = users.map((user) =>
      user.userId === userId ? { ...user, isFollowed: !user.isFollowed } : user
    );
    setUsers(newState);
  };

  return (
    <Spacer gap="lg" type="vertical">
      <div>
        <Button secondary onClick={() => {}}>
          <Icon name="users" size="sm" />6
        </Button>
      </div>
      {visible && (
        <Spacer gap="xs" type="vertical">
          {users.map(({ userId, profileImage, nickname, isFollowed }) => (
            <FollowList key={userId}>
              <FollowListItem src={profileImage} isFollowed={isFollowed}>
                {nickname}
              </FollowListItem>
            </FollowList>
          ))}
        </Spacer>
      )}
    </Spacer>
  );
};

export default Participants;

const FollowList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
