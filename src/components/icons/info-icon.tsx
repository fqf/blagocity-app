import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const InfoIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 20 20" style={style}>
      <Path
        fill={fill}
        d="M17.5 10a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0m1.667 0A9.167 9.167 0 1 1 .832 10a9.167 9.167 0 0 1 18.335 0"
      />
      <Path
        fill={fill}
        d="M9.167 13.333V10a.833.833 0 1 1 1.666 0v3.333a.834.834 0 1 1-1.666 0M10.009 5.834a.833.833 0 0 1 0 1.666H10a.833.833 0 1 1 0-1.666z"
      />
    </Svg>
  );
};

export default InfoIcon;
