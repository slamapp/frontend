import React, { useState } from "react";

interface PlayerList {
  userId: number;
  userImageUrl: string;
  userName: string;
  isFollow: boolean;
}

type PlayerLists = PlayerList[];

const Participants = () => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState([
    {
      userId: 1,
      userImageUrl: "img1",
      userName: "참가자1",
      isFollow: true,
    },
    {
      userId: 2,
      userImageUrl: "img2",
      userName: "참가자2",
      isFollow: false,
    },
    {
      userId: 3,
      userImageUrl: "img3",
      userName: "참가자3",
      isFollow: true,
    },
    {
      userId: 4,
      userImageUrl: "img4",
      userName: "참가자4",
      isFollow: false,
    },
  ]);

  const toggleIsFollow = (userId: number) => {
    const newState = state.map((_state) =>
      _state.userId === userId
        ? { ..._state, isFollow: !_state.isFollow }
        : _state
    );
    setState(newState);
  };

  return (
    <>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "함께하는 사람 숨기기" : "함께하는 사람 보기"}
      </button>
      {visible && (
        <div>
          {state.map(({ userId, userImageUrl, userName, isFollow }) => (
            <div key={userId}>
              <p>
                {userImageUrl}
                {userName}
                <button onClick={() => toggleIsFollow(userId)}>
                  {isFollow ? "팔로잉" : "팔로우"}
                </button>
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Participants;
