import { FC } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Header from "@/components/others/header";
import ProfileBlock from "@/components/blocks/profile-block";
import ExitButton from "@/components/buttons/exit-button";
import NavigationMenu from "@/components/others/navigation-menu";
import COLORS from "@/constants/colors";
import { version } from "@/../package.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 24,
    backgroundColor: COLORS.background,
  },
  versionText: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 12,
    color: COLORS.label,
    textAlign: "center",
  },
});
const SettingsScreen: FC = () => {
  return (
    <>
      <Header withBack title="Настройки" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/*<ProfileBlock />*/}
        {/*<NavigationMenu />*/}
        <ExitButton />
        <Text style={styles.versionText}>Версия приложения {version}</Text>
      </ScrollView>
    </>
  );
};

export default SettingsScreen;
