const ACTIVE_NUMBER = 6;

const TimeTableItem: React.FC<any> = ({ number, row }) => {
  let color = "white";

  if (number >= ACTIVE_NUMBER) {
    color = "orange";
  } else if (number > 0) {
    color = "gray";
  }

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "80%",
          height: 50,
          backgroundColor: color,
          marginLeft: "auto",
        }}
      ></div>
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

const TimeTable: React.FC<any> = ({ timeTableArr }) => {
  return (
    <>
      {timeTableArr.map((number: any, index: number) => (
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
          <TimeTableItem key={index} row={index} number={number} />
          {index === timeTableArr.length - 1 ? <MainDivider /> : null}
        </div>
      ))}
    </>
  );
};

export default TimeTable;
