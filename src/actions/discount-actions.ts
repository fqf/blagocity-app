import type TGetDiscountsListResponse from "@/models/contracts/discount/get-discounts-list-response";
import type TGetDiscountCategoriesListResponse from "@/models/contracts/discount/get-discount-categories-list-response";
import blagocityApi from "@/api/blagocity-api";

export const getDiscountsList = async (token: string) => {
  return await blagocityApi(token).get<TGetDiscountsListResponse>("/discounts").json();
};

export const getDiscount = async (id: string) => {
  return await blagocityApi().get<TGetDiscountsListResponse>(`/discounts/${id}`).json();
};

export const getDiscountCategoriesList = async (token: string) => {
  return await blagocityApi(token).get<TGetDiscountCategoriesListResponse>("/discount_categories").json();
};
