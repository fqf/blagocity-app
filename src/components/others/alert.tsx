import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import CloseButton from "@/components/buttons/close-button";
import COLORS from "@/constants/colors";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";

type TProps = {
  variant: "error" | "success";
  title: string;
  description: string;
  onClosePress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    flexDirection: "row",
    width: "100%",
    padding: 16,
    gap: 16,
  },
  errorContainer: {
    backgroundColor: COLORS.errorBackground,
  },
  texts: {
    gap: 8,
  },
  button: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  errorIconContainer: {
    backgroundColor: COLORS.error,
  },
  icon: {
    width: 18,
    height: 18,
  },
  title: {
    fontFamily: "LexendDeca-ExtraBold",
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.text,
  },
  description: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.icon,
  },
  close: {
    backgroundColor: "transparent",
  },
});
const Alert: FC<TProps> = ({ variant, title, description, onClosePress }) => {
  return (
    <View style={[styles.container, variant === "error" ? styles.errorContainer : null]}>
      <View style={[styles.iconContainer, variant === "error" ? styles.errorIconContainer : null]}>
        <Icon icon={EIcon.Close} fill="white" style={styles.icon} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.button}>
        <CloseButton style={styles.close} onPress={onClosePress} />
      </View>
    </View>
  );
};

export default Alert;
