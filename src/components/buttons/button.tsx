import { FC } from "react";
import EIcon from "@/models/enums/icon";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import COLORS from "@/constants/colors";
import Icon from "@/components/icons/icon";

type TProps = {
  type: "primary" | "secondary" | "outlined";
  text: string;
  icon?: EIcon;
  active?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  accented?: boolean;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    height: 42,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
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
  accentedText: {
    fontFamily: "LexendDeca-Bold",
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
    backgroundColor: COLORS.errorBackground,
  },
  errorText: {
    color: COLORS.error,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    width: 18,
    height: 18,
  },
});
const Button: FC<TProps> = ({
  type = "primary",
  text,
  icon,
  active,
  error,
  fullWidth,
  disabled,
  style,
  accented,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.65}
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
        style,
      ]}
      onPress={onPress}>
      {!!icon && (
        <Icon
          icon={icon}
          fill={type === "primary" ? "white" : error ? COLORS.error : COLORS.text}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.text,
          type === "primary" ? styles.primaryText : null,
          active ? styles.activeText : null,
          error ? styles.errorText : null,
          accented ? styles.accentedText : null,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
