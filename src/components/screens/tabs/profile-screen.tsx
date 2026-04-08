import { FC } from "react";
import TabsLayout from "@/components/layouts/tabs-layout";
import { ScrollView, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "red",
    height: 76,
    width: "100%",
  },
});
const ProfileScreen: FC = () => {
  return (
    <TabsLayout>
      <View style={styles.header}></View>
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </TabsLayout>
  );
};

export default ProfileScreen;
