import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";

const LikeIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 20 20" style={style}>
      <Path
        fill={fill}
        d="M12.48 2.64a5.41 5.41 0 0 1 6.687 5.277c0 2.287-1.506 3.934-2.745 5.172l-.01.01-4.576 4.428a2.5 2.5 0 0 1-2.85.59 2.5 2.5 0 0 1-.809-.575L3.587 13.1l-.01-.01C2.34 11.852.835 10.213.835 7.917a5.417 5.417 0 0 1 9.165-3.91 5.4 5.4 0 0 1 2.48-1.367M2.5 7.917c0 1.532.988 2.725 2.246 3.984l4.59 4.443.043.044a.832.832 0 0 0 1.25-.008l.048-.051 4.577-4.428C16.51 10.643 17.5 9.44 17.5 7.917v-.004a3.743 3.743 0 0 0-6.536-2.505l-.014.014a1.303 1.303 0 0 1-1.91-.011 3.752 3.752 0 0 0-5.88.38 3.75 3.75 0 0 0-.66 2.126"
      />
    </Svg>
  );
};

export default LikeIcon;
