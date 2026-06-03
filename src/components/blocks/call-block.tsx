import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/buttons/button";
import COLORS from "@/constants/colors";
import Tag from "@/components/others/tag";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import dayjs from "dayjs";
import chroma from "chroma-js";

type TProps = {
  name: string;
  time: string;
  status: "incoming" | "rejected" | "accepted";
  onButtonPress: () => void;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
    borderLeftWidth: 4,
    gap: 20,
  },
  containerIncoming: {
    borderLeftColor: COLORS.error,
  },
  containerAccepted: {
    borderLeftColor: COLORS.success,
  },
  containerRejected: {
    borderLeftColor: chroma(COLORS.icon).alpha(0.65).hex(),
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  texts: {
    gap: 2,
    paddingLeft: 60,
  },
  name: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 16,
    color: COLORS.text,
  },
  icon: {
    width: 16,
    height: 16,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  time: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
    color: COLORS.error,
  },
});
const CallBlock: FC<TProps> = ({ name, time, status, onButtonPress }) => {
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    let duration = dayjs.duration(0, "s");
    const interval = setInterval(() => {
      duration = duration.add(1, "s");
      setTimer(duration.format("mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={[
        styles.container,
        status === "incoming"
          ? styles.containerIncoming
          : status === "accepted"
            ? styles.containerAccepted
            : styles.containerRejected,
      ]}>
      <View style={styles.header}>
        <View style={styles.texts}>
          <Text style={styles.name}>{name}</Text>
          {status === "incoming" && (
            <View style={styles.timeContainer}>
              <Icon icon={EIcon.Clock} fill={COLORS.error} style={styles.icon} />
              <Text style={styles.time}>{timer}</Text>
            </View>
          )}
        </View>
        {status !== "incoming" && (
          <Tag
            text={status === "accepted" ? "Принято" : "Отменено"}
            variant={status === "accepted" ? "success" : "default"}
          />
        )}
      </View>
      <Button
        size="large"
        type={status === "incoming" ? "primary" : "secondary"}
        theme={status === "incoming" ? "active" : "default"}
        text={status === "incoming" ? "Принять вызов" : status === "accepted" ? "Завершить" : "Удалить"}
        onPress={onButtonPress}
      />
    </View>
  );
};

export default CallBlock;
