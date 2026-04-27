import { FC, useEffect, useState } from "react";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "@/constants/colors";
import dayjs from "dayjs";

const styles = StyleSheet.create({
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
const TimerBlock: FC = () => {
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    let duration = dayjs.duration(0, "s");
    const interval = setInterval(() => {
      duration = duration.add(1, "s");
      setTime(duration.format("mm:ss"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.timerBlock}>
      <Icon icon={EIcon.Clock} style={styles.icon} />
      <View>
        <Text style={styles.timeTitle}>Время ожидания</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default TimerBlock;
