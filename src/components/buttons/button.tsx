import { FC } from "react";
import EIcon from "@/models/enums/icon";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "@/constants/colors";
import Icon from "@/components/icons/icon";

type TProps = {
  type: "primary" | "secondary" | "outlined";
  theme: "default" | "active" | "error";
  text: string;
  icon?: EIcon;
  fullWidth?: boolean;
  disabled?: boolean;
  size?: "default" | "large";
  style?: object;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    minHeight: 42,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  fullwidth: {
    width: "100%",
  },
  primaryDefault: {
    backgroundColor: COLORS.text,
  },
  primaryActive: {
    backgroundColor: COLORS.active,
  },
  primaryError: {
    backgroundColor: COLORS.error,
  },
  secondaryDefault: {
    backgroundColor: COLORS.blockBackground,
  },
  secondaryActive: {
    backgroundColor: COLORS.activeBackground,
  },
  secondaryError: {
    backgroundColor: COLORS.errorBackground,
  },
  outlinedDefault: {
    borderColor: COLORS.inputBorder,
    backgroundColor: "white",
  },
  outlinedActive: {
    borderColor: COLORS.active,
    backgroundColor: "white",
  },
  outlinedError: {
    borderColor: COLORS.error,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
  },
  textPrimaryDefault: {
    color: "white",
  },
  textPrimaryActive: {
    color: "white",
  },
  textPrimaryError: {
    color: "white",
  },
  textSecondaryDefault: {
    color: COLORS.text,
  },
  textSecondaryActive: {
    color: COLORS.active,
  },
  textSecondaryError: {
    color: COLORS.error,
  },
  textOutlinedDefault: {
    color: COLORS.text,
  },
  textOutlinedActive: {
    color: COLORS.active,
  },
  textOutlinedError: {
    color: COLORS.error,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    width: 18,
    height: 18,
  },
  largeContainer: {
    borderRadius: 16,
    height: 60,
  },
  largeText: {
    fontSize: 18,
  },
});
const Button: FC<TProps> = ({
  type = "primary",
  theme = "default",
  text,
  icon,
  fullWidth,
  disabled,
  size = "default",
  style,
  onPress,
}) => {
  const getIconFillColor = () => {
    if (type === "primary") {
      return "white";
    }

    if (theme === "active") {
      return COLORS.active;
    } else if (theme === "error") {
      return COLORS.error;
    }

    return COLORS.text;
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.65}
      style={[
        styles.container,
        fullWidth ? styles.fullwidth : null,
        type === "primary" && theme === "default" ? styles.primaryDefault : null,
        type === "primary" && theme === "active" ? styles.primaryActive : null,
        type === "primary" && theme === "error" ? styles.primaryError : null,
        type === "secondary" && theme === "default" ? styles.secondaryDefault : null,
        type === "secondary" && theme === "active" ? styles.secondaryActive : null,
        type === "secondary" && theme === "error" ? styles.secondaryError : null,
        type === "outlined" && theme === "default" ? styles.outlinedDefault : null,
        type === "outlined" && theme === "active" ? styles.outlinedActive : null,
        type === "outlined" && theme === "error" ? styles.outlinedError : null,
        size === "large" ? styles.largeContainer : null,
        disabled ? styles.disabled : null,
        style,
      ]}
      onPress={onPress}>
      {!!icon && <Icon icon={icon} fill={getIconFillColor()} style={styles.icon} />}
      <Text
        style={[
          styles.text,
          size === "large" ? styles.largeText : null,
          {
            color: getIconFillColor(),
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
