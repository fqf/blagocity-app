import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";

type TProps = {
  direction?: "left" | "right";
} & TIconProps;

const ChevronIcon: FC<TProps> = ({ fill = COLORS.active, style, direction = "left" }) => {
  if (direction === "right") {
    return (
      <Svg viewBox="0 0 24 24" style={style}>
        <Path
          fill={fill}
          d="M9.707 18.707a1 1 0 1 1-1.414-1.414L13.586 12 8.293 6.707a1 1 0 1 1 1.414-1.414l6 6a1 1 0 0 1 0 1.414z"
        />
      </Svg>
    );
  }

  return (
    <Svg viewBox="0 0 24 24" style={style}>
      <Path
        fill={fill}
        d="M14.293 5.293a1 1 0 1 1 1.414 1.414L10.414 12l5.293 5.293a1 1 0 1 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414z"
      />
    </Svg>
  );
};

export default ChevronIcon;
