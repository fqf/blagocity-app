import { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import Button from "@/components/buttons/button";
import CloseButton from "@/components/buttons/close-button";
import { useRouter } from "expo-router";
import DropShadow from "react-native-drop-shadow";

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
    marginTop: Dimensions.get("window").height - 510,
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
});
const CouponModal: FC = () => {
  const router = useRouter();
  const handleOnClosePress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.container}>
        <CloseButton style={styles.close} onPress={handleOnClosePress} />
        <View style={styles.texts}>
          <Text style={styles.title}>Ваш купон</Text>
          <Text style={styles.description}>Покажите этот код на кассе для получения скидки</Text>
        </View>
        <View style={styles.imageContainer}>
          <Icon icon={EIcon.QRCode} fill={COLORS.text} />
        </View>
        <Button fullWidth type="secondary" theme="default" text="V3R4RLP3" />
      </View>
    </DropShadow>
  );
};

export default CouponModal;
