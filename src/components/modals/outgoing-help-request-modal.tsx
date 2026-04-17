import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/buttons/button";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import CloseButton from "@/components/buttons/close-button";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  close: {
    position: "absolute",
    top: 24,
    right: 24,
  },
  ringContainer: {
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 20,
    borderColor: COLORS.errorBackground,
    backgroundColor: COLORS.error,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  ringIcon: {
    width: 48,
    height: 48,
  },
  title: {
    fontFamily: "LexendDeca-ExtraBold",
    fontSize: 30,
    color: COLORS.text,
  },
  description: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.label,
    textAlign: "center",
    marginTop: 16,
  },
  name: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 18,
    color: COLORS.text,
  },
  timerBlock: {
    borderRadius: 16,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 48,
    marginTop: 32,
  },
  timeTitle: {
    fontFamily: "LexendDeca-Medium",
    fontSize: 14,
    color: COLORS.label,
  },
  time: {
    fontFamily: "LexendDeca-ExtraBold",
    fontSize: 24,
    color: COLORS.text,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
const OutgoingHelpRequestModal: FC = () => {
  const router = useRouter();
  const handleOnClosePress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <CloseButton style={styles.close} onPress={handleOnClosePress} />
          <View style={styles.ringContainer}>
            <Icon icon={EIcon.Ring} fill="white" style={styles.ringIcon} />
          </View>
          <Text style={styles.title}>Вызов отправлен</Text>
          <Text style={styles.description}>
            Сотрудники <Text style={styles.name}>Доброе утро</Text> получили ваше уведомление и скоро подойдут.
          </Text>
          <View style={styles.timerBlock}>
            <Icon icon={EIcon.Clock} style={styles.icon} />
            <View>
              <Text style={styles.timeTitle}>Время ожидания</Text>
              <Text style={styles.time}>00:03</Text>
            </View>
          </View>
          <Button fullWidth size="large" type="secondary" text="Отменить вызов" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default OutgoingHelpRequestModal;
