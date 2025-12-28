import { baseApi } from "../../base/baseAPI";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Create booking
    createBooking: builder.mutation({
      query: (payload) => ({
        url: `/bookings`,
        method: "POST",
        body: payload,
      }),
    }),

    // Get all bookings of logged-in user
    getBookings: builder.query({
      query: () => `/bookings${location?.search}`,
      transformResponse: (res: { data: any }) => res?.data,
    }),

    // Get single booking details
    getBookingById: builder.query({
      query: (id) => `/bookings/${id}`,
      transformResponse: (res: { data: any }) => res?.data,
    }),

    // Cancel booking
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
    }),

    // Cancel booking
    getAllPayment: builder.query({
      query: () =>`/transactions${location.search}`,
    }),
    // Cancel booking
    getSinglePayment: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
    }),

  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetBookingByIdQuery,

  useGetAllPaymentQuery,

  useCancelBookingMutation,
} = bookingApi;
