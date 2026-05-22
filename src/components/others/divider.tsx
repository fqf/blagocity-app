import { FC } from "react";
import { StyleSheet, View } from "react-native";
import COLORS from "@/constants/colors";

type TProps = {
  direction?: "horizontal" | "vertical";
  thickness?: number;
  color?: string;
  style?: object;
};

const styles = StyleSheet.create({
  common: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.inputBorder,
  },
  vertical: {
    borderRightWidth: 0,
    borderRightColor: "transparent",
    borderTopWidth: 0,
    borderTopColor: "transparent",
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
  },
  horizontal: {},
});
const Divider: FC<TProps> = ({
  direction = "horizontal",
  thickness = StyleSheet.hairlineWidth,
  color = COLORS.inputBorder,
  style,
}) => {
  return (
    <View
      style={[
        direction === "horizontal" ? styles.horizontal : styles.vertical,
        thickness ? { borderWidth: thickness } : null,
        color ? { borderColor: color } : null,
        style,
      ]}
    />
  );
};

export default Divider;
