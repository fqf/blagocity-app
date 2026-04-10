import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

type TProps = TIconProps & {
  variant: "icon" | "image";
};

const PinIcon: FC<TProps> = ({ fill = COLORS.active, style, variant = "image" }) => {
  if (variant === "image") {
    return (
      <Svg fill="none" viewBox="0 0 55 55" style={style}>
        <Path
          fill="#7c3aed"
          stroke="#fff"
          strokeWidth="2.875"
          d="M27.998 4.783c-8.869 0-16.041 7.173-16.041 16.041 0 12.031 10.66 29.991 16.041 29.792 5.38-.2 16.042-17.76 16.042-29.792 0-8.869-7.173-16.041-16.042-16.041Zm0 21.77a5.73 5.73 0 0 1-5.729-5.729 5.73 5.73 0 0 1 5.73-5.729 5.73 5.73 0 0 1 5.728 5.73 5.73 5.73 0 0 1-5.729 5.728Z"
        />
      </Svg>
    );
  }

  return (
    <Svg fill="none" viewBox="0 0 16 16" style={style}>
      <Path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M13.333 6.667c0 3.328-3.692 6.795-4.932 7.866a.666.666 0 0 1-.802 0c-1.24-1.071-4.932-4.538-4.932-7.866a5.333 5.333 0 1 1 10.666 0"
      />
      <Path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M8 8.667a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
      />
    </Svg>
  );
};

export default PinIcon;
