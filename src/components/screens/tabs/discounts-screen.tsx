import { FC, useEffect, useState } from "react";
import TabsLayout from "@/components/layouts/tabs-layout";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "@/constants/colors";
import Input from "@/components/inputs/input";
import DiscountButton from "@/components/buttons/discount-button";
import EIcon from "@/models/enums/icon";
import DiscountBlock from "@/components/blocks/discount-block";
import { Href, useRouter } from "expo-router";
import { getDiscountCategoriesList, getDiscountsList } from "@/actions/discount-actions";
import * as SecureStore from "expo-secure-store";
import Skeleton from "@/components/others/skeleton";
import processError from "@/lib/process-error";
import type TGetDiscountResponse from "@/models/contracts/discount/get-discount-response";

const buttons = [
  {
    icon: EIcon.Label,
    title: "Все скидки",
  },
  {
    icon: EIcon.Like,
    title: "Избранное",
  },
  {
    icon: EIcon.Like,
    title: "Мои скидки",
  },
  {
    icon: EIcon.Percent,
    title: "Новогодние",
  },
  {
    icon: EIcon.New,
    title: "Новинки",
  },
  {
    icon: EIcon.Electronics,
    title: "Техника и электроника",
  },
  {
    icon: EIcon.Goods,
    title: "Товары",
  },
  {
    icon: EIcon.Food,
    title: "Рестораны и доставка",
  },
  {
    icon: EIcon.Book,
    title: "Обучение",
  },
  {
    icon: EIcon.Palm,
    title: "Отдых",
  },
  {
    icon: EIcon.Sport,
    title: "Спорт",
  },
  {
    icon: EIcon.Cherry,
    title: "Красота и здоровье",
  },
  {
    icon: EIcon.Kid,
    title: "Дети",
  },
  {
    icon: EIcon.Coupon,
    title: "Развлечения",
  },
  {
    icon: EIcon.Service,
    title: "Услуги",
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    gap: 16,
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
  buttonsContainer: {
    height: 111,
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
  },
  content: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    gap: 16,
  },
  categorySkeletonsContainer: {
    paddingBottom: 2,
  },
  categorySkeleton: {
    width: 120,
    height: 74,
    borderRadius: 16,
  },
  discountsSkeletonContainer: {
    gap: 12,
    paddingHorizontal: 20,
  },
  discountsSkeleton: {
    borderRadius: 16,
    height: 200,
  },
});
const DiscountsScreen: FC = () => {
  const [pending, setPending] = useState(true);
  const [categories, setCategories] = useState<{ id: number; title: string; icon: EIcon }[]>([]);
  const [discounts, setDiscounts] = useState<TGetDiscountResponse[]>([]);
  const [selected, setSelected] = useState(-1);
  const router = useRouter();
  const handleOnTypePress = (selected: number) => {
    setSelected(selected);
  };
  const handleOnActionPress = (actionId: number) => {
    router.push(`/tabs/discounts/action/${actionId}` as Href);
  };

  useEffect(() => {
    setPending(true);
    const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

    (async () => {
      try {
        if (!token) {
          throw new Error("Bad token");
        }

        const categoriesResponse = await getDiscountCategoriesList(token);

        if (categoriesResponse.data) {
          setCategories(
            categoriesResponse.data.map(item => ({
              id: item.id,
              title: item.name,
              icon: buttons.find(button => button.title === item.name)?.icon ?? EIcon.Label,
            })),
          );
        }

        const discountsResponse = await getDiscountsList(token);
        setDiscounts(discountsResponse.data);

        setPending(false);
      } catch (e: unknown) {
        await processError(e);
      }
    })();
  }, []);

  return (
    <TabsLayout>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Скидки</Text>
          <Text style={styles.description}>Эксклюзивные предложения за вашу активность в городе.</Text>
          <Input placeholder="Введите название..." />
        </View>
        {pending && (
          <View style={[styles.buttons, styles.categorySkeletonsContainer]}>
            <Skeleton style={styles.categorySkeleton} />
            <Skeleton style={styles.categorySkeleton} />
            <Skeleton style={styles.categorySkeleton} />
          </View>
        )}
        {!pending && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item }) => (
              <DiscountButton
                icon={item.icon}
                title={item.title}
                active={selected === item.id}
                onPress={() => handleOnTypePress(item.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
            style={styles.buttonsContainer}
            contentContainerStyle={styles.buttons}
          />
        )}
        {pending && (
          <View style={styles.discountsSkeletonContainer}>
            <Skeleton style={styles.discountsSkeleton} />
            <Skeleton style={styles.discountsSkeleton} />
            <Skeleton style={styles.discountsSkeleton} />
          </View>
        )}
        {!pending && (
          <FlatList
            data={discounts}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <DiscountBlock
                image={item.image_url}
                title={item.name}
                description="Уютная кофейня с эко-френдли подходом. Скидка за свой стаканчик."
                discount="Первое бесплатно"
                onButtonPress={() => handleOnActionPress(item.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.content}
          />
        )}
      </SafeAreaView>
    </TabsLayout>
  );
};

export default DiscountsScreen;
