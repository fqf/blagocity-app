import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";

const LocationIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 16 16" style={style}>
      <Path fill={fill} fillRule="evenodd" d="M6 9.5 0 5.65 15.55 0" clipRule="evenodd" />
      <Path fill={fill} fillRule="evenodd" d="m6 9.5 3.9 6.05L15.55 0" clipRule="evenodd" />
    </Svg>
  );
};

export default LocationIcon;
