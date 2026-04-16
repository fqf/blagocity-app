import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";

type TProps = {
  value: number;
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.ratingBackground,
    borderRadius: 8,
    paddingHorizontal: 8,
    gap: 4,
  },
  icon: {
    width: 16,
    height: 16,
  },
  text: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 16,
    color: COLORS.rating,
  },
});
const Rating: FC<TProps> = ({ value }) => {
  return (
    <View style={styles.container}>
      <Icon icon={EIcon.StarFilled} fill={COLORS.rating} style={styles.icon} />
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

export default Rating;
