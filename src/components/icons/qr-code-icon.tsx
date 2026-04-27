import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const QRCodeIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 24 24" style={style}>
      <Path
        fill={fill}
        d="M4 4v3h3V4zm5 3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2zM17 4v3h3V4zm5 3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2zM4 17v3h3v-3zm5 3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2zM15 21v-3a3 3 0 0 1 3-3h3a1 1 0 1 1 0 2h-3a1 1 0 0 0-1 1v3a1 1 0 1 1-2 0M20 21.01V21a1 1 0 1 1 2 0v.01a1 1 0 1 1-2 0M11 10V7a1 1 0 1 1 2 0v3a3 3 0 0 1-3 3H7a1 1 0 1 1 0-2h3a1 1 0 0 0 1-1M3.01 11a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2zM12.01 2a1 1 0 1 1 0 2H12a1 1 0 1 1 0-2zM11 16.01V16a1 1 0 1 1 2 0v.01a1 1 0 1 1-2 0M17 11a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2zM20 12.01V12a1 1 0 1 1 2 0v.01a1 1 0 1 1-2 0M11 21v-1a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0"
      />
    </Svg>
  );
};

export default QRCodeIcon;
