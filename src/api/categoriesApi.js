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
      query: (params = "*") => ({
        url: "/categories",
        params: {
          populate: params,
        },
      }),
      transformResponse: (response) => ({
        categoriesList: response.data,
      }),
    }),
    getCategory: builder.query({
      query: (id, params = "*") => ({
        url: `/categories/${id}`,
        params: {
          populate: params,
        },
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery } = categoriesApi;
