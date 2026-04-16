import { FC } from "react";
import InnerLayout from "@/components/layouts/inner-layout";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import ReviewBlock from "@/components/blocks/review-block";
import Button from "@/components/buttons/button";
import COLORS from "@/constants/colors";
import EIcon from "@/models/enums/icon";
import Feature from "@/components/others/feature";
import Rating from "@/components/others/rating";
import { declOfReviews } from "@/lib/decl-of-num";

type TProps = {
  id: string;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  image: {
    height: 300,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  block: {
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 24,
    color: COLORS.text,
  },
  subtitle: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 18,
    color: COLORS.text,
  },
  text: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.text,
  },
  featuresContainer: {
    gap: 8,
    alignItems: "flex-start",
  },
  buttonsContainer: {
    gap: 12,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  buttonsRowButton: {
    flex: 1,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewsHeaderCounter: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
    color: COLORS.active,
  },
  reviewsContainer: {
    gap: 12,
    paddingBottom: 20,
  },
});
const LocationScreen: FC<TProps> = ({ id }) => {
  const router = useRouter();
  const handleOnAlertPress = () => {
    router.push("/tabs/map/location/outgoing-help-request");
  };

  return (
    <InnerLayout withBack title="Локация" containerStyle={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{
            uri: "https://fileshare.kaverafisha.ru/storage/origin/2023/08/22/3b2b89c1c60c45f983ea76e221a16ad7.webp",
          }}
          contentFit="cover"
          style={styles.image}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Доброе утро</Text>
            <Rating value={4.7} />
          </View>
          <View style={styles.block}>
            <Text style={styles.subtitle}>Атрибуты доступности</Text>
            <View style={styles.featuresContainer}>
              <Feature title="Пандус" />
              <Feature title="Доступ на механической коляске" />
              <Feature title="Меню со штрифтом Брайля" />
            </View>
          </View>
          <View style={styles.block}>
            <Text style={styles.subtitle}>Доступная среда</Text>
            <Text style={styles.text}>Уютная кофейня с эко-френдли подходом. Скидка за свой стаканчик.</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Button error accented type="secondary" text="Позвать помощника" icon={EIcon.Ring} />
            <View style={styles.buttonsRow}>
              <Button type="primary" text="Отметиться" icon={EIcon.Pin} style={styles.buttonsRowButton} />
              <Button type="secondary" text="Оставить отзыв" icon={EIcon.Bubble} style={styles.buttonsRowButton} />
            </View>
          </View>
          <View style={styles.block}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.subtitle}>Отзывы</Text>
              <Text style={styles.reviewsHeaderCounter}>
                {2} {declOfReviews(2)}
              </Text>
            </View>
            <View style={styles.reviewsContainer}>
              <ReviewBlock
                user="Алексей"
                avatar={3}
                rating={5}
                date={new Date()}
                text="Отличное место! Очень удобный пандус на входе."
                features={["Пандус", "Доступ на механической коляске"]}
              />
              <ReviewBlock
                user="Михаил"
                avatar={4}
                rating={4.5}
                date={new Date()}
                text="Приемлемо."
                features={["Пандус", "Доступ на механической коляске"]}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </InnerLayout>
  );
};

export default LocationScreen;
