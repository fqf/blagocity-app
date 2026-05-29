import { FC, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { Image } from "expo-image";
import IconButton from "@/components/buttons/icon-button";
import EIcon from "@/models/enums/icon";
import OnboardingButton from "@/components/buttons/onboarding-button";
import COLORS from "@/constants/colors";
import Icon from "@/components/icons/icon";
import Skeleton from "@/components/others/skeleton";
import * as SecureStore from "expo-secure-store";
import processError from "@/lib/process-error";
import { getDiscount } from "@/actions/discount-actions";

type TProps = {
  id: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageSkeleton: {
    height: 300,
    width: "100%",
    borderRadius: 0,
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
    top: 210,
    alignItems: "flex-start",
    gap: 8,
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
  subTitleSkeleton: {
    height: 30,
    width: 150,
  },
  subTitle: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 18,
    color: COLORS.text,
  },
  descriptionSkeleton: {
    height: 150,
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
  detailsSkeleton: {
    height: 145,
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
    paddingBottom: 30,
  },
});
const ActionScreen: FC<TProps> = ({ id }) => {
  const [pending, setPending] = useState(true);
  const router = useRouter();
  const handleOnBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  const handleOnCouponPress = () => {
    router.push("/tabs/discounts/action/coupon");
  };

  useEffect(() => {
    const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

    (async () => {
      try {
        if (!token) {
          throw new Error("Bad token");
        }

        console.log(id);

        const actionResponse = await getDiscount(token, id);
        console.log(actionResponse);
      } catch (e: unknown) {
        await processError(e);
      }
    })();
  }, [id]);

  return (
    <View style={styles.container}>
      {pending && <Skeleton style={styles.imageSkeleton} />}
      {!pending && (
        <Image
          source={{
            uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/15/7e/cf/artur-restorant.jpg?w=1000&h=-1&s=1",
          }}
          contentFit="cover"
          style={styles.image}
        />
      )}
      <View style={styles.topHud}>
        <IconButton icon={EIcon.ChevronLeft} onPress={handleOnBackPress} />
        {!pending && <IconButton icon={EIcon.Like} />}
      </View>
      {!pending && (
        <View style={styles.bottomHud}>
          <Text style={styles.title}>Доброе утро</Text>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.texts}>
          {pending && <Skeleton style={styles.subTitleSkeleton} />}
          {!pending && <Text style={styles.subTitle}>Описание акции</Text>}
          {pending && <Skeleton style={styles.descriptionSkeleton} />}
          {!pending && (
            <Text style={styles.description}>
              Уютная кофейня с эко-френдли подходом. Скидка за свой стаканчик. Получите эксклюзивную скидку при
              посещении. Предложение ограничено и доступно только для активных пользователей приложения.
            </Text>
          )}
        </View>
        <View style={styles.detailsContainer}>
          {pending && <Skeleton style={styles.detailsSkeleton} />}
          {!pending && (
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
          )}
        </View>
        {!pending && (
          <View style={styles.footer}>
            <OnboardingButton text="Получить купон" icon={EIcon.QRCode} onPress={handleOnCouponPress} />
          </View>
        )}
      </View>
    </View>
  );
};

export default ActionScreen;
