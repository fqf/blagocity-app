import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const ElectronicsIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 24 24" style={style}>
      <Path
        fill={fill}
        d="M17 8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8a1 1 0 1 1 0 2H4a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v2a1 1 0 1 1-2 0"
      />
      <Path fill={fill} d="M9 15.04a1 1 0 1 1 2 0V19a1 1 0 0 1-2 0z" />
      <Path
        fill={fill}
        d="M12 18a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2zM21 14a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm2 6a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3z"
      />
    </Svg>
  );
};

export default ElectronicsIcon;
