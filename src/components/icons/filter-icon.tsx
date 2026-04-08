import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";

const FilterIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 14 14" style={style}>
      <Path
        fill={fill}
        d="M.219 1.453c.087.113 5.022 6.413 5.022 6.413v5.259a.88.88 0 0 0 .884.875h1.758a.885.885 0 0 0 .884-.875V7.858s4.803-6.143 5.03-6.423.202-.56.202-.56A.88.88 0 0 0 13.115 0H.884A.87.87 0 0 0 0 .875c0 .175.052.385.219.577"
      />
    </Svg>
  );
};

export default FilterIcon;
