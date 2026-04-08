import { FC } from "react";
import ShadowBlock from "@/components/others/shadow-block";
import EIcon from "@/models/enums/icon";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconBlock from "@/components/others/icon-block";
import COLORS from "@/constants/colors";
import chroma from "chroma-js";
import { Href, useRouter } from "expo-router";
import hairlineWidth = StyleSheet.hairlineWidth;

type TButtonProps = {
  icon: EIcon;
  title: string;
  description: string;
  href: Href;
  isLast?: boolean;
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: hairlineWidth,
    borderBottomColor: chroma(COLORS.label).alpha(0.5).hex(),
    gap: 12,
  },
  title: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 16,
    color: COLORS.text,
  },
  description: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 12,
    color: COLORS.label,
  },
  menuContainer: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 16,
  },
});
const items: { icon: EIcon; title: string; description: string; href: Href }[] = [
  {
    icon: EIcon.Profile,
    title: "Данные профиля",
    description: "Изменить особенности и доступность",
    href: "/tabs/others/profile/accessibility",
  },
  {
    icon: EIcon.Ring,
    title: "Уведомления",
    description: "Настроить пуши и рассылки",
    href: "/tabs/others/profile/notifications",
  },
  {
    icon: EIcon.Shield,
    title: "Приватность",
    description: "Кто видит вашу активность",
    href: "/tabs/others/profile/privacy",
  },
  {
    icon: EIcon.Question,
    title: "Помощь и поддержка",
    description: "FAQ и связь с разработчиками",
    href: "/tabs/others/profile/support",
  },
];
const NavigationMenuButton: FC<TButtonProps> = ({ icon, title, description, href, isLast }) => {
  const router = useRouter();
  const handleOnPress = () => {
    router.push(href);
  };

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, isLast ? { borderBottomColor: "transparent" } : null]}
      activeOpacity={0.5}
      onPress={handleOnPress}>
      <IconBlock icon={icon} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};
const NavigationMenu: FC = () => {
  return (
    <ShadowBlock>
      <View style={styles.menuContainer}>
        {items.map((item, i) => (
          <NavigationMenuButton
            key={i}
            icon={item.icon}
            title={item.title}
            description={item.description}
            href={item.href}
            isLast={i === items.length - 1}
          />
        ))}
      </View>
    </ShadowBlock>
  );
};

export default NavigationMenu;
