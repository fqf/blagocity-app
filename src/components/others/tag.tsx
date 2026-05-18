import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";

type TProps = {
  text: string;
  variant: "default" | "success" | "error";
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
  defaultContainer: {
    backgroundColor: COLORS.inputBackground,
  },
  successContainer: {
    backgroundColor: COLORS.successBackground,
  },
  errorContainer: {
    backgroundColor: COLORS.errorBackground,
  },
  text: {
    fontFamily: "LexendDeca-SemiBold",
    fontSize: 10,
  },
  defaultText: {
    color: COLORS.text,
  },
  successText: {
    color: COLORS.success,
  },
  errorText: {
    color: COLORS.error,
  },
});
const Tag: FC<TProps> = ({ text, variant }) => {
  return (
    <View
      style={[
        styles.container,
        variant === "success"
          ? styles.successContainer
          : variant === "error"
            ? styles.errorContainer
            : styles.defaultContainer,
      ]}>
      <Text
        style={[
          styles.text,
          variant === "success" ? styles.successText : variant === "error" ? styles.errorText : styles.defaultText,
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default Tag;
