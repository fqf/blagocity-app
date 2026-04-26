import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import COLORS from "@/constants/colors";

type TProps = {
  icon: EIcon;
  title: string;
  variant?: "default" | "success" | "error";
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: COLORS.activeBackground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 14,
    height: 14,
  },
  text: {
    fontFamily: "LexendDeca-SemiBold",
    fontSize: 14,
    color: COLORS.active,
  },
});
const Feature: FC<TProps> = ({ icon, title, variant = "default" }) => {
  return (
    <View
      style={[
        styles.container,
        variant === "default" ? { backgroundColor: COLORS.activeBackground } : null,
        variant === "success" ? { backgroundColor: COLORS.successBackground } : null,
        variant === "error" ? { backgroundColor: COLORS.error } : null,
      ]}>
      <Icon
        icon={icon}
        fill={variant === "success" ? COLORS.success : variant === "error" ? "white" : COLORS.active}
        style={styles.icon}
      />
      <Text
        style={[
          styles.text,
          variant === "default" ? { color: COLORS.active } : null,
          variant === "success" ? { color: COLORS.success } : null,
          variant === "error" ? { color: "white" } : null,
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default Feature;
