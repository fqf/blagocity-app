import { FC } from "react";
import { StyleSheet, View } from "react-native";
import COLORS from "@/constants/colors";

type TProps = {
  count: number;
  current: number;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
  },
  step: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.label,
    borderRadius: 5,
  },
  current: {
    width: 32,
    backgroundColor: COLORS.active,
  },
});
const Stepper: FC<TProps> = ({ count, current }) => {
  return (
    <View style={styles.container}>
      {new Array(count).fill("").map((_, i) => (
        <View key={i} style={[styles.step, current === i ? styles.current : null]} />
      ))}
    </View>
  );
};

export default Stepper;
