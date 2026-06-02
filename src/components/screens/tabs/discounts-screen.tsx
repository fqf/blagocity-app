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
import { TGetDiscountsListItem } from "@/models/contracts/discount/get-discounts-list-response";

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
  const [newPagePending, setNewPagePending] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [categories, setCategories] = useState<{ id: number; title: string; icon: EIcon }[]>([]);
  const [discounts, setDiscounts] = useState<TGetDiscountsListItem[]>([]);
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);
  const handleOnQueryChange = (text: string) => {
    setSearchString(text);

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setContentPending(true);
      setSelected(0);
      setQuery(text);
      setDiscounts([]);
      setCurrentPage(1);
      setLastPage(1);
    }, 1000);
  };
  const handleOnCategoryPress = (category: number) => {
    setContentPending(true);
    setSearchString("");
    setQuery("");

    if (selected !== category) {
      setSelected(category);
    } else {
      setSelected(0);
    }

    setDiscounts([]);
    setCurrentPage(1);
    setLastPage(1);
  };
  const handleOnActionPress = (actionId: number) => {
    router.push(`/tabs/discounts/action/${actionId}` as Href);
  };
  const handleOnEndReached = async () => {
    if (currentPage !== lastPage) {
      setNewPagePending(true);
      setCurrentPage(prev => prev + 1);
    }
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

        const discountsResponse = await getDiscountsList(token, { category: selected, query, page: currentPage });
        setLastPage(discountsResponse.meta.last_page);
        setDiscounts(prev => [...prev, ...discountsResponse.data]);
        setContentPending(false);
        setNewPagePending(false);
      } catch (e: unknown) {
        await processError(e);
      }
    })();
  }, [selected, query, currentPage]);

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
            data={newPagePending ? ([...discounts, "pending"] as TGetDiscountsListItem[]) : discounts}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              if (item === "pending") {
                return <Skeleton style={styles.discountsSkeleton} />;
              }

              return (
                <DiscountBlock
                  image={item.image_url}
                  title={item.name}
                  onButtonPress={() => handleOnActionPress(item.id)}
                />
              );
            }}
            keyExtractor={(item, index) => {
              if (item === "pending") {
                return `pending_${index}`;
              }

              return item.id.toString();
            }}
            onEndReached={handleOnEndReached}
            contentContainerStyle={styles.content}
            style={styles.contentContainer}
          />
        )}
      </SafeAreaView>
    </TabsLayout>
  );
};

export default DiscountsScreen;
