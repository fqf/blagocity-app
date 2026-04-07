import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";
import chroma from "chroma-js";

const SearchIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 30 34" style={style}>
      <Path
        fill={chroma(fill).alpha(0.5).hex()}
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M22.702 27.702 18 23M11.667 25.667a8.667 8.667 0 1 0 0-17.334 8.667 8.667 0 0 0 0 17.334"
      />
    </Svg>
  );
};

export default SearchIcon;
