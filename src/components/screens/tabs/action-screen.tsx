import { FC, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
import dayjs from "dayjs";

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
    zIndex: 2,
    elevation: 2,
    position: "absolute",
    top: Constants.statusBarHeight,
    paddingHorizontal: 20,
  },
  header: {
    position: "absolute",
    zIndex: 1,
    elevation: 1,
    width: "100%",
    height: 284,
  },
  bottomHud: {
    width: "100%",
    position: "absolute",
    paddingHorizontal: 20,
    bottom: 16,
    alignItems: "flex-start",
    gap: 8,
  },
  title: {
    fontFamily: "LexendDeca-ExtraBold",
    fontSize: 30,
    color: "white",
  },
  scrollable: {
    flex: 1,
    marginTop: -16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "white",
  },
  content: {
    gap: 24,
    paddingTop: 20,
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
    paddingTop: 20,
    paddingBottom: 30,
  },
});
const ActionScreen: FC<TProps> = ({ id }) => {
  const [pending, setPending] = useState(true);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [end, setEnd] = useState<string | undefined>();
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

        const actionResponse = await getDiscount(token, id);
        setImage(actionResponse.data.image_url);
        setName(actionResponse.data.name);
        setDescription(actionResponse.data.description);
        setEnd(actionResponse.data.end);
      } catch (e: unknown) {
        await processError(e);
      }

      setPending(false);
    })();
  }, [id]);

  return (
    <View style={styles.container}>
      {pending && <Skeleton style={styles.imageSkeleton} />}
      {!pending && !!image && (
        <Image
          source={{
            uri: image,
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
        <View style={styles.header}>
          <View style={styles.bottomHud}>
            <Text style={styles.title}>{name}</Text>
          </View>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollable} contentContainerStyle={styles.content}>
        <View style={styles.texts}>
          {pending && <Skeleton style={styles.subTitleSkeleton} />}
          {!pending && <Text style={styles.subTitle}>Описание акции</Text>}
          {pending && <Skeleton style={styles.descriptionSkeleton} />}
          {!pending && <Text style={styles.description}>{description}</Text>}
        </View>
        <View style={styles.detailsContainer}>
          {pending && <Skeleton style={styles.detailsSkeleton} />}
          {!pending && !!end && (
            <View style={styles.detailsBlock}>
              <View style={styles.rowContainer}>
                <Icon icon={EIcon.Clock} style={styles.icon} />
                <View>
                  <Text style={styles.rowTitle}>Срок действия</Text>
                  <Text style={styles.rowDescription}>До {dayjs(end).locale("ru").format("DD MMMM YYYY")} г.</Text>
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
      </ScrollView>
    </View>
  );
};

export default ActionScreen;
