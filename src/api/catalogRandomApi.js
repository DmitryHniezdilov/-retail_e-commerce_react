import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "./constAPI";

export const catalogRandomApi = createApi({
  reducerPath: "catalogRandom",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseURL(),
  }),
  tagTypes: ["Catalog"],
  endpoints: (builder) => ({
    getCatalogRandom: builder.query({
      query: ({ populate = "*", paginationLimit }) => ({
        url: "/catalogs",
        params: {
          random: true,
          "pagination[start]": "0",
          "pagination[limit]": paginationLimit,
          populate: populate,
        },
      }),
      transformResponse: (response) => ({
        catalogList: response.data,
        catalogMeta: response.meta,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetCatalogRandomQuery } = catalogRandomApi;
