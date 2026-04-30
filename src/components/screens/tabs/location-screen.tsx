import { FC } from "react";
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
import Icon from "@/components/icons/icon";
import IconButton from "@/components/buttons/icon-button";
import Constants from "expo-constants";

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
  hud: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
    elevation: 1,
    position: "absolute",
    top: Constants.statusBarHeight,
    paddingHorizontal: 20,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  block: {
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
  description: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 16,
    color: COLORS.active,
  },
  addressContainer: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
    gap: 6,
  },
  address: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.icon,
  },
  addressIcon: {
    width: 16,
    height: 16,
  },
  authorContainer: {
    backgroundColor: COLORS.blockBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    padding: 16,
    gap: 12,
  },
  authorHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  authorIcon: {
    width: 16,
    height: 16,
  },
  authorTitle: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.text,
  },
  authorName: {
    fontFamily: "LexendDeca-SemiBold",
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
  const handleOnBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  const handleOnAlertPress = () => {
    router.push("/tabs/map/location/outgoing-help-request");
  };
  const handleOnCreateReviewPress = () => {
    router.push("/tabs/map/location/check-in");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/15/7e/cf/artur-restorant.jpg?w=1000&h=-1&s=1",
        }}
        contentFit="cover"
        style={styles.image}
      />
      <View style={styles.hud}>
        <IconButton icon={EIcon.ChevronLeft} onPress={handleOnBackPress} />
        <IconButton icon={EIcon.Like} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Доброе утро</Text>
            <Text style={styles.description}>Кафе</Text>
            <View style={styles.addressContainer}>
              <Icon icon={EIcon.PinOutlined} fill={COLORS.icon} style={styles.addressIcon} />
              <Text style={styles.address}>ул. Ленина, 12</Text>
            </View>
          </View>
          <Rating value={4.7} />
        </View>
        <View style={styles.authorContainer}>
          <View style={styles.authorHeader}>
            <Icon icon={EIcon.Profile} fill={COLORS.icon} style={styles.authorIcon} />
            <Text style={styles.authorTitle}>
              Кем создано: <Text style={styles.authorName}>Иван Иванов</Text>
            </Text>
          </View>
          <Feature icon={EIcon.Shield} title="Владелец отслеживает отзывы" variant="success" />
        </View>
        <View style={styles.block}>
          <Text style={styles.subtitle}>Атрибуты доступности</Text>
          <View style={styles.featuresContainer}>
            <Feature icon={EIcon.Checked} title="Пандус" />
            <Feature icon={EIcon.Checked} title="Доступ на механической коляске" />
            <Feature icon={EIcon.Checked} title="Меню со штрифтом Брайля" />
          </View>
        </View>
        <View style={styles.block}>
          <Text style={styles.subtitle}>Доступная среда</Text>
          <Text style={styles.text}>Уютная кофейня с эко-френдли подходом. Скидка за свой стаканчик.</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button error type="secondary" text="Позвать помощника" icon={EIcon.Ring} onPress={handleOnAlertPress} />
          <View style={styles.buttonsRow}>
            <Button type="primary" text="Отметиться" icon={EIcon.PinOutlined} style={styles.buttonsRowButton} />
            <Button
              type="secondary"
              text="Оставить отзыв"
              icon={EIcon.Bubble}
              style={styles.buttonsRowButton}
              onPress={handleOnCreateReviewPress}
            />
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
  );
};

export default LocationScreen;
