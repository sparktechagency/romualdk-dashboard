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
        getRevenueGrowth:  builder.query({
            query: ()=>`/transactions/platform-revenue`,       
            transformResponse: (res: {data: any})=> res?.data     
        }),
        getOverView: builder.query({
            query: ()=>`/analytics/overview`,
            transformResponse: (res: {data: any})=> res?.data
        }),        
        getBookingChart: builder.query({
            query: ()=>`/bookings/status-stats?year=2025&month=12`,
            transformResponse: (res: {data: any})=> res?.data
        })
    })
})

export const {
    useGetAnalyticsQuery,
    useGetUsersGrowthQuery,
    useGetOverViewQuery,
    useGetBookingChartQuery,
    useGetRevenueGrowthQuery
} = dashboardApi;