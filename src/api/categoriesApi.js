import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "./constAPI";

export const categoriesApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseURL(),
    prepareHeaders: (headers) => {
      headers.set("Authorization", `bearer ${process.env.REACT_APP_API_TOKEN}`);
      return headers;
    },
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ populate = "*" }) => ({
        url: "/categories",
        params: {
          populate: populate,
        },
      }),
      transformResponse: (response) => ({
        categoriesList: response.data,
      }),
    }),
    getCategoryBySlug: builder.query({
      query: ({ category, paginationLimit, between, search, sort }) => ({
        url: "/categories",
        params: {
          "filters[slug][$eq]": category,
          "populate[catalog]pagination[start]": "0",
          "pagination[limit]": paginationLimit,
          "filters[title][$containsi]": search,
          sort: sort,
        },
      }),
      transformResponse: (response) => ({
        data: response.data[0].attributes,
        meta: response,
      }),
    }),
    getCategory: builder.query({
      query: (id, populate = "*") => ({
        url: `/categories/${id}`,
        params: {
          populate: populate,
        },
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetCategoryBySlugQuery,
} = categoriesApi;
