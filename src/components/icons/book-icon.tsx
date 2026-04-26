import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const BookIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 24 24" style={style}>
      <Path fill={fill} d="M11 21V7a1 1 0 1 1 2 0v14a1 1 0 1 1-2 0" />
      <Path
        fill={fill}
        d="M16 4a3 3 0 0 0-3 3 1 1 0 1 1-2 0 3 3 0 0 0-3-3H3v13h6a4 4 0 0 1 3 1.355q.082-.094.172-.183A4 4 0 0 1 15 17h6V4zm7 13a2 2 0 0 1-2 2h-6a2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5a5 5 0 0 1 4 2.001A5 5 0 0 1 16 2h5a2 2 0 0 1 2 2z"
      />
    </Svg>
  );
};

export default BookIcon;
