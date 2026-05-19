import discountsApi from "@/api/discounts-api";
import type TGetDiscountsListResponse from "@/models/contracts/discount/get-discounts-list-response";
import type TGetDiscountCategoriesListResponse from "@/models/contracts/discount/get-discount-categories-list-response";

export const getDiscountsList = async () => {
  return await discountsApi().get<TGetDiscountsListResponse>("/discounts").json();
};

export const getDiscount = async (id: string) => {
  return await discountsApi().get<TGetDiscountsListResponse>(`/discounts/${id}`).json();
};

export const getDiscountCategoriesList = async (token: string) => {
  return await discountsApi(token).get<TGetDiscountCategoriesListResponse>("/discount_categories").json();
};
