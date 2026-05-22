import { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import ReviewBlock from "@/components/blocks/review-block";
import Button from "@/components/buttons/button";
import COLORS from "@/constants/colors";
import EIcon from "@/models/enums/icon";
import Feature from "@/components/others/feature";
import Rating from "@/components/others/rating";
import { declOfReviews } from "@/lib/decl-of-num";
import Icon from "@/components/icons/icon";
import IconButton from "@/components/buttons/icon-button";
import Constants from "expo-constants";
import Skeleton from "@/components/others/skeleton";
import TGetPlaceResponse from "@/models/contracts/place/get-place-response";
import { getUser } from "@/actions/user-actions";
import * as SecureStore from "expo-secure-store";
import useProfileStore from "@/stores/profile-store";
import useMapStore from "@/stores/map-store";
import { getReviewsList } from "@/actions/review-actions";
import { useListener } from "react-bus";
import TGetReviewResponse from "@/models/contracts/review/get-review-response";
import processError from "@/lib/process-error";

type TProps = {
  id: string;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  image: {
    height: 300,
  },
  hud: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
    elevation: 1,
    position: "absolute",
    top: Constants.statusBarHeight,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 24,
  },
  block: {
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  subheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 24,
    color: COLORS.text,
  },
  subtitle: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 18,
    color: COLORS.text,
  },
  text: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.text,
  },
  description: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 16,
    color: COLORS.active,
  },
  addressContainer: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "flex-start",
    gap: 6,
    paddingRight: 20,
  },
  address: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.icon,
  },
  addressIcon: {
    width: 16,
    height: 16,
    marginTop: 2,
  },
  authorContainer: {
    backgroundColor: COLORS.blockBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    padding: 16,
    gap: 12,
  },
  authorHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  authorIcon: {
    width: 16,
    height: 16,
  },
  authorTitle: {
    fontFamily: "LexendDeca-Regular",
    fontSize: 14,
    color: COLORS.text,
  },
  authorName: {
    fontFamily: "LexendDeca-SemiBold",
    fontSize: 14,
    color: COLORS.text,
  },
  featuresContainer: {
    gap: 8,
    alignItems: "flex-start",
    paddingRight: 20,
  },
  buttonsContainer: {
    gap: 12,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  buttonsRowButton: {
    flex: 1,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewsHeaderCounter: {
    fontFamily: "LexendDeca-Bold",
    fontSize: 14,
    color: COLORS.active,
  },
  reviewsContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  emptyText: {
    color: COLORS.label,
  },
});
const PlaceScreen: FC<TProps> = ({ id }) => {
  const [pending, setPending] = useState(true);
  const [reviewsListPending, setReviewsListPending] = useState(true);
  const [placeData, setPlaceData] = useState<TGetPlaceResponse | null>(null);
  const [placeType, setPlaceType] = useState("");
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [author, setAuthor] = useState("");
  const [reviewsList, setReviewsList] = useState<TGetReviewResponse[]>([]);
  const { userData } = useProfileStore();
  const { placesList } = useMapStore();
  const router = useRouter();
  const handleOnBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  const handleOnAlertPress = () => {
    router.push(`/tabs/map/place/call?name=${placeData?.name}&location=${placeData?.guid}`);
  };
  const handleOnCreateReviewPress = () => {
    router.push(`/tabs/map/review/edit/-1?name=${placeData?.name}&location=${placeData?.guid}`);
  };
  const handleOnRefreshReviewsList = async () => {
    setReviewsListPending(true);

    try {
      const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

      if (!token) {
        throw new Error("Bad token");
      }

      const reviewsListResponse = await getReviewsList(id);
      setReviewsList(reviewsListResponse);
    } catch (e: unknown) {
      await processError(e);
    }

    setReviewsListPending(false);
  };

  useListener("refresh-reviews-list", handleOnRefreshReviewsList);
  useEffect(() => {
    setPending(true);

    (async () => {
      try {
        const token = SecureStore.getItem(process.env.EXPO_PUBLIC_SECURE_AUTH_STATE_KEY!);

        if (!token) {
          throw new Error("Bad token");
        }

        const placeDataResponse = placesList?.find(place => place.guid === id);

        if (!placeDataResponse) {
          throw new Error("Place not found");
        }

        setPlaceType(placeDataResponse.placeType.name ?? "");

        const userId = placeDataResponse?.createdBy.split("/").slice(-1)[0];

        if (userId === userData?.guid) {
          setAuthor(`${userData?.name ?? ""} (я)`);
        } else {
          const userDataResponse = await getUser(token, userId);
          setAuthor(userDataResponse.name);
        }

        const accessibilityList = placeDataResponse?.accessibilityCriteria.map(acc => acc.name);
        setAccessibility(accessibilityList);
        setPlaceData(placeDataResponse);
        setReviewsList(placeDataResponse.reviews);
        setPending(false);
        setReviewsListPending(false);
      } catch (e: unknown) {
        await processError(e);
      }
    })();
  }, [id, placesList, userData?.guid, userData?.name]);

  if (pending) {
    return (
      <View style={[styles.container, { flex: 1 }]}>
        <Skeleton style={{ height: 300, borderRadius: 0 }} />
        <View style={styles.hud}>
          <IconButton icon={EIcon.ChevronLeft} onPress={handleOnBackPress} />
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={{ gap: 8 }}>
              <Skeleton style={{ height: 32, width: 154, borderRadius: 6 }} />
              <Skeleton style={{ height: 24, width: 42, borderRadius: 6 }} />
              <View style={styles.addressContainer}>
                <Skeleton style={{ height: 20, width: 92, borderRadius: 6 }} />
              </View>
            </View>
            <Skeleton style={{ height: 32, width: 61, borderRadius: 6 }} />
          </View>
          <View style={styles.authorContainer}>
            <Skeleton style={{ height: 20, width: 180, borderRadius: 6 }} />
            <Skeleton style={{ height: 36, width: 318, borderRadius: 6 }} />
          </View>
          <View style={styles.block}>
            <Skeleton style={{ height: 28, width: 350, borderRadius: 6 }} />
            <View style={styles.featuresContainer}>
              <Skeleton style={{ height: 32, width: 95, borderRadius: 6 }} />
              <Skeleton style={{ height: 32, width: 274, borderRadius: 6 }} />
              <Skeleton style={{ height: 32, width: 231, borderRadius: 6 }} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/15/7e/cf/artur-restorant.jpg?w=1000&h=-1&s=1",
        }}
        contentFit="cover"
        style={styles.image}
      />
      <View style={styles.hud}>
        <IconButton icon={EIcon.ChevronLeft} onPress={handleOnBackPress} />
        <IconButton icon={EIcon.Like} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{ width: "100%" }}>
            <View style={styles.subheader}>
              <Text style={styles.title}>{placeData?.name}</Text>
              <Rating value={4.7} />
            </View>
            <Text style={styles.description}>{placeType}</Text>
            <View style={styles.addressContainer}>
              <Icon icon={EIcon.PinOutlined} fill={COLORS.icon} style={styles.addressIcon} />
              <Text style={styles.address}>{placeData?.address}</Text>
            </View>
          </View>
        </View>
        <View style={styles.authorContainer}>
          <View style={styles.authorHeader}>
            <Icon icon={EIcon.Profile} fill={COLORS.icon} style={styles.authorIcon} />
            <Text style={styles.authorTitle}>
              Кем создано: <Text style={styles.authorName}>{author}</Text>
            </Text>
          </View>
          <Feature
            icon={EIcon.Shield}
            title={`Автор ${!placeData?.ownerReviewTrackingEnabled ? "не " : ""}отслеживает отзывы`}
            variant={placeData?.ownerReviewTrackingEnabled ? "success" : "error"}
          />
        </View>
        <View style={styles.block}>
          <Text style={styles.subtitle}>Атрибуты доступности</Text>
          <View style={styles.featuresContainer}>
            {accessibility.map((acc, i) => (
              <Feature key={i} icon={EIcon.Checked} title={acc} />
            ))}
          </View>
        </View>
        <View style={styles.block}>
          <Text style={styles.subtitle}>Доступная среда</Text>
          <Text style={styles.text}>Уютное место с френдли подходом.</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            type="secondary"
            theme="error"
            text="Позвать помощника"
            icon={EIcon.Ring}
            onPress={handleOnAlertPress}
          />
          <View style={styles.buttonsRow}>
            <Button
              type="primary"
              theme="active"
              text="Отметиться"
              icon={EIcon.PinOutlined}
              style={styles.buttonsRowButton}
            />
            <Button
              type="secondary"
              theme="default"
              text="Оставить отзыв"
              icon={EIcon.Bubble}
              style={styles.buttonsRowButton}
              onPress={handleOnCreateReviewPress}
            />
          </View>
        </View>
        <View style={styles.block}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.subtitle}>Отзывы</Text>
            {!reviewsListPending && (
              <Text style={styles.reviewsHeaderCounter}>
                {reviewsList.length ?? 0} {declOfReviews(reviewsList.length ?? 0)}
              </Text>
            )}
          </View>
          <View style={styles.reviewsContainer}>
            {reviewsListPending && <Text style={styles.emptyText}>Загрузка списка отзывов...</Text>}
            {!reviewsListPending && !reviewsList.length && <Text style={styles.emptyText}>Отзывов пока нет...</Text>}
            {!reviewsListPending &&
              !!reviewsList.length &&
              reviewsList.map(review => <ReviewBlock key={review.guid} guid={review.guid} />)}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceScreen;
