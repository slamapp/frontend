import { HourProps } from "../type";

const Hour: React.FC<HourProps> = ({ hour }) => (
  <div>
    {hour}
    <span>시</span>
  </div>
);

export default Hour;
