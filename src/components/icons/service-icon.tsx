import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import TIconProps from "@/models/types/icon-props";
import COLORS from "@/constants/colors";

const ServiceIcon: FC<TIconProps> = ({ fill = COLORS.active, style }) => {
  return (
    <Svg viewBox="0 0 24 24" style={style}>
      <Path
        fill={fill}
        d="M13.944 1.304a7 7 0 0 1 3.909-.058v.001c1.308.359 1.425 1.889.662 2.654v.002l-3.101 3.096L17 8.585l3.1-3.097c.765-.768 2.295-.646 2.653.66l.062.24a7 7 0 0 1-5.827 8.546 7 7 0 0 1-3.213-.296l-7.448 7.45a3.122 3.122 0 1 1-4.413-4.415l7.448-7.45a7 7 0 0 1 4.582-8.92m2.613 1.726a5 5 0 0 0-4.361 1.718 5 5 0 0 0-.754 5.31 1 1 0 0 1-.204 1.119l-7.91 7.91a1.122 1.122 0 0 0 1.585 1.586l7.91-7.91.117-.1a1 1 0 0 1 1.002-.104 5.002 5.002 0 0 0 6.842-3.09 5 5 0 0 0 .185-2.024l-2.57 2.569a2 2 0 0 1-2.799 0l-1.607-1.607-.007-.007a2 2 0 0 1 0-2.8z"
      />
    </Svg>
  );
};

export default ServiceIcon;
