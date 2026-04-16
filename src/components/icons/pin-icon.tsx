import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

type TProps = TIconProps;

const PinIcon: FC<TProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg fill="none" viewBox="0 0 18 18" style={style}>
      <Path
        fill={fill}
        d="M14.25 7.5a5.25 5.25 0 0 0-10.5 0c0 1.62.913 3.365 2.099 4.923 1.145 1.505 2.46 2.724 3.151 3.323.69-.6 2.005-1.818 3.151-3.323 1.186-1.558 2.099-3.304 2.099-4.923m1.5 0c0 2.125-1.164 4.202-2.404 5.831-1.258 1.652-2.69 2.967-3.406 3.586l-.039.031a1.5 1.5 0 0 1-1.841-.031c-.717-.619-2.148-1.934-3.406-3.586C3.414 11.701 2.25 9.625 2.25 7.5a6.75 6.75 0 1 1 13.5 0"
      />
      <Path fill={fill} d="M10.5 7.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m1.5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
    </Svg>
  );
};

export default PinIcon;
