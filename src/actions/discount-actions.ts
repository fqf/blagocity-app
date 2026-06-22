import type TGetDiscountsListResponse from "@/models/contracts/discount/get-discounts-list-response";
import type TGetDiscountCategoriesListResponse from "@/models/contracts/discount/get-discount-categories-list-response";
import blagocityApi from "@/api/blagocity-api";
import TGetDiscountResponse from "@/models/contracts/discount/get-discount-response";
import TGetDiscountCodeResponse from "@/models/contracts/discount/get-discount-code-response";

export const getDiscountsList = async (
  token: string,
  { query, category, page }: { query?: string; category?: number; page?: number },
) => {
  return await blagocityApi(token)
    .get<TGetDiscountsListResponse>(`/discounts?category=${category}&q=${query}&page=${page}`)
    .json();
};

export const getDiscount = async (token: string, id: string) => {
  return await blagocityApi(token).get<TGetDiscountResponse>(`/discount/${id}`).json();
};

export const getDiscountCategoriesList = async (token: string) => {
  return await blagocityApi(token).get<TGetDiscountCategoriesListResponse>("/discount_categories").json();
};

export const getDiscountCode = async (token: string, id: string) => {
  return await blagocityApi(token).get<TGetDiscountCodeResponse>(`/discount/${id}/promo`).json();
};
