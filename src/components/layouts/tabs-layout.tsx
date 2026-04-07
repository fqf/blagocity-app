import { FC } from "react";
import TContainerProps from "@/models/types/container-props";
import GlobalLayout from "@/components/layouts/global-layout";
import { StyleSheet, View } from "react-native";
import TabBar from "@/components/others/tab-bar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    width: "100%",
    alignItems: "center",
  },
});
const TabsLayout: FC<TContainerProps> = ({ children }) => {
  return (
    <GlobalLayout>
      <View style={styles.container}>
        {children}
        <View style={styles.tabBarContainer}>
          <TabBar />
        </View>
      </View>
    </GlobalLayout>
  );
};

export default TabsLayout;
