import { FC } from "react";
import { StyleSheet, View } from "react-native";
import TabsLayout from "@/components/layouts/tabs-layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const ClanScreen: FC = () => {
  return (
    <TabsLayout>
      <View style={styles.container}></View>
    </TabsLayout>
  );
};

export default ClanScreen;
