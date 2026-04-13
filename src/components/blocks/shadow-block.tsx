import { FC } from "react";
import TContainerProps from "@/models/types/container-props";
import DropShadow from "react-native-drop-shadow";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
const ShadowBlock: FC<TContainerProps> = ({ children }) => {
  return <DropShadow style={styles.shadow}>{children}</DropShadow>;
};

export default ShadowBlock;
