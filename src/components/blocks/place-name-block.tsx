import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import ShadowBlock from "@/components/blocks/shadow-block";
import COLORS from "@/constants/colors";
import Input from "@/components/inputs/input";

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
const PlaceNameBlock: FC = () => {
  return (
    <ShadowBlock>
      <View style={styles.container}>
        <Text style={styles.label}>Название места</Text>
        <Input placeholder="Введите название места..." />
      </View>
    </ShadowBlock>
  );
};

export default PlaceNameBlock;
