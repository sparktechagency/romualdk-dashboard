// hostApi.ts

import { baseApi } from "../../base/baseAPI";

const hostApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getHostRequests: build.query({
      query: () => `/users/host-request${location.search}`,
      providesTags: ["host"],
      transformResponse: (res: { data: any }) => res.data,
    }),
    
    getHostRequestsById: build.query({
      query: (id: string) => `/users/host/${id}`,
      providesTags: ["host-request"],
      transformResponse: (res: { data: any }) => res.data,
    }),
    
    updateHostRequestStatus: build.mutation({
      query: (data)=>({
        url: `/users/host-request/status/${data?.id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["host-request"],
    }),
    
    getHosts: build.query({
      query: () => `/users/host${location.search}`,
      providesTags: ["host"],
      transformResponse: (res: { data: any }) => res.data,
    }),
    
    getHostById: build.query({
      query: (id: string) => `/users/host/${id}`,
      providesTags: ["host"],
      transformResponse: (res: { data: any }) => res.data,
    }),
    
    updateHostStatus: build.mutation({
      query: (data) => ({
        url: `/users/host/status/${data?.id}`,
        method: "PATCH",
        body: data,
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
  useUpdateHostStatusMutation,
  useDeleteHostMutation,
  useUpdateHostRequestStatusMutation, 

  useGetHostRequestsQuery,
  useGetHostRequestsByIdQuery
} = hostApi;

export default hostApi;
