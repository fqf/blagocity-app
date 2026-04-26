import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const LabelIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 24 24" style={style}>
      <Path
        fill={fill}
        d="M1 11.172V4a3 3 0 0 1 3-3h7.172a3 3 0 0 1 2.121.879l8.706 8.706a3.427 3.427 0 0 1 0 4.83l-6.584 6.584a3.427 3.427 0 0 1-4.83 0l-8.706-8.706A3 3 0 0 1 1 11.172m2 0 .005.098a1 1 0 0 0 .288.609l8.702 8.702.105.094a1.426 1.426 0 0 0 1.905-.094l6.578-6.578a1.426 1.426 0 0 0 0-2.006l-8.704-8.704a1 1 0 0 0-.608-.288L11.17 3H4a1 1 0 0 0-1 1z"
      />
      <Path fill={fill} d="M7.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
      <Path fill={fill} d="M7.5 7a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1m1.5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
    </Svg>
  );
};

export default LabelIcon;
