import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";

type TProps = {
  text: string;
  variant: "success";
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  successContainer: {
    backgroundColor: COLORS.successBackground,
  },
  text: {
    fontFamily: "LexendDeca-SemiBold",
    fontSize: 10,
    color: COLORS.text,
  },
  successText: {
    color: COLORS.success,
  },
});
const Tag: FC<TProps> = ({ text, variant }) => {
  return (
    <View style={[styles.container, variant === "success" ? styles.successContainer : null]}>
      <Text style={[styles.text, variant === "success" ? styles.successText : null]}>{text}</Text>
    </View>
  );
};

export default Tag;
