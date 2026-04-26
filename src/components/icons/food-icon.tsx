import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const FoodIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 24 24" style={style}>
      <Path
        fill={fill}
        d="M2 9V2a1 1 0 0 1 2 0v7c0 .548.452 1 1 1h4a1 1 0 0 0 1-1V2a1 1 0 1 1 2 0v7a3 3 0 0 1-3 3H5c-1.652 0-3-1.348-3-3"
      />
      <Path
        fill={fill}
        d="M6 22V2a1 1 0 0 1 2 0v20a1 1 0 1 1-2 0M20 22v-6h-2c-1.652 0-3-1.348-3-3V7a6 6 0 0 1 6-6 1 1 0 0 1 1 1v20a1 1 0 1 1-2 0m-3-9c0 .548.452 1 1 1h2V3.128A4 4 0 0 0 17 7z"
      />
    </Svg>
  );
};

export default FoodIcon;
