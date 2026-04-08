import { FC } from "react";
import TabsLayout from "@/components/layouts/tabs-layout";
import { ScrollView, StyleSheet, Text } from "react-native";
import Header from "@/components/others/header";
import ProfileBlock from "@/components/others/profile-block";
import ExitButton from "@/components/buttons/exit-button";
import NavigationMenu from "@/components/others/navigation-menu";
import COLORS from "@/constants/colors";
import { version } from "../../../../package.json";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 24,
  },
  versionText: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 12,
    color: COLORS.label,
    textAlign: "center",
  },
});
const ProfileScreen: FC = () => {
  return (
    <TabsLayout>
      <Header withBack title="Профиль" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <ProfileBlock />
        <NavigationMenu />
        <ExitButton />
        <Text style={styles.versionText}>Версия приложения {version}</Text>
      </ScrollView>
    </TabsLayout>
  );
};

export default ProfileScreen;
