import { FC, useEffect, useRef, useState } from "react";
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
    height: 80,
    minHeight: 80,
    maxHeight: 80,
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
  },
  contentContainer: {
    height: "100%",
  },
  content: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    gap: 16,
  },
  categorySkeletonsContainer: {
    paddingBottom: 4,
  },
  categorySkeleton: {
    width: 120,
    height: 76,
    borderRadius: 16,
  },
  discountsSkeletonContainer: {
    flex: 1,
    gap: 16,
    paddingHorizontal: 20,
  },
  discountsSkeleton: {
    borderRadius: 16,
    height: 200,
  },
});
const DiscountsScreen: FC = () => {
  const [categoriesPending, setCategoriesPending] = useState(true);
  const [contentPending, setContentPending] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<{ id: number; title: string; icon: EIcon }[]>([]);
  const [discounts, setDiscounts] = useState<TGetDiscountResponse[]>([]);
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);
  const handleOnQueryChange = (text: string) => {
    setSearchString(text);

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setQuery(text);
    }, 1000);
  };
  const handleOnCategoryPress = (category: number) => {
    if (selected !== category) {
      setContentPending(true);
      setSelected(category);
    }
  };
  const handleOnActionPress = (actionId: number) => {
    router.push(`/tabs/discounts/action/${actionId}` as Href);
  };

  useEffect(() => {
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
          setCategoriesPending(false);
        }

        const discountsResponse = await getDiscountsList(token, { category: selected, query });
        console.log(discountsResponse.data);
        setDiscounts(discountsResponse.data);
        setContentPending(false);
      } catch (e: unknown) {
        await processError(e);
      }
    })();
  }, [selected, query]);

  return (
    <TabsLayout>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Скидки</Text>
          <Text style={styles.description}>Эксклюзивные предложения за вашу активность в городе.</Text>
          <Input placeholder="Введите название..." value={searchString} onChange={handleOnQueryChange} />
        </View>
        {categoriesPending && (
          <View style={[styles.buttons, styles.categorySkeletonsContainer]}>
            <Skeleton style={styles.categorySkeleton} />
            <Skeleton style={styles.categorySkeleton} />
            <Skeleton style={styles.categorySkeleton} />
          </View>
        )}
        {!categoriesPending && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item }) => (
              <DiscountButton
                icon={item.icon}
                title={item.title}
                active={selected === item.id}
                onPress={() => handleOnCategoryPress(item.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
            style={styles.buttonsContainer}
            contentContainerStyle={styles.buttons}
          />
        )}
        {contentPending && (
          <View style={styles.discountsSkeletonContainer}>
            <Skeleton style={styles.discountsSkeleton} />
            <Skeleton style={styles.discountsSkeleton} />
            <Skeleton style={styles.discountsSkeleton} />
          </View>
        )}
        {!contentPending && (
          <FlatList
            data={discounts}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <DiscountBlock
                image={item.image_url}
                title={item.name}
                onButtonPress={() => handleOnActionPress(item.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.content}
            style={styles.contentContainer}
          />
        )}
      </SafeAreaView>
    </TabsLayout>
  );
};

export default DiscountsScreen;
