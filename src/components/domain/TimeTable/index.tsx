const ACTIVE_PEOPLE_NUMBER = 6;

const TimeTableItem: React.FC<any> = ({
  peopleCount,
  ballCount,
  users,
  onClick,
}) => {
  let color = "white";

  if (peopleCount >= ACTIVE_PEOPLE_NUMBER) {
    color = "orange";
  } else if (peopleCount > 0) {
    color = "gray";
  }

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "70%",
          height: 50,
          backgroundColor: color,
          marginLeft: "auto",
        }}
        onClick={peopleCount !== 0 ? () => onClick(users) : () => {}}
      ></div>
      <div
        style={{
          width: "10%",
          height: 50,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {peopleCount === 0 ? (
          " "
        ) : ballCount === 0 ? (
          <span>😭</span>
        ) : (
          <span>{ballCount}</span>
        )}
      </div>
    </div>
  );
};

const MainDivider = () => (
  <div
    style={{
      width: "80%",
      height: "8px",
      backgroundColor: "black",
      marginLeft: "auto",
    }}
  ></div>
);

const SubDivider = () => (
  <div
    style={{
      width: "80%",
      height: "2px",
      marginLeft: "auto",
      backgroundColor: "black",
    }}
  ></div>
);

const TimeTable: React.FC<any> = ({ timeTableArr, onClickTimeBlock }) => {
  return (
    <>
      {timeTableArr.map((item: any, index: number) => (
        <div key={index}>
          {index % 2 === 0 ? (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  fontSize: 18,
                  height: 0,
                }}
              >
                <span>{index / 2}시</span>
              </div>
              <MainDivider />
            </div>
          ) : (
            <SubDivider />
          )}
          <TimeTableItem
            key={index}
            row={index}
            peopleCount={item.peopleCount}
            ballCount={item.ballCount}
            users={item.users}
            onClick={onClickTimeBlock}
          />
          {index === timeTableArr.length - 1 ? <MainDivider /> : null}
        </div>
      ))}
    </>
  );
};

export default TimeTable;
