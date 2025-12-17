import { baseApi } from "../../base/baseAPI";

export const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Get all cars
    getCars: builder.query({
      query: (params) => ({
        url: "/cars",
        method: "GET",
        params,
      }),
      providesTags: ["car"],
    }),

    // ✅ Get single car by ID
    getCarById: builder.query({
      query: (id: string) => `/cars/${id}`,
      providesTags: ["car"],
    }),

    // ✅ Create car
    createCar: builder.mutation({
      query: (data) => ({
        url: "/cars",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["car"],
    }),

    // ✅ Update car
    updateCar: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cars/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["car"],
    }),

    // ✅ Delete car
    deleteCar: builder.mutation({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["car"],
    }),

  }),
});

export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carApi;
