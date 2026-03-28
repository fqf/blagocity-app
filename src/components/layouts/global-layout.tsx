import { FC } from "react";
import TContainerProps from "@/models/types/container-props";
import { StyleSheet, View } from "react-native";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
const GlobalLayout: FC<TContainerProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default GlobalLayout;
