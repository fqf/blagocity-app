import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";

const SuccessIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 64 64" style={style}>
      <Path
        fill={fill}
        d="M56 32C56 18.746 45.255 8 32 8 18.746 8 8 18.746 8 32c0 13.255 10.746 24 24 24 13.255 0 24-10.745 24-24m5.333 0C61.333 48.2 48.2 61.333 32 61.333S2.667 48.201 2.666 32C2.666 15.8 15.8 2.666 32 2.666S61.333 15.8 61.333 32"
      />
      <Path
        fill={fill}
        d="M38.114 24.78a2.667 2.667 0 0 1 3.772 3.772L31.219 39.22a2.667 2.667 0 0 1-3.772 0l-5.333-5.334a2.667 2.667 0 0 1 3.772-3.771l3.447 3.447z"
      />
    </Svg>
  );
};

export default SuccessIcon;
