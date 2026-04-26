import { FC, useState } from "react";
import TabsLayout from "@/components/layouts/tabs-layout";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "@/constants/colors";
import Input from "@/components/inputs/input";
import DiscountButton from "@/components/buttons/discount-button";
import EIcon from "@/models/enums/icon";
import DiscountBlock from "@/components/blocks/discount-block";
import { Href, useRouter } from "expo-router";

const buttons = [
  {
    id: "0",
    icon: EIcon.Label,
    title: "Все скидки",
  },
  {
    id: "1",
    icon: EIcon.Like,
    title: "Избранное",
  },
  {
    id: "2",
    icon: EIcon.Like,
    title: "Мои скидки",
  },
  {
    id: "3",
    icon: EIcon.Percent,
    title: "Новогодние",
  },
  {
    id: "4",
    icon: EIcon.New,
    title: "Новинки",
  },
  {
    id: "5",
    icon: EIcon.Electronics,
    title: "Техника и электроника",
  },
  {
    id: "6",
    icon: EIcon.Goods,
    title: "Товары",
  },
  {
    id: "7",
    icon: EIcon.Food,
    title: "Рестораны и доставка",
  },
  {
    id: "8",
    icon: EIcon.Book,
    title: "Обучение",
  },
  {
    id: "10",
    icon: EIcon.Palm,
    title: "Отдых",
  },
  {
    id: "11",
    icon: EIcon.Sport,
    title: "Спорт",
  },
  {
    id: "12",
    icon: EIcon.Cherry,
    title: "Красота и здоровье",
  },
  {
    id: "13",
    icon: EIcon.Kid,
    title: "Дети",
  },
  {
    id: "14",
    icon: EIcon.Coupon,
    title: "Развлечения",
  },
  {
    id: "15",
    icon: EIcon.Service,
    title: "Услуги",
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    gap: 8,
    paddingTop: 16,
  },
  title: {
    fontFamily: "LexendDeca-ExtraBold",
    fontSize: 30,
    color: COLORS.text,
  },
  description: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 16,
    color: COLORS.label,
  },
  buttons: {
    height: 130,
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 20,
  },
  content: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    gap: 16,
  },
});
const DiscountsScreen: FC = () => {
  const [selected, setSelected] = useState("0");
  const router = useRouter();
  const handleOnTypePress = (selected: string) => {
    setSelected(selected);
  };
  const handleOnActionPress = (actionId: string) => {
    router.push(`/tabs/discounts/action/${actionId}` as Href);
  };

  return (
    <TabsLayout>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Скидки</Text>
          <Text style={styles.description}>Эксклюзивные предложения за вашу активность в городе.</Text>
          <Input placeholder="Введите название..." />
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={buttons}
          renderItem={({ item }) => (
            <DiscountButton
              icon={item.icon}
              title={item.title}
              active={selected === item.id}
              onPress={() => handleOnTypePress(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.buttons}
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <DiscountBlock
            image="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/15/7e/cf/artur-restorant.jpg?w=1000&h=-1&s=1"
            title="Доброе утро"
            description="Уютная кофейня с эко-френдли подходом. Скидка за свой стаканчик."
            discount="Первое бесплатно"
            onButtonPress={() => handleOnActionPress("17")}
          />
          <DiscountBlock
            image="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/15/7e/cf/artur-restorant.jpg?w=1000&h=-1&s=1"
            title="Доброе утро"
            description="Уютная кофейня с эко-френдли подходом. Скидка за свой стаканчик."
            discount="15%"
            onButtonPress={() => handleOnActionPress("17")}
          />
          <DiscountBlock
            image="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/15/7e/cf/artur-restorant.jpg?w=1000&h=-1&s=1"
            title="Доброе утро"
            description="Уютная кофейня с эко-френдли подходом. Скидка за свой стаканчик."
            discount="15%"
            onButtonPress={() => handleOnActionPress("17")}
          />
        </ScrollView>
      </SafeAreaView>
    </TabsLayout>
  );
};

export default DiscountsScreen;
