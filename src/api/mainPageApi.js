import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "./constAPI";

export const mainApi = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseURL(),
    prepareHeaders: (headers) => {
      headers.set("Authorization", "bearer " + process.env.REACT_APP_API_TOKEN);
      return headers;
    },
  }),
  tagTypes: ["Main"],
  endpoints: (builder) => ({
    getMain: builder.query({
      query: ({ populate = "*" }) => ({
        url: "/homepage",
        params: {
          populate: populate,
        },
      }),
      transformResponse: (response) => ({
        bannerMainData: response.data.attributes.mainBanner,
        bannerIndexData: response.data.attributes.IndexBanner,
        bannerIndexReverseData: response.data.attributes.IndexBannerReverse,
        data: response.data,
      }),
    }),
  }),
});

export const { useGetMainQuery } = mainApi;
