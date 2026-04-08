import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";

const ListIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 20 20" style={style}>
      <Path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2.5 4.167h.008M2.5 10h.008M2.5 15.833h.008M6.667 4.167H17.5M6.667 10H17.5M6.667 15.833H17.5"
      />
    </Svg>
  );
};

export default ListIcon;
