import { baseApi } from "../../base/baseAPI";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        getUsersGrowth:  builder.query({
            query: ()=>`/analytics/user-growth`,
            transformResponse: (res: {data: any})=> res?.data,
        }),
        getOverView: builder.query({
            query: ()=>`/analytics/overview`,
            transformResponse: (res: {data: any})=> res?.data
        }),
        getRevenueGrowth: builder.query({
            query: ()=>`/analytics/revenue-growth`,
            transformResponse: (res: {data: any})=> res?.data
        })
    })
})

export const {
    useGetUsersGrowthQuery,
    useGetOverViewQuery,
    useGetRevenueGrowthQuery
} = dashboardApi;