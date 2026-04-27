import { FC } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import COLORS from "@/constants/colors";

type TProps = {
  style?: ViewStyle;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: COLORS.inputBorder,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
const CloseButton: FC<TProps> = ({ style, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.75} style={[styles.container, style]} onPress={onPress}>
      <Icon icon={EIcon.Close} fill={COLORS.icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default CloseButton;
