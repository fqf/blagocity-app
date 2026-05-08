import { FC } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import TabButton from "@/components/buttons/tab-button";
import EIcon from "@/models/enums/icon";
import COLORS from "@/constants/colors";
import AddButton from "@/components/buttons/add-button";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    zIndex: 100,
    elevation: 100,
    width: Dimensions.get("window").width - 40,
    height: 64,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 120,
    backgroundColor: COLORS.tabBar,
    paddingBottom: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  addContainer: {
    position: "absolute",
    bottom: 34,
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
