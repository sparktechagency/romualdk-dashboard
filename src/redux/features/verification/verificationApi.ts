import { baseApi } from "../../base/baseAPI";


const verificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // GET verification (with query params if any in URL)
    getVerification: build.query({
      query: () => `/cars/verification${location?.search || ""}`,
      providesTags: ["verification"],
      transformResponse: (res: { data: any }) => res.data,
    }),

    // GET verification by ID (optional but useful)
    getVerificationById: build.query({
      query: (id) => `/cars/verification/${id}`,
      providesTags: ["verification"],
      transformResponse: (res: { data: any }) => res.data,
    }),

    // UPDATE / VERIFY (PATCH)
    updateVerification: build.mutation({
      query: (data) => ({
        url: `/cars/verification/status/${data.id}`,
        method: "PATCH",
        body: data.formData || data,
      }),
      invalidatesTags: ["verification"],
    }),

  }),
});

export const {
  useGetVerificationQuery,
  useGetVerificationByIdQuery,
  useUpdateVerificationMutation,
} = verificationApi;
