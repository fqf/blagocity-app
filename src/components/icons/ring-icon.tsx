import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const RingIcon: FC<TIconProps> = ({ fill = COLORS.active, style, variant = "active-filled" }) => {
  switch (variant) {
    case "active-filled":
      return (
        <Svg viewBox="0 0 33 20" style={style}>
          <Path
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.041 17.5a1.698 1.698 0 0 0 2.917 0M24.922 6.667c0-1.917-.674-3.584-1.684-5"
          />
          <Path
            fill={fill}
            d="M9.14 12.772a.83.83 0 0 0 .622 1.395h13.476a.85.85 0 0 0 .77-.497.83.83 0 0 0-.147-.897c-1.12-1.143-2.308-2.357-2.308-6.106a4.97 4.97 0 0 0-1.48-3.536A5.08 5.08 0 0 0 16.5 1.667a5.08 5.08 0 0 0-3.573 1.464 4.97 4.97 0 0 0-1.48 3.536c0 3.749-1.188 4.963-2.306 6.105"
          />
          <Path
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.763 1.667c-1.011 1.416-1.685 3.083-1.685 5"
          />
        </Svg>
      );
  }
};

export default RingIcon;
