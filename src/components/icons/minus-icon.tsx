import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";

const MinusIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 16 2" style={style}>
      <Path stroke={fill} strokeLinecap="round" strokeWidth="2" d="M1 1h14" />
    </Svg>
  );
};

export default MinusIcon;
