import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const GearIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg fill="none" viewBox="0 0 20 20" style={style}>
      <Path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.667"
        d="M8.06 3.447a1.95 1.95 0 0 1 3.882 0 1.95 1.95 0 0 0 2.765 1.595 1.95 1.95 0 0 1 1.942 3.361 1.95 1.95 0 0 0 0 3.193 1.95 1.95 0 0 1-1.942 3.36 1.95 1.95 0 0 0-2.765 1.596 1.95 1.95 0 0 1-3.883 0 1.95 1.95 0 0 0-2.766-1.595 1.95 1.95 0 0 1-1.942-3.361 1.95 1.95 0 0 0 0-3.193 1.95 1.95 0 0 1 1.94-3.36 1.95 1.95 0 0 0 2.767-1.596"
      />
      <Path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.667"
        d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
      />
    </Svg>
  );
};

export default GearIcon;
