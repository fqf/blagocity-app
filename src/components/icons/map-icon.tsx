import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import TIconProps from "@/models/types/icon-props";
import chroma from "chroma-js";
import COLORS from "@/constants/colors";

const MapIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 30 30" style={style}>
      <Path
        fill={chroma(fill).alpha(0.5).hex()}
        d="M17.633 6.941a2.5 2.5 0 0 0 2.235 0l4.573-2.287a1.25 1.25 0 0 1 1.809 1.12v15.955a1.25 1.25 0 0 1-.691 1.117l-5.692 2.847a2.5 2.5 0 0 1-2.235 0l-5.265-2.633a2.5 2.5 0 0 0-2.235 0L5.56 25.348a1.25 1.25 0 0 1-1.809-1.122V8.273a1.25 1.25 0 0 1 .691-1.118l5.692-2.846a2.5 2.5 0 0 1 2.235 0z"
      />
      <Path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18.75 7.205v18.75M11.25 4.045v18.75"
      />
    </Svg>
  );
};

export default MapIcon;
