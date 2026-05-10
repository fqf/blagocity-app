import { FC, useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated";
import COLORS from "@/constants/colors";

type TProps = {
  size?: number;
};

const Preloader: FC<TProps> = ({ size }) => {
  const scale = useSharedValue(0.01);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      borderRadius: "50%",
      backgroundColor: COLORS.active,
      width: size ?? 1500,
      height: size ?? 1500,
      opacity: 0.01 / scale.value,
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

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

  return <Animated.View style={animatedStyle} />;
};

export default Preloader;
