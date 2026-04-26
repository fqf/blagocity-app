import { FC } from "react";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";
import Svg, { Path } from "react-native-svg";

const NewIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 24 24" style={style}>
      <Path
        fill={fill}
        d="m21 12-5.558-1.051a3 3 0 0 1-2.39-2.39L12 2.998H12l-1.051 5.56a3 3 0 0 1-2.392 2.389L3 12l5.558 1.051a3 3 0 0 1 2.39 2.39L12 21.002v.002V21l1.051-5.558a3 3 0 0 1 2.39-2.39zl.002-.001zm2.003 0a2 2 0 0 1-1.633 1.966h-.001l-5.555 1.05a1 1 0 0 0-.798.798l-1.05 5.555A2 2 0 0 1 12 23.003a2 2 0 0 1-1.966-1.633v-.001l-1.051-5.555a1 1 0 0 0-.797-.798l-5.556-1.05a2.002 2.002 0 0 1-1.171-3.244c.26-.314.61-.54 1.002-.648l.17-.04 5.555-1.051a1 1 0 0 0 .797-.797l1.05-5.556.04-.17a2.001 2.001 0 0 1 3.893.17l1.05 5.556a1 1 0 0 0 .798.797l5.555 1.05A2 2 0 0 1 23.003 12M19 6V2a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0"
      />
      <Path
        fill={fill}
        d="M22 3a1 1 0 1 1 0 2h-4a1 1 0 1 1 0-2zM5 20a1 1 0 1 0-2 0 1 1 0 0 0 2 0m2 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
      />
    </Svg>
  );
};

export default NewIcon;
