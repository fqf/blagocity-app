import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const ClockIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg fill="none" viewBox="0 0 24 24" style={style}>
      <Path fill={fill} d="M11 6a1 1 0 1 1 2 0v5.382l3.447 1.723a1 1 0 0 1-.894 1.79l-4-2A1 1 0 0 1 11 12z" />
      <Path
        fill={fill}
        d="M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0m2 0c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11"
      />
    </Svg>
  );
};

export default ClockIcon;
