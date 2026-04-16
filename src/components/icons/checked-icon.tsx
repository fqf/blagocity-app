import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const CheckedIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg fill="none" viewBox="0 0 14 14" style={style}>
      <Path
        fill={fill}
        d="M6.003.66a6.42 6.42 0 0 1 4.205.78.583.583 0 0 1-.583 1.01 5.25 5.25 0 1 0 2.52 3.5.584.584 0 0 1 1.144-.234A6.418 6.418 0 0 1 1.795 10.75 6.417 6.417 0 0 1 6.003.659"
      />
      <Path
        fill={fill}
        d="M12.42 1.921a.584.584 0 0 1 .826.824L7.412 8.58a.583.583 0 0 1-.824 0l-1.75-1.75a.584.584 0 0 1 .824-.825L7 7.342z"
      />
    </Svg>
  );
};

export default CheckedIcon;
