import { FC, useEffect, useState } from "react";
import CloseButton from "@/components/buttons/close-button";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import COLORS from "@/constants/colors";
import Input from "@/components/inputs/input";
import UploadButton from "@/components/buttons/upload-button";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import FeaturePicker from "@/components/pickers/feature-picker";
import OnboardingButton from "@/components/buttons/onboarding-button";
import hairlineWidth = StyleSheet.hairlineWidth;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    gap: 38,
    paddingTop: 20,
    paddingBottom: 30,
  },
  close: {
    position: "absolute",
    top: 24,
    right: 24,
  },
  header: {
    height: 74,
    justifyContent: "center",
    borderBottomColor: COLORS.inputBorder,
    borderBottomWidth: hairlineWidth,
    paddingLeft: 20,
  },
  title: {
    fontFamily: "LexendDeca-ExtraLight",
    fontSize: 20,
    color: COLORS.text,
  },
  block: {
    paddingHorizontal: 20,
    gap: 12,
  },
  label: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
    color: COLORS.text,
  },
  icon: {
    width: 28,
    height: 28,
  },
  ratingForm: {
    alignSelf: "center",
    gap: 20,
  },
  ratingTitle: {
    fontFamily: "LexendDeca-ExtraLight",
    fontSize: 18,
    color: COLORS.text,
    textAlign: "center",
  },
  ratingButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  star: {
    width: 28,
    height: 28,
  },
  description: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.text,
  },
  featuresContainer: {
    gap: 16,
  },
});
const featureItems = [
  {
    title: "Доступ на механической коляске",
  },
  {
    title: "Доступ на механической коляске с электроприставкой",
  },
  {
    title: "Доступ на электрической коляске",
  },
  {
    title: "Санузел для людей с инвалидностью",
  },
  {
    title: "Лифт",
  },
  {
    title: "Пандус",
  },
  {
    title: "Тактильные указатели",
  },
  {
    title: "Оборудованное место для человека с инвалидностью",
  },
  {
    title: "Световая/Цветовая индикация",
  },
  {
    title: "Звуковая индикация (например, меню)",
  },
  {
    title: "Меню со штрифтом Брайля",
  },
  {
    title: "Доступ с собакой-поводырем",
  },
  {
    title: "Подарки Дону",
  },
  {
    title: "Бронирование и предварительная подготовка",
  },
  {
    title: "Помощник (приложение/премиум)",
  },
];
const CreateReviewModal: FC = () => {
  const [behavior, setBehavior] = useState<"height" | undefined>();
  const router = useRouter();
  const handleOnClosePress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      const showListener = Keyboard.addListener("keyboardDidShow", () => {
        setBehavior("height");
      });
      const hideListener = Keyboard.addListener("keyboardDidHide", () => {
        setBehavior(undefined);
      });

      return () => {
        showListener.remove();
        hideListener.remove();
      };
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView behavior={Platform.OS === "android" ? behavior : "height"} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Оставить отзыв</Text>
        </View>
        <CloseButton style={styles.close} onPress={handleOnClosePress} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.ratingForm}>
            <Text style={styles.ratingTitle}>Как вам Доброе Утро?</Text>
            <View style={styles.ratingButtons}>
              {new Array(10).fill("").map((_, i) => (
                <TouchableOpacity key={i}>
                  <Icon icon={EIcon.Star} style={styles.star} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.block}>
            <Text style={styles.label}>Отзыв</Text>
            <Input multiline placeholder="Опишите ваши впечатления о доступности этого места..." />
          </View>
          <View style={styles.block}>
            <Text style={styles.label}>Фотографии</Text>
            <UploadButton />
          </View>
          <View style={styles.block}>
            <Text style={[styles.ratingTitle, { textAlign: "left" }]}>Оцените доступность</Text>
            <Text style={styles.description}>
              Помогите другим пользователям, оценив наличие следующих элементов доступной среды.
            </Text>
            <View style={styles.featuresContainer}>
              {featureItems.map(({ title }, i) => (
                <FeaturePicker key={i} title={title} />
              ))}
            </View>
          </View>
          <OnboardingButton text="Опубликовать отзыв" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateReviewModal;
