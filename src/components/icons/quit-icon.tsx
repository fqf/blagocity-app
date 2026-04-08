import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";

const QuitIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg fill="none" viewBox="0 0 20 20" style={style}>
      <Path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.667"
        d="M13.333 14.167 17.5 10l-4.167-4.167M17.5 10h-10M7.5 17.5H4.167A1.667 1.667 0 0 1 2.5 15.833V4.167A1.667 1.667 0 0 1 4.167 2.5H7.5"
      />
    </Svg>
  );
};

export default QuitIcon;
