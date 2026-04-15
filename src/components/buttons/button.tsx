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
    borderRadius: 12,
    height: 42,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  fullwidth: {
    width: "100%",
  },
  primary: {
    backgroundColor: COLORS.active,
  },
  secondary: {
    backgroundColor: COLORS.inputBackground,
  },
  outlined: {
    borderColor: COLORS.inputBorder,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.text,
  },
  primaryText: {
    color: "white",
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
        type === "primary"
          ? styles.primary
          : type === "secondary"
            ? styles.secondary
            : type === "outlined"
              ? styles.outlined
              : null,
        active ? styles.active : null,
        error ? styles.error : null,
        disabled ? styles.disabled : null,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.text,
          type === "primary" ? styles.primaryText : null,
          active ? styles.activeText : null,
          error ? styles.errorText : null,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
