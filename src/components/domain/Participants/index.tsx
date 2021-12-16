import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button, IconButton, Spacer } from "@components/base";
import FollowList from "../FollowList/index";

interface PlayerList {
  followId: number;
  userId: number;
  nickname: string;
  isFollowed: boolean;
  profileImage: string;
}

type PlayerLists = PlayerList[];

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
        {!visible ? (
          <IconButton
            name="users"
            type="button"
            onClick={() => setVisible(!visible)}
          />
        ) : (
          <IconButton
            name="users"
            type="button"
            onClick={() => setVisible(!visible)}
          />
        )}
      </div>
      {visible && (
        <Spacer gap="xs" type="vertical">
          {users.map(({ userId, profileImage, nickname, isFollowed }) => (
            <FollowLists key={userId}>
              <FollowList src={profileImage}>{nickname}</FollowList>
              <div>
                {isFollowed ? (
                  <Button onClick={() => toggleIsFollow(userId)}>팔로잉</Button>
                ) : (
                  <Button onClick={() => toggleIsFollow(userId)} secondary>
                    팔로우
                  </Button>
                )}
              </div>
            </FollowLists>
          ))}
        </Spacer>
      )}
    </Spacer>
  );
};

export default Participants;

const FollowLists = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
