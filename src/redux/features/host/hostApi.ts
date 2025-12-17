// hostApi.ts

import { baseApi } from "../../base/baseAPI";

const hostApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all hosts
    getHosts: build.query({
      query: () => "/users/host",
      providesTags: ["host"],
      transformResponse: (res: { data: any }) => res.data,
    }),

    // GET single host by ID
    getHostById: build.query({
      query: (id: string) => `/users/host/${id}`,
      providesTags: ["host"],
      transformResponse: (res: { data: any }) => res.data,
    }),

    // UPDATE host (PATCH)
    updateHost: build.mutation({
      query: ({ id, formData }: { id: string; formData: any }) => ({
        url: `/users/host/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["host"],
    }),

    // DELETE host
    deleteHost: build.mutation({
      query: (id: string) => ({
        url: `/users/host/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["host"],
    }),
  }),
});

export const {
  useGetHostsQuery,
  useGetHostByIdQuery,
  useUpdateHostMutation,
  useDeleteHostMutation,
} = hostApi;

export default hostApi;
