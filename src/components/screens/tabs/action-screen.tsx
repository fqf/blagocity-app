import { FC, useRef } from "react";
import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BlurTargetView } from "expo-blur";
import Constants from "expo-constants";
import { Image } from "expo-image";
import IconButton from "@/components/buttons/icon-button";
import EIcon from "@/models/enums/icon";
import Feature from "@/components/others/feature";
import DropShadow from "react-native-drop-shadow";
import OnboardingButton from "@/components/buttons/onboarding-button";
import COLORS from "@/constants/colors";
import Icon from "@/components/icons/icon";

type TProps = {
  id: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 300,
  },
  topHud: {
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
  bottomHud: {
    width: "100%",
    zIndex: 1,
    elevation: 1,
    position: "absolute",
    paddingHorizontal: 20,
    top: 180,
    alignItems: "flex-start",
    gap: 8,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontFamily: "LexendDeca-ExtraBold",
    fontSize: 30,
    color: "white",
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "white",
    marginTop: -20,
    paddingTop: 20,
    gap: 24,
  },
  texts: {
    gap: 8,
    paddingHorizontal: 20,
  },
  subTitle: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 18,
    color: COLORS.text,
  },
  description: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.label,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  detailsBlock: {
    backgroundColor: COLORS.blockBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    padding: 16,
    gap: 12,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  rowTitle: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
    color: COLORS.text,
  },
  rowDescription: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.label,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorder,
    paddingTop: 32,
    paddingBottom: 32,
  },
});
const ActionScreen: FC<TProps> = ({ id }) => {
  const router = useRouter();
  const blurRef = useRef(null);
  const handleOnBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <BlurTargetView ref={blurRef}>
        <Image
          source={{
            uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/15/7e/cf/artur-restorant.jpg?w=1000&h=-1&s=1",
          }}
          contentFit="cover"
          style={styles.image}
        />
      </BlurTargetView>
      <View style={styles.topHud}>
        <IconButton icon={EIcon.ChevronLeft} blurTarget={blurRef} onPress={handleOnBackPress} />
        <IconButton icon={EIcon.Like} blurTarget={blurRef} />
      </View>
      <View style={styles.bottomHud}>
        <DropShadow style={styles.shadow}>
          <Feature variant="error" icon={EIcon.Label} title="Первое бесплатно" />
        </DropShadow>
        <Text style={styles.title}>Доброе утро</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.texts}>
          <Text style={styles.subTitle}>Описание акции</Text>
          <Text style={styles.description}>
            Уютная кофейня с эко-френдли подходом. Скидка за свой стаканчик. Получите эксклюзивную скидку при посещении.
            Предложение ограничено и доступно только для активных пользователей приложения.
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsBlock}>
            <View style={styles.rowContainer}>
              <Icon icon={EIcon.Clock} style={styles.icon} />
              <View>
                <Text style={styles.rowTitle}>Срок действия</Text>
                <Text style={styles.rowDescription}>До 31 декабря 2026 г.</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <Icon icon={EIcon.Info} style={styles.icon} />
              <View>
                <Text style={styles.rowTitle}>Условия</Text>
                <Text style={styles.rowDescription}>
                  Скидка не суммируется с другими акциями и спецпредложениями заведения.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <OnboardingButton text="Получить купон" />
        </View>
      </View>
    </View>
  );
};

export default ActionScreen;
