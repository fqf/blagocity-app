import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const PhotoIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 32 32" style={style}>
      <Path
        fill={fill}
        d="M26.334 12a1.167 1.167 0 0 0-1.167-1.166h-2.33a3.5 3.5 0 0 1-3.08-1.838l-.567-1.05a1.17 1.17 0 0 0-1.027-.612h-4.658a1.17 1.17 0 0 0-1.027.611L11.909 9V9a3.5 3.5 0 0 1-3.078 1.834H6.5A1.166 1.166 0 0 0 5.334 12v10.5A1.167 1.167 0 0 0 6.5 23.667h18.667a1.167 1.167 0 0 0 1.167-1.167zm-8.167 4.667a2.333 2.333 0 1 0-4.666 0 2.333 2.333 0 0 0 4.666 0m2.333 0a4.667 4.667 0 1 1-9.333 0 4.667 4.667 0 0 1 9.333 0m8.167 5.833a3.5 3.5 0 0 1-3.5 3.5H6.5A3.5 3.5 0 0 1 3 22.5V12a3.5 3.5 0 0 1 3.5-3.5h2.33a1.17 1.17 0 0 0 .942-.479l.084-.132.57-1.054v-.001A3.5 3.5 0 0 1 13.506 5h4.658a3.5 3.5 0 0 1 3.08 1.838l.568 1.05.084.133a1.17 1.17 0 0 0 .942.479h2.33a3.5 3.5 0 0 1 3.5 3.5z"
      />
    </Svg>
  );
};

export default PhotoIcon;
