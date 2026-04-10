import { FC } from "react";
import TContainerProps from "@/models/types/container-props";
import { StyleSheet, View } from "react-native";
import TabBar from "@/components/others/tab-bar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  tabBarContainer: {
    width: "100%",
    alignItems: "center",
  },
});
const TabsLayout: FC<TContainerProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.tabBarContainer}>
        <TabBar />
      </View>
    </View>
  );
};

export default TabsLayout;
