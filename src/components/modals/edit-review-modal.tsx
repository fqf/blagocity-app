import { FC, useEffect, useState } from "react";
import CloseButton from "@/components/buttons/close-button";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import COLORS from "@/constants/colors";
import Input from "@/components/inputs/input";
import UploadButton from "@/components/buttons/upload-button";
import Icon from "@/components/icons/icon";
import EIcon from "@/models/enums/icon";
import FeaturePicker, { TFeaturePickerValue } from "@/components/pickers/feature-picker";
import OnboardingButton from "@/components/buttons/onboarding-button";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik } from "formik";
import { createReviewAccessibility, getAccessibilityList } from "@/actions/accesibility-actions";
import editReviewSchema from "@/schemes/tabs/edit-review-schema";
import { isHTTPError, isKyError } from "ky";
import Skeleton from "@/components/others/skeleton";
import TGetAccessibilityListResponse from "@/models/contracts/accessibility/getAccessibilityListResponse";
import { createReview } from "@/actions/review-actions";
import useProfileStore from "@/stores/profile-store";
import dayjs from "dayjs";
import * as SecureStore from "expo-secure-store";
import { useBus } from "react-bus";
import hairlineWidth = StyleSheet.hairlineWidth;

type TValues = {
  guid: string;
  value: TFeaturePickerValue;
}[];

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    gap: 38,
    paddingTop: 20,
    paddingBottom: 30,
  },
  close: {
    position: "absolute",
    top: 24,
    right: 24,
  },
  header: {
    height: 74,
    justifyContent: "center",
    borderBottomColor: COLORS.inputBorder,
    borderBottomWidth: hairlineWidth,
    paddingLeft: 20,
  },
  title: {
    fontFamily: "LexendDeca-ExtraLight",
    fontSize: 20,
    color: COLORS.text,
  },
  block: {
    paddingHorizontal: 20,
    gap: 12,
  },
  label: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
    color: COLORS.text,
  },
  icon: {
    width: 28,
    height: 28,
  },
  ratingForm: {
    alignSelf: "center",
    gap: 20,
  },
  ratingTitle: {
    fontFamily: "LexendDeca-ExtraLight",
    fontSize: 18,
    color: COLORS.text,
    textAlign: "center",
  },
  ratingButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  star: {
    width: 28,
    height: 28,
  },
  description: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.text,
  },
  featuresContainer: {
    gap: 16,
  },
  error: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 12,
    color: COLORS.error,
    textAlign: "center",
  },
  skeleton: {
    height: 100,
  },
});
const EditReviewModal: FC = () => {
  const [pending, setPending] = useState(false);
  const [accessibilityPending, setAccessibilityPending] = useState(true);
  const [accessibility, setAccessibility] = useState<TGetAccessibilityListResponse>([]);
  const [behavior, setBehavior] = useState<"height" | undefined>();
  const { name, location } = useLocalSearchParams();
  const { userData } = useProfileStore();
  const router = useRouter();
  const bus = useBus();
  const handleOnClosePress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  const handleOnAccessibilityPick = (
    values: TValues,
    guid: string,
    value: TFeaturePickerValue,
    setFieldValue: (field: string, value: TValues) => void,
  ) => {
    let reminder: TValues = values;

    if (values.some(v => v.guid === guid)) {
      reminder = reminder.filter(v => v.guid !== guid);
    }

    setFieldValue("accessibility", [...reminder, { guid, value }]);
  };
  const handleOnSubmit = async ({
    rating,
    review,
    accessibility,
  }: {
    rating: number;
    review: string;
    accessibility: TValues;
  }) => {
    setPending(true);

    try {
      const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

      if (!token) {
        throw new Error("Bad token");
      }

      const { guid } = await createReview(token, {
        establishment: `api/establishments/${location}`,
        author: `api/users/${userData?.guid}`,
        rating,
        text: review,
        isActive: true,
        reviewedAt: dayjs().toISOString(),
        photos: [],
      });

      for (const acc of accessibility) {
        await createReviewAccessibility(token, {
          review: `api/reviews/${guid}`,
          criterion: `api/accessibility_criteria/${acc.guid}`,
          value: acc.value === 1 ? true : acc.value === -1 ? false : null,
        });
      }

      bus.emit("refresh-reviews-list");

      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/tabs/map");
      }
    } catch (e) {
      if (isHTTPError(e)) {
        console.error((e.data as any).detail);
      } else if (isKyError(e)) {
        console.error(e.message);
      }

      setPending(false);
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      const showListener = Keyboard.addListener("keyboardDidShow", () => {
        setBehavior("height");
      });
      const hideListener = Keyboard.addListener("keyboardDidHide", () => {
        setBehavior(undefined);
      });

      return () => {
        showListener.remove();
        hideListener.remove();
      };
    }
  }, []);
  useEffect(() => {
    (async () => {
      setAccessibilityPending(true);

      try {
        const response = await getAccessibilityList();
        setAccessibility(response);
      } catch (e) {
        if (isKyError(e)) {
          console.error(e.message);
        }
      }

      setAccessibilityPending(false);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView behavior={Platform.OS === "android" ? behavior : "height"} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Оставить отзыв</Text>
        </View>
        <CloseButton style={styles.close} onPress={handleOnClosePress} />
        <Formik
          initialValues={{ rating: 0, review: "", accessibility: [] as TValues }}
          validationSchema={toFormikValidationSchema(editReviewSchema)}
          onSubmit={handleOnSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
              <View style={styles.ratingForm}>
                <Text style={styles.ratingTitle}>Как вам {name}?</Text>
                <View style={styles.ratingButtons}>
                  {new Array(10).fill("").map((_, i) => (
                    <TouchableOpacity key={i} disabled={pending} onPress={() => setFieldValue("rating", i + 1)}>
                      <Icon
                        icon={values.rating >= i + 1 ? EIcon.StarFilled : EIcon.Star}
                        fill={errors.rating ? COLORS.error : COLORS.active}
                        style={styles.star}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                {!!errors.rating && <Text style={styles.error}>{errors.rating}</Text>}
              </View>
              <View style={styles.block}>
                <Text style={styles.label}>Отзыв</Text>
                <Input
                  multiline
                  placeholder="Опишите ваши впечатления о доступности этого места..."
                  value={values.review}
                  error={touched.review && !!errors.review ? errors.review : ""}
                  disabled={pending}
                  onChange={handleChange("review")}
                  onBlur={handleBlur("review")}
                />
              </View>
              <View style={styles.block}>
                <Text style={styles.label}>Фотографии</Text>
                <UploadButton />
              </View>
              <View style={styles.block}>
                <Text style={[styles.ratingTitle, { textAlign: "left" }]}>Оцените доступность</Text>
                <Text style={styles.description}>
                  Помогите другим пользователям, оценив наличие следующих элементов доступной среды.
                </Text>
                <View style={styles.featuresContainer}>
                  {accessibilityPending && (
                    <>
                      <Skeleton style={styles.skeleton} />
                      <Skeleton style={styles.skeleton} />
                      <Skeleton style={styles.skeleton} />
                    </>
                  )}
                  {!accessibilityPending &&
                    accessibility.map(({ name, guid }) => (
                      <FeaturePicker
                        key={guid}
                        disabled={pending}
                        guid={guid}
                        title={name}
                        value={values.accessibility.find(a => a.guid === guid)?.value}
                        error={!!errors.accessibility}
                        onPick={(guid, value) =>
                          handleOnAccessibilityPick(values.accessibility, guid, value, setFieldValue)
                        }
                      />
                    ))}
                </View>
                {!!errors.accessibility && <Text style={styles.error}>{errors.accessibility as string}</Text>}
              </View>
              <OnboardingButton
                disabled={accessibilityPending}
                text="Добавить отзыв"
                pending={pending}
                pendingText="Сохранение данных..."
                onPress={handleSubmit}
              />
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditReviewModal;
