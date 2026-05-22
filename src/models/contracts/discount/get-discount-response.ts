type TCategory = {
  id: number;
  order: number;
  name: string;
};

type TGetDiscountResponse = {
  id: number;
  name: string;
  image_url: string;
  main_category: TCategory;
  categories: TCategory[];
  isFavorite: boolean;
  updated_at: string;
  end: string;
};

export default TGetDiscountResponse;
