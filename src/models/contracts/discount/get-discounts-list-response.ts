export type TDiscountCategory = {
  id: number;
  order: number;
  name: string;
  image?: string;
};

export type TGetDiscountsListItem =
  | {
      id: number;
      name: string;
      image_url: string;
      main_category: TDiscountCategory;
      categories: TDiscountCategory[];
      isFavorite: boolean;
      updated_at: string;
      end: string;
    }
  | "pending";

type TGetDiscountsListResponse = {
  data: TGetDiscountsListItem[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;
  };
};

export default TGetDiscountsListResponse;
