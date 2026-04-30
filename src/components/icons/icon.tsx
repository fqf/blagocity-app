import { FC } from "react";
import EIcon from "@/models/enums/icon";
import MapIcon from "@/components/icons/map-icon";
import PercentIcon from "@/components/icons/percent-icon";
import BubbleIcon from "@/components/icons/bubble-icon";
import CheckedIcon from "@/components/icons/checked-icon";
import ChevronIcon from "@/components/icons/chevron-icon";
import ClansIcon from "@/components/icons/clans-icon";
import ClockIcon from "@/components/icons/clock-icon";
import CloseIcon from "@/components/icons/close-icon";
import DiscountIcon from "@/components/icons/discount-icon";
import FilterIcon from "@/components/icons/filter-icon";
import GearIcon from "@/components/icons/gear-icon";
import InfoIcon from "@/components/icons/info-icon";
import LikeIcon from "@/components/icons/like-icon";
import ListIcon from "@/components/icons/list-icon";
import LocationIcon from "@/components/icons/location-icon";
import MinusIcon from "@/components/icons/minus-icon";
import PhotoIcon from "@/components/icons/photo-icon";
import PinIcon from "@/components/icons/pin-icon";
import PlusIcon from "@/components/icons/plus-icon";
import ProfileIcon from "@/components/icons/profile-icon";
import QRCodeIcon from "@/components/icons/qr-code-icon";
import QuestionIcon from "@/components/icons/question-icon";
import QuitIcon from "@/components/icons/quit-icon";
import RingIcon from "@/components/icons/ring-icon";
import SearchIcon from "@/components/icons/search-icon";
import ShieldIcon from "@/components/icons/shield-icon";
import StarIcon from "@/components/icons/star-icon";
import StepArrowIcon from "@/components/icons/step-arrow-icon";
import UploadIcon from "@/components/icons/upload-icon";
import TIconProps from "@/models/types/icon-props";
import BookIcon from "@/components/icons/book-icon";
import LabelIcon from "@/components/icons/label-icon";
import CherryIcon from "@/components/icons/cherry-icon";
import CouponIcon from "@/components/icons/coupon-icon";
import KidIcon from "@/components/icons/kid-icon";
import ElectronicsIcon from "@/components/icons/electronics-icon";
import FoodIcon from "@/components/icons/food-icon";
import GoodsIcon from "@/components/icons/goods-icon";
import NewIcon from "@/components/icons/new-icon";
import PalmIcon from "@/components/icons/palm-icon";
import SportIcon from "@/components/icons/sport-icon";
import ServiceIcon from "@/components/icons/service-icon";
import SuccessIcon from "@/components/icons/success-icon";
import EyeIcon from "@/components/icons/eye-icon";

type TProps = {
  icon: EIcon;
} & TIconProps;

const Icon: FC<TProps> = ({ icon, fill, style }) => {
  switch (icon) {
    case EIcon.Book:
      return <BookIcon fill={fill} style={style} />;

    case EIcon.Bubble:
      return <BubbleIcon fill={fill} style={style} />;

    case EIcon.Checked:
      return <CheckedIcon fill={fill} style={style} />;

    case EIcon.Cherry:
      return <CherryIcon fill={fill} style={style} />;

    case EIcon.ChevronLeft:
      return <ChevronIcon fill={fill} style={style} direction="left" />;

    case EIcon.ChevronRight:
      return <ChevronIcon fill={fill} style={style} direction="right" />;

    case EIcon.Clans:
      return <ClansIcon fill={fill} style={style} />;

    case EIcon.Clock:
      return <ClockIcon fill={fill} style={style} />;

    case EIcon.Close:
      return <CloseIcon fill={fill} style={style} />;

    case EIcon.Coupon:
      return <CouponIcon fill={fill} style={style} />;

    case EIcon.Discount:
      return <DiscountIcon fill={fill} style={style} />;

    case EIcon.Electronics:
      return <ElectronicsIcon fill={fill} style={style} />;

    case EIcon.EyeClosed:
      return <EyeIcon closed fill={fill} style={style} />;

    case EIcon.EyeOpened:
      return <EyeIcon fill={fill} style={style} />;

    case EIcon.Filter:
      return <FilterIcon fill={fill} style={style} />;

    case EIcon.Food:
      return <FoodIcon fill={fill} style={style} />;

    case EIcon.Gear:
      return <GearIcon fill={fill} style={style} />;

    case EIcon.Goods:
      return <GoodsIcon fill={fill} style={style} />;

    case EIcon.Info:
      return <InfoIcon fill={fill} style={style} />;

    case EIcon.Kid:
      return <KidIcon fill={fill} style={style} />;

    case EIcon.Label:
      return <LabelIcon fill={fill} style={style} />;

    case EIcon.Like:
      return <LikeIcon fill={fill} style={style} />;

    case EIcon.List:
      return <ListIcon fill={fill} style={style} />;

    case EIcon.Location:
      return <LocationIcon fill={fill} style={style} />;

    case EIcon.Map:
      return <MapIcon fill={fill} style={style} />;

    case EIcon.Minus:
      return <MinusIcon fill={fill} style={style} />;

    case EIcon.New:
      return <NewIcon fill={fill} style={style} />;

    case EIcon.Palm:
      return <PalmIcon fill={fill} style={style} />;

    case EIcon.Percent:
      return <PercentIcon fill={fill} style={style} />;

    case EIcon.Photo:
      return <PhotoIcon fill={fill} style={style} />;

    case EIcon.PinFilled:
      return <PinIcon fill={fill} variant="filled" style={style} />;

    case EIcon.PinOutlined:
      return <PinIcon fill={fill} variant="outlined" style={style} />;

    case EIcon.Plus:
      return <PlusIcon fill={fill} style={style} />;

    case EIcon.Profile:
      return <ProfileIcon fill={fill} style={style} />;

    case EIcon.QRCode:
      return <QRCodeIcon fill={fill} style={style} />;

    case EIcon.Question:
      return <QuestionIcon fill={fill} style={style} />;

    case EIcon.Quit:
      return <QuitIcon fill={fill} style={style} />;

    case EIcon.Ring:
      return <RingIcon fill={fill} style={style} />;

    case EIcon.Search:
      return <SearchIcon fill={fill} style={style} />;

    case EIcon.Service:
      return <ServiceIcon fill={fill} style={style} />;

    case EIcon.Shield:
      return <ShieldIcon fill={fill} style={style} />;

    case EIcon.Sport:
      return <SportIcon fill={fill} style={style} />;

    case EIcon.Star:
      return <StarIcon fill={fill} style={style} />;

    case EIcon.StarFilled:
      return <StarIcon filled fill={fill} style={style} />;

    case EIcon.StepArrow:
      return <StepArrowIcon fill={fill} style={style} />;

    case EIcon.Success:
      return <SuccessIcon fill={fill} style={style} />;

    case EIcon.Upload:
      return <UploadIcon fill={fill} style={style} />;
  }
};

export default Icon;
