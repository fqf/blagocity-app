import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import ShadowBlock from "@/components/blocks/shadow-block";
import COLORS from "@/constants/colors";
import Button from "@/components/buttons/button";

const items = [
  {
    feature: "Пандус",
  },
  {
    feature: "Тактильная плитка",
  },
  {
    feature: "Кнопка помощи",
  },
  {
    feature: "Шрифт Брайля",
  },
  {
    feature: "Озвучивание",
  },
  {
    feature: "Сопровождение",
  },
];
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
    gap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
const AccessibleEnvironmentBlock: FC = () => {
  return (
    <ShadowBlock>
      <View style={styles.container}>
        <Text style={styles.label}>Доступная среда</Text>
        <View style={styles.content}>
          {items.map((item, i) => (
            <Button key={i} type="outlined" text={item.feature} />
          ))}
        </View>
      </View>
    </ShadowBlock>
  );
};

export default AccessibleEnvironmentBlock;
