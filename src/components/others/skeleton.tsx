import { FC, useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

type TProps = {
  style?: object;
};

const styles = StyleSheet.create({
  block: {
    borderRadius: 12,
    backgroundColor: COLORS.inputBorder,
    width: "100%",
    height: 42,
  },
});
const Skeleton: FC<TProps> = ({ style }) => {
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
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
  }, [opacity]);

  return <Animated.View style={[styles.block, style, animatedStyle]} />;
};

export default Skeleton;
