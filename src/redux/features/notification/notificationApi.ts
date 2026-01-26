import { baseApi } from "../../base/baseAPI";

const notificationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query({
            query: () => `/notifications/admin${location?.search}`,
            providesTags: ['notifications'],            
        }),

        readNotification: build.mutation<any, void>({
            query: () => ({
                url: `/notifications/admin`,
                method: "PATCH",
            }),
            invalidatesTags: ['notifications']
        }),
        notificationCount: build.query({
            query: () => `/notifications/admin${location?.search}`,
            providesTags: ['notifications'],
            transformResponse: (response: { meta: any }) => response?.meta?.unreadCount,
        }),


    })
})

export const { useGetNotificationsQuery, useReadNotificationMutation, useNotificationCountQuery } = notificationApi;