import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";

const ChevronIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 28 28" fill="none" style={style}>
      <Path stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.333" d="m17.5 21-7-7 7-7" />
    </Svg>
  );
};

export default ChevronIcon;
