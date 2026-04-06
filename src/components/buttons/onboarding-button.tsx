import { FC, useEffect } from "react";
import Svg, { Path } from "react-native-svg";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "@/constants/colors";
import DropShadow from "react-native-drop-shadow";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated";

type TProps = {
  text: string;
  pendingText?: string;
  pending?: boolean;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  shape: {
    width: Dimensions.get("window").width - 40,
    height: ((Dimensions.get("window").width - 40) * 52) / 331,
    // @ts-ignore
    fill: COLORS.active,
  },
  shadow: {
    shadowColor: COLORS.active,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "LexendDeca-Medium",
    fontSize: 18,
    lineHeight: 18,
    color: "white",
  },
});
const OnboardingButton: FC<TProps> = ({ text, pendingText, pending, onPress }) => {
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (pending) {
      opacity.value = withDelay(
        500,
        withRepeat(
          withTiming(0.5, {
            duration: 1000,
          }),
          -1,
          true,
        ),
      );
    }
  }, [opacity, pending]);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity disabled={pending} activeOpacity={0.65} style={styles.container} onPress={onPress}>
        <DropShadow style={styles.shadow}>
          <Svg viewBox="0 0 331 52" style={styles.shape}>
            <Path d="M0 15.724C0 8.101 6.07 1.881 13.693 1.742 43.503 1.2 115.637-.01 166 0c49.917.01 121.606 1.206 151.308 1.744C324.931 1.882 331 8.102 331 15.726v20.548c0 7.624-6.069 13.844-13.692 13.982C287.606 50.794 215.917 51.99 166 52c-50.362.01-122.498-1.2-152.307-1.742C6.07 50.119 0 43.899 0 36.276z" />
          </Svg>
        </DropShadow>
        <View style={styles.content}>
          <Text style={styles.text}>{pending && !!pendingText ? pendingText : text}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default OnboardingButton;
