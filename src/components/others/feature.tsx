import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import COLORS from "@/constants/colors";

type TProps = {
  icon: EIcon;
  title: string;
  variant?: "default" | "success";
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: COLORS.activeBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
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
        { backgroundColor: variant === "success" ? COLORS.successBackground : COLORS.activeBackground },
      ]}>
      <Icon icon={icon} fill={variant === "success" ? COLORS.success : COLORS.active} style={styles.icon} />
      <Text style={[styles.text, { color: variant === "success" ? COLORS.success : COLORS.active }]}>{title}</Text>
    </View>
  );
};

export default Feature;
