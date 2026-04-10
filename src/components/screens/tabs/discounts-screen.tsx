import { FC } from "react";
import TabsLayout from "@/components/layouts/tabs-layout";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const DiscountsScreen: FC = () => {
  return (
    <TabsLayout>
      <View style={styles.container}></View>
    </TabsLayout>
  );
};

export default DiscountsScreen;
