import { FC } from "react";
import EIcon from "@/models/enums/icon";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@/components/icons/icon";
import chroma from "chroma-js";

type TProps = {
  icon: EIcon;
  blurred?: boolean;
  fill?: string;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: chroma("black").alpha(0.25).hex(),
  },
  icon: {
    width: 20,
    height: 20,
  },
});
const IconButton: FC<TProps> = ({ icon, blurred = true, fill = "white", onPress }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.75} onPress={onPress}>
      <Icon icon={icon} fill={fill} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default IconButton;
