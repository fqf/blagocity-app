import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import ShadowBlock from "@/components/blocks/shadow-block";
import COLORS from "@/constants/colors";
import Button from "@/components/buttons/button";

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
  content: {
    flexDirection: "row",
    gap: 8,
  },
});
const PlaceTypeBlock: FC = () => {
  return (
    <ShadowBlock>
      <View style={styles.container}>
        <Text style={styles.label}>Тип места</Text>
        <View style={styles.content}>
          <Button type="secondary" text="Социальное" />
          <Button type="secondary" text="Досуг" />
          <Button type="secondary" text="Дорога" />
        </View>
      </View>
    </ShadowBlock>
  );
};

export default PlaceTypeBlock;
