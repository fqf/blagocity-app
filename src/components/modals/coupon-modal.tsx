import { FC, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";
import CloseButton from "@/components/buttons/close-button";
import { useLocalSearchParams, useRouter } from "expo-router";
import DropShadow from "react-native-drop-shadow";
import Skeleton from "@/components/others/skeleton";
import { getDiscountCode } from "@/actions/discount-actions";
import * as SecureStore from "expo-secure-store";
import processError from "@/lib/process-error";

const styles = StyleSheet.create({
  shadow: {
    flex: 1,
    width: "100%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    marginTop: Dimensions.get("window").height - 350,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  close: {
    position: "absolute",
    top: 24,
    right: 24,
    zIndex: 1,
    elevation: 1,
  },
  texts: {
    gap: 8,
  },
  title: {
    fontFamily: "LexendDeca-ExtraBold",
    fontSize: 24,
    color: COLORS.text,
    textAlign: "center",
  },
  description: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.label,
    textAlign: "center",
    paddingHorizontal: 50,
  },
  imageContainer: {
    width: 260,
    height: 260,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    borderStyle: "dashed",
  },
  code: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 40,
    textAlign: "center",
    color: COLORS.active,
  },
  error: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 20,
    textAlign: "center",
    color: COLORS.error,
  },
  skeleton: {
    height: 60,
    width: 250,
  },
});
const CouponModal: FC = () => {
  const { id } = useLocalSearchParams();
  const [pending, setPending] = useState(true);
  const [status, setStatus] = useState<"error" | "success" | undefined>();
  const [promoCode, setPromoCode] = useState("");
  const router = useRouter();
  const handleOnClosePress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  useEffect(() => {
    if (id && typeof id === "string") {
      const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

      if (token) {
        (async () => {
          try {
            const { data, status } = await getDiscountCode(token, id);

            if (status === "success") {
              setStatus("success");
              setPromoCode(data.code);
            } else {
              setStatus("error");
              setPromoCode("Ошибка получения данных...");
            }
          } catch (e: unknown) {
            await processError(e);
          }

          setPending(false);
        })();
      }
    }
  }, [id]);

  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.container}>
        <CloseButton style={styles.close} onPress={handleOnClosePress} />
        <View style={styles.texts}>
          <Text style={styles.title}>Ваш промокод</Text>
          <Text style={styles.description}>Покажите этот промокод на кассе для получения скидки:</Text>
        </View>
        {pending && <Skeleton style={styles.skeleton} />}
        {!pending && status === "success" && <Text style={styles.code}>{promoCode}</Text>}
        {!pending && status === "error" && <Text style={styles.error}>{promoCode}</Text>}
      </View>
    </DropShadow>
  );
};

export default CouponModal;
