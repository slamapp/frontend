import React, { useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Button, IconButton, Spacer, Text } from "@components/base";

interface PlayerList {
  followId: number;
  userId: number;
  nickname: string;
  isFollowed: boolean;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
}

type PlayerLists = PlayerList[];

const Participants = () => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState([
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
    const newState = state.map((_state) =>
      _state.userId === userId
        ? { ..._state, isFollowed: !_state.isFollowed }
        : _state
    );
    setState(newState);
  };

  return (
    <Spacer gap="lg" type="vertical">
      <div>
        {visible ? (
          <IconButton
            name="users"
            type="button"
            onClick={() => setVisible(!visible)}
          ></IconButton>
        ) : (
          <IconButton
            name="users"
            type="button"
            onClick={() => setVisible(!visible)}
          ></IconButton>
        )}
      </div>
      {visible && (
        <Spacer gap="xs" type="vertical">
          {state.map(({ userId, profileImage, nickname, isFollowed }) => (
            <FollowLists className="follow-list" key={userId}>
              <FollowList>
                <Avatar shape="circle" size={36} src={profileImage} />
                <Text size="base" strong>
                  {nickname}
                </Text>
              </FollowList>
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

const FollowList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;
