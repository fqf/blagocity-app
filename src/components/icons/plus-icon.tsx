import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";

const PlusIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 16 16" style={style}>
      <Path stroke={fill} strokeLinecap="round" strokeWidth="2" d="M1 8h14M8 1v14" />
    </Svg>
  );
};

export default PlusIcon;
