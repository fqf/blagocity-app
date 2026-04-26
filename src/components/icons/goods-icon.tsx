import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const GoodsIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 24 24" style={style}>
      <Path
        fill={fill}
        d="M7 10a1 1 0 0 1 2 0 3 3 0 0 0 6 0 1 1 0 1 1 2 0 5 5 0 0 1-10 0M20.897 5.034a1 1 0 1 1 0 2H3.103a1 1 0 0 1 0-2z"
      />
      <Path
        fill={fill}
        d="M20 6.667a1 1 0 0 0-.2-.6l-2-2.667A1 1 0 0 0 17 3H7a1 1 0 0 0-.8.4l-2 2.667a1 1 0 0 0-.2.6V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1zM22 20a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6.667a3 3 0 0 1 .6-1.8l2-2.667A3 3 0 0 1 7 1h10a3 3 0 0 1 2.4 1.2l2 2.667a3 3 0 0 1 .6 1.8z"
      />
    </Svg>
  );
};

export default GoodsIcon;
