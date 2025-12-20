// hostApi.ts

import { baseApi } from "../../base/baseAPI";

const hostApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getHostRequests: build.query({
      query: () => "/users/host",
      providesTags: ["host"],
      transformResponse: (res: { data: any }) => res.data,
    }),
    
    getHostRequestsById: build.query({
      query: (id: string) => `/users/host/${id}`,
      providesTags: ["host"],
      transformResponse: (res: { data: any }) => res.data,
    }),
    
    
    getHosts: build.query({
      query: () => "/users/host",
      providesTags: ["host"],
      transformResponse: (res: { data: any }) => res.data,
    }),
    
    getHostById: build.query({
      query: (id: string) => `/users/host/${id}`,
      providesTags: ["host"],
      transformResponse: (res: { data: any }) => res.data,
    }),
    
    updateHost: build.mutation({
      query: ({ id, formData }: { id: string; formData: any }) => ({
        url: `/users/host/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["host"],
    }),
    
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
  useGetHostRequestsQuery,
  useGetHostRequestsByIdQuery
} = hostApi;

export default hostApi;
