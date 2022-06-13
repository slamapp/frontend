import styled from "@emotion/styled";

const Icon = styled.i`
  display: inline-block;
  vertical-align: middle;
`;

interface Props {
  size?: number;
  color?: string;
  loading?: boolean;
}

const Spinner = ({ size = 24, color = "#919EAB", loading = true }: Props) => {
  const sizeStyle = {
    width: size,
    heigth: size,
  };

  return loading ? (
    <Icon>
      <svg
        version="1.1"
        id="L2"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 100 100"
        style={sizeStyle}
      >
        <circle
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeMiterlimit={10}
          cx="50"
          cy="50"
          r="48"
        />
        <line
          fill="none"
          strokeLinecap="round"
          stroke={color}
          strokeWidth={4}
          strokeMiterlimit={10}
          x1="50"
          y1="50"
          x2="85"
          y2="50.5"
        >
          <animateTransform
            attributeName="transform"
            dur="2s"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </line>
        <line
          fill="none"
          strokeLinecap="round"
          stroke={color}
          strokeWidth={4}
          strokeMiterlimit={10}
          x1="50"
          y1="50"
          x2="49.5"
          y2="74"
        >
          <animateTransform
            attributeName="transform"
            dur="15s"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </line>
      </svg>
    </Icon>
  ) : null;
};

export default Spinner;
