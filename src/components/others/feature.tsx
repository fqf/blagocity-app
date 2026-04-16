import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import COLORS from "@/constants/colors";

type TProps = {
  title: string;
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
const Feature: FC<TProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Icon icon={EIcon.Checked} style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Feature;
