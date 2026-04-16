import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import ShadowBlock from "@/components/blocks/shadow-block";
import Input from "@/components/inputs/input";
import COLORS from "@/constants/colors";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  label: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
    color: COLORS.text,
  },
});
const ReviewFormBlock: FC = () => {
  return (
    <ShadowBlock>
      <View style={styles.container}>
        <Text style={styles.label}>Отзыв</Text>
        <Input multiline placeholder="Опишите ваши впечатления о доступности этого места..." />
      </View>
    </ShadowBlock>
  );
};

export default ReviewFormBlock;
