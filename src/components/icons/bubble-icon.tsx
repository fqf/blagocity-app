import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";

const BubbleIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg fill="none" viewBox="0 0 18 18" style={style}>
      <Path
        fill={fill}
        d="M15.75 3.25A.75.75 0 0 0 15 2.5H3a.75.75 0 0 0-.75.75v11.69l1.28-1.28.165-.15c.4-.328.904-.51 1.426-.51H15a.75.75 0 0 0 .75-.75zm1.5 9A2.25 2.25 0 0 1 15 14.5H5.121a.75.75 0 0 0-.53.22L2.939 16.37a1.29 1.29 0 0 1-1.397.278 1.285 1.285 0 0 1-.792-1.184V3.25A2.25 2.25 0 0 1 3 1h12a2.25 2.25 0 0 1 2.25 2.25z"
      />
    </Svg>
  );
};

export default BubbleIcon;
