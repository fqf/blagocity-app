import { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { Href, Link } from "expo-router";
import COLORS from "@/constants/colors";

type TProps = {
  text: string;
  href: Href;
  disabled?: boolean;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "LexendDeca-SemiBold",
    fontSize: 14,
    color: COLORS.active,
  },
});
const LinkButton: FC<TProps> = ({ text, href, disabled }) => {
  return (
    <Link disabled={disabled} href={href}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

export default LinkButton;
