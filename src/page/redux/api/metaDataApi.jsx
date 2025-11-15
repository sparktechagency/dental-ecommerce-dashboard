import { baseApi } from "./baseApi";

const category = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCount: builder.query({
      query: () => {
        return {
          url: `/meta/get-dashboard-meta-data`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getUserGrowth: builder.query({
      query: ({ year }) => {
        return {
          url: `/dashboard/user-growth?year=${year}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getOrderGrowth: builder.query({
      query: ({ year }) => {
        return {
          url: `/dashboard/order-growth?year=${year}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getEarningGrowth: builder.query({
      query: ({ year }) => {
        return {
          url: `/dashboard/earning-growth?year=${year}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getOverview: builder.query({
      query: () => {
        return {
          url: `/dashboard/overview`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getOrder: builder.query({
      query: ({ search, page, limit, status }) => {
        return {
          url: `/orders?search=${search}&page=${page}&limit=${limit}&status=${status}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updateOrder: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/orders/${id}/status`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getUserAll: builder.query({
      query: ({ page, limit, search }) => {
        return {
          url: `/users?search=${search}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getPrivecy: builder.query({
      query: () => {
        return {
          url: `/pages/by-key/privacy`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getTerms: builder.query({
      query: () => {
        return {
          url: `/pages/by-key/terms`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAbout: builder.query({
      query: () => {
        return {
          url: `/pages/by-key/about`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updateTerms: builder.mutation({
      query: (data) => {
        return {
          url: `/pages/by-key/terms`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updatePrivecy: builder.mutation({
      query: (data) => {
        return {
          url: `/pages/by-key/privacy`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateAbout: builder.mutation({
      query: (data) => {
        return {
          url: `/pages/by-key/about`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    blockUnblock: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/users/${id}/toggle-block`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getBanner: builder.query({
      query: () => {
        return {
          url: `/sliders`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addBanner: builder.mutation({
      query: (data) => {
        return {
          url: "/sliders",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    updateBanner: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/sliders/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteBanner: builder.mutation({
      query: (id) => {
        return {
          url: `/sliders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getFaq: builder.query({
      query: () => {
        return {
          url: `/manage/get-faq`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addFaq: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/add-faq",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateFaq: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/manage/edit-faq/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          url: `/manage/delete-faq/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getReports: builder.query({
      query: ({ searchTerm, page, limit }) => {
        return {
          url: `/report/all-reports?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),

    getContactUs: builder.query({
      query: () => {
        return {
          url: `/contact-info`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addEmail: builder.mutation({
      query: (data) => {
        return {
          url: "/contact-info/emails",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addPhones: builder.mutation({
      query: (data) => {
        return {
          url: "/contact-info/phones",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addNewsletter: builder.mutation({
      query: (data) => {
        return {
          url: "/newsletter/send",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteEmail: builder.mutation({
      query: (data) => {
        return {
          url: `/contact-info/emails`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deletePhone: builder.mutation({
      query: (data) => {
        return {
          url: `/contact-info/phones`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    updateSocialLink: builder.mutation({
      query: (data) => {
        return {
          url: `/contact-info/update`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getNotification: builder.query({
      query: () => {
        return {
          url: `/notifications`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    markReadNotification: builder.mutation({
      query: (id) => {
        return {
          url: `/notifications/${id}/read`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
  }),
});

export const {
  useGetCountQuery,
  useGetUserGrowthQuery,
  useGetTermsQuery,
  useGetAboutQuery,
  useGetOrderGrowthQuery,
  useGetEarningGrowthQuery,
  useGetFaqQuery,
  useAddFaqMutation,
  useDeleteFaqMutation,
  useUpdateFaqMutation,
  useUpdateAboutMutation,
  useUpdatePrivecyMutation,
  useUpdateTermsMutation,
  useGetPrivecyQuery,
  useGetContactUsQuery,
  useGetUserAllQuery,
  useAddBannerMutation,
  useGetBannerQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useGetReportsQuery,
  useBlockUnblockMutation,
  useAddEmailMutation,
  useAddPhonesMutation,
  useDeleteEmailMutation,
  useDeletePhoneMutation,
  useUpdateSocialLinkMutation,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useAddNewsletterMutation,
  useGetOverviewQuery,
  useGetNotificationQuery,
  useMarkReadNotificationMutation,
} = category;
