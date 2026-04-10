import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import COLORS from "@/constants/colors";
import chroma from "chroma-js";

type TProps = {
  onPress: () => void;
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: chroma(COLORS.inputBorder).alpha(0.75).hex(),
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
const CloseButton: FC<TProps> = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.75} style={styles.container} onPress={onPress}>
      <Icon icon={EIcon.Close} fill={COLORS.icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default CloseButton;
