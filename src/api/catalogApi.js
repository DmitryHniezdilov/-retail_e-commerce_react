import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "./constAPI";

export const catalogApi = createApi({
  reducerPath: "catalog",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseURL(),
    prepareHeaders: (headers) => {
      headers.set("Authorization", "bearer " + process.env.REACT_APP_API_TOKEN);
      return headers;
    },
  }),
  tagTypes: ["Catalog"],
  endpoints: (builder) => ({
    getCatalog: builder.query({
      query: ({
        populate = "*",
        paginationLimit,
        category,
        sort,
        between,
        search,
      }) => ({
        url: "/catalogs",
        params: {
          "pagination[start]": "0",
          "pagination[limit]": paginationLimit,
          "filters[category][slug][$eq]": category,
          "filters[price][$between][0]": between[0],
          "filters[price][$between][1]": between[1],
          "filters[title][$containsi]": search,
          sort: sort,
          populate: populate,
        },
      }),
      transformResponse: (response) => ({
        catalogList: response.data,
        catalogMeta: response.meta,
      }),
    }),
    getCatalogItem: builder.query({
      query: ({ id, populate = "*" }) => ({
        url: `/catalogs/${id}`,
        params: {
          populate: populate,
        },
      }),
      transformResponse: (response) => ({
        product: response.data,
      }),
    }),
  }),
});

export const { useGetCatalogQuery, useGetCatalogItemQuery } = catalogApi;
