import { FC } from "react";
import { StyleSheet, View } from "react-native";
import TabButton from "@/components/buttons/tab-button";
import EIcon from "@/models/enums/icon";
import Svg, { Path } from "react-native-svg";
import COLORS from "@/constants/colors";
import AddButton from "@/components/buttons/add-button";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    zIndex: 100,
    elevation: 100,
    width: 375,
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 120,
  },
  addContainer: {
    position: "absolute",
    bottom: 26,
  },
  bar: {
    width: 375,
    height: 56,
    position: "absolute",
    bottom: 0,
  },
  left: {
    flexDirection: "row",
    gap: 24,
  },
  right: {
    flexDirection: "row",
    gap: 24,
  },
});
const TabBar: FC = () => {
  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 375 56" style={styles.bar}>
        <Path
          fill={COLORS.tabBar}
          d="M0 22C0 9.85 9.85 0 22 0h132c10.148 0 8 27 33.5 27 27 0 25.235-27 35-27H353c12.15 0 22 9.85 22 22v34H0z"
        />
      </Svg>
      <View style={styles.left}>
        <TabButton icon={EIcon.Map} href="/tabs/map" />
        <TabButton icon={EIcon.Percent} href="/tabs/discounts" />
      </View>
      <View style={styles.right}>
        <TabButton icon={EIcon.Clans} href="/tabs/clan" />
        <TabButton icon={EIcon.Search} href="/tabs/search" />
      </View>
      <View style={styles.addContainer}>
        <AddButton />
      </View>
    </View>
  );
};

export default TabBar;
