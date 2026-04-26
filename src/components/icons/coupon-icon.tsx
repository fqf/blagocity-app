import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const CouponIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 24 24" style={style}>
      <Path
        fill={fill}
        d="M21 7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v1.128a3.998 3.998 0 0 1 0 7.743V17a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1.129a3.997 3.997 0 0 1 0-7.743zm2 2a1 1 0 0 1-1 1 2 2 0 0 0 0 4 1 1 0 0 1 1 1v2a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-2a1 1 0 0 1 1-1 2 2 0 0 0 0-4 1 1 0 0 1-1-1V7a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3z"
      />
      <Path
        fill={fill}
        d="M12 7V5a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0M12 19v-2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0M12 13v-2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0"
      />
    </Svg>
  );
};

export default CouponIcon;
