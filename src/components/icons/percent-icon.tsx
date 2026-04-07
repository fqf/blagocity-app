import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import chroma from "chroma-js";

const PercentIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 30 30" style={style}>
      <Path stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m23.75 6.25-17.5 17.5" />
      <Path
        fill={chroma(fill).alpha(0.5).hex()}
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8.125 11.25a3.125 3.125 0 1 0 0-6.25 3.125 3.125 0 0 0 0 6.25M21.875 25a3.125 3.125 0 1 0 0-6.25 3.125 3.125 0 0 0 0 6.25"
      />
    </Svg>
  );
};

export default PercentIcon;
