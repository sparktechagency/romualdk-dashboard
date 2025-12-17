import { baseApi } from "../../base/baseAPI";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        getAnalytics:  builder.query({
            query: ()=>`/analytics/stat-counts`,
            transformResponse: (res: {data: any})=> res?.data,
        }),
        getUsersGrowth:  builder.query({
            query: ()=>`/analytics/yearly${location?.search}`,            
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
    useGetAnalyticsQuery,
    useGetUsersGrowthQuery,
    useGetOverViewQuery,
    useGetRevenueGrowthQuery
} = dashboardApi;