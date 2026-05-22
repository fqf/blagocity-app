import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/buttons/button";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import CloseButton from "@/components/buttons/close-button";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import TimerBlock from "@/components/blocks/timer-block";

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
    zIndex: 1,
    elevation: 1,
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
  successContainer: {
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 20,
    borderColor: COLORS.successBackground,
    backgroundColor: COLORS.success,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  ringIcon: {
    width: 48,
    height: 48,
  },
  successIcon: {
    width: 64,
    height: 64,
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
  buttons: {
    width: "100%",
    gap: 12,
    alignItems: "stretch",
    marginTop: 48,
  },
});
const CallModal: FC = () => {
  const [status, setStatus] = useState<"sent" | "received">("sent");
  const { name } = useLocalSearchParams();
  const scale = useSharedValue(0.01);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      borderRadius: "50%",
      backgroundColor: COLORS.error,
      width: 1500,
      height: 1500,
      opacity: 0.01 / scale.value,
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });
  const router = useRouter();
  const handleOnClosePress = () => {
    if (router.canGoBack()) {
      cancelAnimation(scale);
      scale.set(0.01);
      router.back();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setStatus("received");
    }, 7500);
  }, []);
  useEffect(() => {
    scale.value = withDelay(
      500,
      withRepeat(
        withTiming(1, {
          duration: 1000,
        }),
        -1,
        false,
      ),
    );
  }, [scale]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <CloseButton style={styles.close} onPress={handleOnClosePress} />
        {status === "sent" && (
          <View style={styles.ringContainer}>
            <Animated.View style={animatedStyle} />
            <Icon icon={EIcon.Ring} fill="white" style={styles.ringIcon} />
          </View>
        )}
        {status === "received" && (
          <View style={styles.successContainer}>
            <Icon icon={EIcon.Success} fill="white" style={styles.successIcon} />
          </View>
        )}
        {status === "sent" && <Text style={styles.title}>Вызов отправлен</Text>}
        {status === "received" && <Text style={styles.title}>Помощник в пути!</Text>}
        {status === "sent" && (
          <Text style={styles.description}>
            Сотрудники <Text style={styles.name}>{name}</Text> получили ваше уведомление и скоро подойдут.
          </Text>
        )}
        {status === "received" && (
          <Text style={styles.description}>
            Сотрудник принял ваш вызов и уже направляется к вам. Пожалуйста, оставайтесь на месте.
          </Text>
        )}
        {status === "sent" && <TimerBlock />}
        <View style={styles.buttons}>
          {status === "sent" && (
            <Button fullWidth size="large" type="secondary" theme="default" text="Отменить вызов" />
          )}
          {status === "received" && (
            <>
              <Button
                fullWidth
                size="large"
                type="primary"
                theme="active"
                text="Хорошо, жду"
                onPress={handleOnClosePress}
              />
              <Button fullWidth size="large" type="secondary" theme="default" text="Отменить вызов" />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CallModal;
