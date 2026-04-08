import { FC } from "react";
import Icon from "@/models/enums/icon";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "@/constants/colors";

type TProps = {
  type: "primary" | "secondary" | "outlined";
  text: string;
  icon?: Icon;
  active?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    height: 63,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  fullwidth: {
    flex: 1,
  },
  outlined: {
    borderColor: COLORS.inputBorder,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "LexendDeca-Medium",
    fontSize: 16,
    color: COLORS.text,
  },
  active: {
    borderColor: COLORS.active,
    backgroundColor: COLORS.activeBackground,
  },
  activeText: {
    color: COLORS.active,
  },
  error: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorBackground,
  },
  errorText: {
    color: COLORS.error,
  },
  disabled: {
    opacity: 0.5,
  },
});
const Button: FC<TProps> = ({ type = "primary", text, icon, active, error, fullWidth, disabled, onPress }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      style={[
        styles.container,
        fullWidth ? styles.fullwidth : null,
        type === "outlined" ? styles.outlined : null,
        active ? styles.active : null,
        error ? styles.error : null,
        disabled ? styles.disabled : null,
      ]}
      onPress={onPress}>
      <Text style={[styles.text, active ? styles.activeText : null, error ? styles.errorText : null]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
