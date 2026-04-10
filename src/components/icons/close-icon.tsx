import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const CloseIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg fill="none" viewBox="0 0 21 21" style={style}>
      <Path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.667"
        d="M15.012 5.012 5.035 15.035M5.012 5.035l10.023 9.977"
      />
    </Svg>
  );
};

export default CloseIcon;
