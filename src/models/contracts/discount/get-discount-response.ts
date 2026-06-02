import { TDiscountCategory } from "@/models/contracts/discount/get-discounts-list-response";

type TGetDiscountResponse = {
  data: {
    id: number;
    name: string;
    description: string;
    about: string;
    content: string;
    image_url: string;
    main_category: TDiscountCategory;
    categories: TDiscountCategory[];
    isFavorite: boolean;
    end: string;
  };
};

export default TGetDiscountResponse;
