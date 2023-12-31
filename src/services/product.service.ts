import useSWR from "swr";
import { BookResponse } from "models/book";
import { ProductParams, ProductResponse } from "models/product";
import { httpClient } from "../utils/http-client";

function getAxiosProductParams(productParams: ProductParams) {
  const { search, page, limit, category, sort, price } = productParams;
  const params = new URLSearchParams();

  if (search) params.append("search", search.toString());
  if (category.length > 0) {
    for (const item of category) params.append("category", item.toString());
  }
  if (sort) {
    params.append("orderBy", sort.orderBy);
    params.append("op", sort.op);
  }
  if (price) {
    params.append("min", price.min.toString());
    params.append("max", price.max.toString());
  }
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  return params;
}

export const getProducts = async (filter: ProductParams) => {
  const params = getAxiosProductParams(filter);
  const result = await httpClient.get<ProductResponse>("/books", { params });
  return result.data;
};

export const getProduct = async (productId: string) => {
  const result = await httpClient.get<BookResponse>(`/books/${productId}`);
  return result.data;
};

export const getBestSeller = (params: { page: number; limit: number }) => {
  const { page, limit } = params;
  const { data, isLoading } = useSWR<ProductResponse>(`/books/recommend/best-seller?page=${page}&limit=${limit}`);
  return { data, isLoading };
};

export const getNewProduct = (params: { page: number; limit: number }) => {
  const { page, limit } = params;
  const { data, isLoading } = useSWR<ProductResponse>(`/books/recommend/new-book?page=${page}&limit=${limit}`);
  return { data, isLoading };
};
